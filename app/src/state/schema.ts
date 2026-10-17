import type { Hemisphere } from '../data/engine';

// Persisted data shapes. Everything here is stored on the device only (see lib/storage.ts).

/**
 * A place the user picks for nature guidance. The picker UI arrives in Stage 4;
 * the shape is fixed now so stored settings do not need a migration later.
 */
export type RegionSelection = {
  id: string;
  label: string;
  source: 'search' | 'manual' | 'device';
};

/** Time zone for lunar times. Stage 2 uses it; `device` follows the phone's zone. */
export type TimeZoneSetting = {
  mode: 'device' | 'manual';
  /** IANA zone name, e.g. "Asia/Dubai". Only read when mode is "manual". */
  zone: string | null;
};

export type Settings = {
  hemisphere: Hemisphere;
  region: RegionSelection | null;
  timeZone: TimeZoneSetting;
};

export const DEFAULT_SETTINGS: Settings = {
  hemisphere: 'Northern',
  region: null,
  timeZone: { mode: 'device', zone: null },
};

export type Profile = { name: string; registered: boolean };

/** A reflection the user wrote from a Reflect prompt. Only text the user typed is stored here. */
export type Reflection = {
  id: string;
  /** Calendar day the prompt belonged to ("YYYY/MM/DD"). */
  dayKey: string;
  prompt: string;
  text: string;
  /** ISO timestamp of when the user saved it. */
  createdAt: string;
};

/** A ritual practice the user ticked off. The title is stored so history does not depend on the calendar. */
export type PracticeRecord = { title: string; at: string };

export type Persisted = {
  profile: Profile;
  settings: Settings;
  /** Saved calendar days, keyed by "YYYY/MM/DD". */
  saved: Record<string, boolean>;
  reflections: Reflection[];
  /** Completed practices, keyed by "YYYY/MM/DD:index". */
  practices: Record<string, PracticeRecord>;
};
