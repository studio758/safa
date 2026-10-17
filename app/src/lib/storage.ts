import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_SETTINGS, type Persisted, type PracticeRecord, type Profile, type Reflection, type RegionSelection, type Settings } from '../state/schema';

/** Versioned keys. Bump the version (v3) if a shape changes incompatibly. */
export const KEYS = {
  profile: 'safa.v2.profile',
  settings: 'safa.v2.settings',
  saved: 'safa.v2.saved',
  reflections: 'safa.v2.reflections',
  practices: 'safa.v2.practices',
} as const;

/** The single profile key used by the earlier prototype, migrated once on first launch. */
const LEGACY_PROFILE_V1 = 'safa.profile.v1';

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

async function readJson(key: string): Promise<unknown> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw == null ? undefined : JSON.parse(raw);
  } catch {
    // Unreadable or corrupt data is treated as absent rather than crashing the app.
    return undefined;
  }
}

/** Returns false if the device refused the write, so the caller can tell the user. */
export async function writeJson(key: string, value: unknown): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function readRegion(v: unknown): RegionSelection | null {
  if (!isObj(v) || typeof v.id !== 'string' || typeof v.label !== 'string') return null;
  const source = v.source === 'search' || v.source === 'device' ? v.source : 'manual';
  return { id: v.id, label: v.label, source };
}

function readSettings(v: unknown): Settings {
  if (!isObj(v)) return DEFAULT_SETTINGS;
  const tz = isObj(v.timeZone) ? v.timeZone : {};
  return {
    hemisphere: v.hemisphere === 'Southern' ? 'Southern' : 'Northern',
    region: readRegion(v.region),
    timeZone: {
      mode: tz.mode === 'manual' ? 'manual' : 'device',
      zone: typeof tz.zone === 'string' ? tz.zone : null,
    },
  };
}

function readSaved(v: unknown): Record<string, boolean> {
  if (!isObj(v)) return {};
  return Object.fromEntries(Object.entries(v).filter((e): e is [string, true] => e[1] === true));
}

function readReflections(v: unknown): Reflection[] {
  if (!Array.isArray(v)) return [];
  return v.filter(
    (r): r is Reflection =>
      isObj(r) && typeof r.id === 'string' && typeof r.dayKey === 'string' && typeof r.prompt === 'string' && typeof r.text === 'string' && typeof r.createdAt === 'string',
  );
}

function readPractices(v: unknown): Record<string, PracticeRecord> {
  if (!isObj(v)) return {};
  return Object.fromEntries(
    Object.entries(v).filter((e): e is [string, PracticeRecord] => isObj(e[1]) && typeof e[1].title === 'string' && typeof e[1].at === 'string'),
  );
}

/** Reads everything the app keeps on the device, migrating the prototype's profile key once. */
export async function loadPersisted(): Promise<Persisted> {
  const [p, s, sv, rf, pr] = await Promise.all([
    readJson(KEYS.profile),
    readJson(KEYS.settings),
    readJson(KEYS.saved),
    readJson(KEYS.reflections),
    readJson(KEYS.practices),
  ]);

  let profile: Profile = { name: '', registered: false };
  let settings = readSettings(s);

  if (isObj(p)) {
    profile = { name: typeof p.name === 'string' ? p.name : '', registered: p.registered === true };
  } else {
    const v1 = await readJson(LEGACY_PROFILE_V1);
    if (isObj(v1)) {
      profile = { name: typeof v1.name === 'string' ? v1.name : '', registered: v1.registered === true };
      settings = { ...settings, hemisphere: v1.hemi === 'Southern' ? 'Southern' : 'Northern' };
      const saved = (await writeJson(KEYS.profile, profile)) && (await writeJson(KEYS.settings, settings));
      // Only remove the old key once the new one is safely written.
      if (saved) await AsyncStorage.removeItem(LEGACY_PROFILE_V1).catch(() => undefined);
    }
  }

  return {
    profile,
    settings,
    saved: readSaved(sv),
    reflections: readReflections(rf),
    practices: readPractices(pr),
  };
}

/** Removes every key this app has written, including the prototype's. */
export async function clearAllData(): Promise<boolean> {
  try {
    await AsyncStorage.multiRemove([...Object.values(KEYS), LEGACY_PROFILE_V1]);
    return true;
  } catch {
    return false;
  }
}
