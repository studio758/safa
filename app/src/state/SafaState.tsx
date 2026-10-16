import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ROW_BY_ID, addDays, clampKey, inRange, monthOf, shortDate, toKey } from '../data/calendar';
import { SEED_ENTRIES, suggestionsFor, type CardStyleId, type JournalEntry } from '../data/content';
import { buildDay, type DayView, type Hemisphere } from '../data/engine';

export type Tab = 'today' | 'almanac' | 'journal' | 'you';
export type { Hemisphere };

export type SafaConfig = {
  /** Where the app opens: the welcome flow or straight onto Today. */
  startScreen?: 'onboarding' | 'today';
  /** Override "today" ("YYYY/MM/DD"); defaults to the device date, clamped to the calendar's range. */
  today?: string;
};

/** What survives an app restart: the user's profile and their settings. */
type Persisted = { name: string; registered: boolean; hemi: Hemisphere; remind: boolean; obsRemind: boolean };
const STORE_KEY = 'safa.profile.v1';

type State = {
  /** False until the saved profile has been read, so the welcome flow never flashes. */
  ready: boolean;
  /** True once onboarding is finished; later launches go straight to the app. */
  registered: boolean;
  name: string;
  screen: 'onboarding' | 'app';
  step: number;
  hemi: Hemisphere;
  remind: boolean;
  obsRemind: boolean;
  tab: Tab;
  /** The real current date, clamped to the calendar. */
  today: string;
  /** The day Today is showing. */
  dayKey: string;
  /** The month the Almanac lists ("YYYY/MM"). */
  month: string;
  /** 1 = day content visible, 0 = mid cross-fade between days. */
  fade: number;
  done: Record<string, boolean>;
  saved: Record<string, boolean>;
  learnOpen: boolean;
  journalOpen: boolean;
  draft: string;
  entries: JournalEntry[];
  /** Calendar row shown in the observance page and greeting composer. */
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
    registered: false,
    name: '',
    screen: startScreen === 'today' ? 'app' : 'onboarding',
    step: 0,
    hemi: 'Northern',
    remind: true,
    obsRemind: true,
    tab: 'today',
    today: t,
    dayKey: t,
    month: monthOf(t),
    fade: 1,
    done: {},
    saved: {},
    learnOpen: false,
    journalOpen: false,
    draft: '',
    entries: SEED_ENTRIES,
    obsId: first?.id ?? 1,
    obsOpen: false,
    obsDone: {},
    cal: {},
    greetOpen: false,
    cardStyle: 'lamp',
    recipient: 'Ahmed',
    note: '',
    toast: '',
    toastOn: false,
  };
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

  // Restore the saved profile once on launch. A returning user skips the welcome flow.
  useEffect(() => {
    let alive = true;
    AsyncStorage.getItem(STORE_KEY)
      .then(raw => {
        if (!alive) return;
        const saved = raw ? (JSON.parse(raw) as Partial<Persisted>) : {};
        const registered = !!saved.registered;
        set({
          ready: true,
          name: saved.name ?? '',
          registered,
          hemi: saved.hemi ?? 'Northern',
          remind: saved.remind ?? true,
          obsRemind: saved.obsRemind ?? true,
          screen: config.startScreen === 'today' || registered ? 'app' : 'onboarding',
        });
      })
      .catch(() => { if (alive) set({ ready: true }); });
    return () => { alive = false; };
  }, [set, config.startScreen]);

  // Save the profile and settings whenever they change, once they have been restored.
  const { ready, name, registered, hemi, remind, obsRemind } = s;
  useEffect(() => {
    if (!ready) return;
    const data: Persisted = { name, registered, hemi, remind, obsRemind };
    AsyncStorage.setItem(STORE_KEY, JSON.stringify(data)).catch(() => {});
  }, [ready, name, registered, hemi, remind, obsRemind]);

  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const dayTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => { clearTimeout(toastTimer.current); clearTimeout(dayTimer.current); }, []);

  const day = useMemo(() => buildDay(s.dayKey, s.hemi), [s.dayKey, s.hemi]);

  const actions = useMemo(() => {
    const get = () => ref.current;
    const showToast = (msg: string) => {
      clearTimeout(toastTimer.current);
      set({ toast: msg, toastOn: true });
      toastTimer.current = setTimeout(() => set({ toastOn: false }), 2200);
    };
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
      goDay,
      prevDay: () => goDay(addDays(get().dayKey, -1)),
      nextDay: () => goDay(addDays(get().dayKey, 1)),
      goToday: () => goDay(get().today),
      showDay: (key: string) => { set({ tab: 'today', obsOpen: false, greetOpen: false }); goDay(key); },
      setMonth: (month: string) => set({ month }),
      nextStep: () => set(get().step < 3 ? { step: get().step + 1 } : { registered: true, screen: 'app', tab: 'today' }),
      setName: (name: string) => set({ name }),
      selectDay: (key: string) => goDay(key),
      replay: () => set({ screen: 'onboarding', step: 0 }),
      setHemi: (hemi: string) => set({ hemi: hemi as Hemisphere }),
      setRemind: (remind: boolean) => set({ remind }),
      setObsRemind: (obsRemind: boolean) => set({ obsRemind }),
      setTab: (tab: Tab) => set({ tab }),
      togglePractice: (key: string, v: boolean) => set({ done: { ...get().done, [key]: v } }),
      toggleSave: () => {
        const st = get();
        const v = !st.saved[st.dayKey];
        set({ saved: { ...st.saved, [st.dayKey]: v } });
        showToast(v ? 'Day saved to your journal' : 'Removed from saved');
      },
      openLearn: () => set({ learnOpen: true }),
      closeLearn: () => set({ learnOpen: false }),
      openJournal: () => set({ journalOpen: true }),
      closeJournal: () => set({ journalOpen: false }),
      setDraft: (draft: string) => set({ draft }),
      saveEntry: (prompt: string) => {
        const st = get();
        set({ entries: [{ date: shortDate(st.dayKey), prompt, text: st.draft.trim() }, ...st.entries], draft: '', journalOpen: false });
        showToast('Saved to your journal');
      },
      openObs: (id: number) => set({ ...prepareGreeting(id), obsOpen: true, learnOpen: false }),
      closeObs: () => set({ obsOpen: false, greetOpen: false }),
      toggleObsPractice: (key: string, v: boolean) => set({ obsDone: { ...get().obsDone, [key]: v } }),
      toggleCal: () => {
        const st = get();
        const v = !st.cal[st.obsId];
        set({ cal: { ...st.cal, [st.obsId]: v } });
        showToast(v ? `${ROW_BY_ID.get(st.obsId)?.name ?? 'Observance'} added to your calendar` : 'Removed from calendar');
      },
      /** Open the composer, optionally for a specific calendar row (e.g. from Today's CTA). */
      openGreet: (id?: number) => set({ ...(id !== undefined ? prepareGreeting(id) : {}), greetOpen: true }),
      closeGreet: () => set({ greetOpen: false }),
      setCardStyle: (cardStyle: CardStyleId) => set({ cardStyle }),
      setRecipient: (recipient: string) => set({ recipient }),
      setNote: (note: string) => set({ note }),
      shareGreet: () => {
        const respectful = ROW_BY_ID.get(get().obsId)?.share !== 'yes';
        set({ greetOpen: false });
        showToast(`${respectful ? 'Message' : 'Greeting'} for ${get().recipient.trim() || 'someone dear'} is ready to share`);
      },
    };
  }, [set]);

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
