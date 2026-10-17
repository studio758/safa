import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { ROW_BY_ID, addDays, clampKey, inRange, monthOf, toKey } from '../data/calendar';
import { suggestionsFor, type CardStyleId } from '../data/content';
import { buildDay, type DayView, type Hemisphere } from '../data/engine';
import { KEYS, clearAllData, loadPersisted, writeJson } from '../lib/storage';
import { DEFAULT_SETTINGS, type PracticeRecord, type Reflection, type Settings } from './schema';

export type { Hemisphere };

export type SafaConfig = {
  /** Where the app opens: the welcome flow or straight onto Today (review shortcut). */
  startScreen?: 'onboarding' | 'today';
  /** Override "today" ("YYYY/MM/DD"); defaults to the device date, clamped to the calendar's range. */
  today?: string;
};

type State = {
  /** False until the saved data has been read from the device. */
  ready: boolean;
  /** Review shortcut (?start=today). Lets a session skip onboarding; never saved. */
  skipOnboarding: boolean;
  /** True while the welcome flow is opened again from Settings. */
  replaying: boolean;
  /** Onboarding page, 0–2. */
  step: number;
  name: string;
  registered: boolean;
  settings: Settings;
  /** The real current date, clamped to the calendar. */
  today: string;
  /** The day Today is showing. */
  dayKey: string;
  /** The month the (hidden) Almanac lists ("YYYY/MM"). */
  month: string;
  /** 1 = day content visible, 0 = mid cross-fade between days. */
  fade: number;
  saved: Record<string, boolean>;
  reflections: Reflection[];
  practices: Record<string, PracticeRecord>;
  draft: string;
  learnOpen: boolean;
  journalOpen: boolean;
  // Observance and greeting state, kept for the preserved screens in src/legacy.
  // Nothing in the Stage 1 interface opens them.
  obsId: number;
  obsOpen: boolean;
  obsDone: Record<string, boolean>;
  cal: Record<number, boolean>;
  greetOpen: boolean;
  cardStyle: CardStyleId;
  recipient: string;
  note: string;
  toast: string;
  toastOn: boolean;
};

function initialState({ startScreen = 'onboarding', today }: SafaConfig): State {
  const t = clampKey(today && inRange(today) ? today : toKey(new Date()));
  const day = buildDay(t, 'Northern');
  const first = day.share?.event ?? day.events[0];
  return {
    ready: false,
    skipOnboarding: startScreen === 'today',
    replaying: false,
    step: 0,
    name: '',
    registered: false,
    settings: DEFAULT_SETTINGS,
    today: t,
    dayKey: t,
    month: monthOf(t),
    fade: 1,
    saved: {},
    reflections: [],
    practices: {},
    draft: '',
    learnOpen: false,
    journalOpen: false,
    obsId: first?.id ?? 1,
    obsOpen: false,
    obsDone: {},
    cal: {},
    greetOpen: false,
    cardStyle: 'lamp',
    recipient: '',
    note: '',
    toast: '',
    toastOn: false,
  };
}

const newId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

/** Writes one slice of state. If the device refuses, the user is told rather than losing data silently. */
function persist(key: string, value: unknown, onFail: (message: string) => void) {
  writeJson(key, value).then(ok => {
    if (!ok) onFail("Couldn't save on this device");
  });
}

function useSafaStore(config: SafaConfig) {
  const [s, setS] = useState(() => initialState(config));
  // Actions read the latest state through a ref so side effects (toasts, timers)
  // stay out of setState updaters, which React may run twice. Every write goes
  // through `set`, so the ref never lags behind.
  const ref = useRef(s);
  const set = useCallback((patch: Partial<State>) => {
    ref.current = { ...ref.current, ...patch };
    setS(st => ({ ...st, ...patch }));
  }, []);

  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const dayTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => { clearTimeout(toastTimer.current); clearTimeout(dayTimer.current); }, []);

  const showToast = useCallback(
    (msg: string) => {
      clearTimeout(toastTimer.current);
      set({ toast: msg, toastOn: true });
      toastTimer.current = setTimeout(() => set({ toastOn: false }), 2200);
    },
    [set],
  );

  // Read everything saved on the device once, at launch.
  useEffect(() => {
    let alive = true;
    loadPersisted()
      .then(data => {
        if (!alive) return;
        set({
          ready: true,
          name: data.profile.name,
          registered: data.profile.registered,
          settings: data.settings,
          saved: data.saved,
          reflections: data.reflections,
          practices: data.practices,
        });
      })
      .catch(() => {
        if (alive) set({ ready: true });
      });
    return () => {
      alive = false;
    };
  }, [set]);

  // Write each slice whenever it changes, once loading has finished.
  const { ready, name, registered, settings, saved, reflections, practices } = s;
  useEffect(() => {
    if (ready) persist(KEYS.profile, { name, registered }, showToast);
  }, [ready, name, registered, showToast]);
  useEffect(() => {
    if (ready) persist(KEYS.settings, settings, showToast);
  }, [ready, settings, showToast]);
  useEffect(() => {
    if (ready) persist(KEYS.saved, saved, showToast);
  }, [ready, saved, showToast]);
  useEffect(() => {
    if (ready) persist(KEYS.reflections, reflections, showToast);
  }, [ready, reflections, showToast]);
  useEffect(() => {
    if (ready) persist(KEYS.practices, practices, showToast);
  }, [ready, practices, showToast]);

  const day = useMemo(() => buildDay(s.dayKey, s.settings.hemisphere), [s.dayKey, s.settings.hemisphere]);

  const actions = useMemo(() => {
    const get = () => ref.current;

    /** Fade the day out, swap it, fade it back in. */
    const goDay = (key: string) => {
      const k = clampKey(key);
      if (k === get().dayKey) return;
      set({ fade: 0 });
      clearTimeout(dayTimer.current);
      dayTimer.current = setTimeout(() => set({ dayKey: k, fade: 1 }), 200);
    };

    const prepareGreeting = (id: number) => {
      const row = ROW_BY_ID.get(id);
      return { obsId: id, note: row ? suggestionsFor(row)[0]?.text ?? '' : '', cardStyle: row?.share === 'yes' ? 'lamp' : 'linen' } as const;
    };

    return {
      showToast,
      prevDay: () => goDay(addDays(get().dayKey, -1)),
      nextDay: () => goDay(addDays(get().dayKey, 1)),
      goToday: () => goDay(get().today),
      showDay: (key: string) => goDay(key),
      setMonth: (month: string) => set({ month }),

      // Onboarding and profile
      nextStep: () => {
        const st = get();
        if (st.step < 2) set({ step: st.step + 1 });
        else set({ registered: true });
      },
      replay: () => set({ step: 0, replaying: true }),
      /** Called when a replayed welcome flow closes, so the gate can apply normally again. */
      endReplay: () => set({ replaying: false }),
      setName: (name: string) => set({ name }),
      setHemisphere: (hemisphere: Hemisphere) => set({ settings: { ...get().settings, hemisphere } }),

      // Ritual practices (keyed by day and position, storing the title for history)
      togglePractice: (key: string, title: string, v: boolean) => {
        const next = { ...get().practices };
        if (v) next[key] = { title, at: new Date().toISOString() };
        else delete next[key];
        set({ practices: next });
      },

      // Saved days
      toggleSave: () => {
        const st = get();
        const v = !st.saved[st.dayKey];
        const next = { ...st.saved };
        if (v) next[st.dayKey] = true;
        else delete next[st.dayKey];
        set({ saved: next });
        showToast(v ? 'Day saved' : 'Removed from saved days');
      },
      removeSaved: (key: string) => {
        const next = { ...get().saved };
        delete next[key];
        set({ saved: next });
      },

      // Reflections
      openLearn: () => set({ learnOpen: true }),
      closeLearn: () => set({ learnOpen: false }),
      openJournal: () => set({ journalOpen: true }),
      closeJournal: () => set({ journalOpen: false }),
      setDraft: (draft: string) => set({ draft }),
      saveEntry: (prompt: string) => {
        const st = get();
        const text = st.draft.trim();
        if (!text) return;
        const entry: Reflection = { id: newId(), dayKey: st.dayKey, prompt, text, createdAt: new Date().toISOString() };
        set({ reflections: [entry, ...st.reflections], draft: '', journalOpen: false });
        showToast('Reflection saved');
      },
      deleteReflection: (id: string) => set({ reflections: get().reflections.filter(r => r.id !== id) }),

      // Preserved observance and greeting state (hidden; see src/legacy).
      openObs: (id: number) => set({ ...prepareGreeting(id), obsOpen: true, learnOpen: false }),
      closeObs: () => set({ obsOpen: false, greetOpen: false }),
      toggleObsPractice: (key: string, v: boolean) => set({ obsDone: { ...get().obsDone, [key]: v } }),
      toggleCal: () => {
        const st = get();
        set({ cal: { ...st.cal, [st.obsId]: !st.cal[st.obsId] } });
      },
      /** Open the composer, optionally for a specific calendar row. */
      openGreet: (id?: number) => set({ ...(id !== undefined ? prepareGreeting(id) : {}), greetOpen: true }),
      closeGreet: () => set({ greetOpen: false }),
      setCardStyle: (cardStyle: CardStyleId) => set({ cardStyle }),
      setRecipient: (recipient: string) => set({ recipient }),
      setNote: (note: string) => set({ note }),
      // Sharing is not connected yet. The composer stays hidden, so this only closes it.
      shareGreet: () => set({ greetOpen: false }),

      /** Deletes everything this app has stored on the device, then returns to a fresh start. */
      clearAll: async () => {
        const ok = await clearAllData();
        if (!ok) {
          showToast("Couldn't clear data on this device");
          return false;
        }
        set({
          name: '',
          registered: false,
          replaying: false,
          skipOnboarding: false,
          step: 0,
          settings: DEFAULT_SETTINGS,
          saved: {},
          reflections: [],
          practices: {},
          draft: '',
          learnOpen: false,
          journalOpen: false,
          dayKey: get().today,
          fade: 1,
        });
        return true;
      },
    };
  }, [set, showToast]);

  return { state: s, day, ...actions };
}

type Store = ReturnType<typeof useSafaStore>;
const Ctx = createContext<Store | null>(null);

export function SafaProvider({ config = {}, children }: { config?: SafaConfig; children: ReactNode }) {
  const store = useSafaStore(config);
  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}

export function useSafa() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useSafa must be used inside <SafaProvider>');
  return v;
}

export type { DayView };
