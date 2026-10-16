import raw from './calendar.json';

/** One row of the Safa master calendar (see scripts/build-calendar.mjs for the CSV mapping). */
export type CalendarRow = {
  id: number;
  /** "YYYY/MM/DD" */
  date: string;
  name: string;
  alt?: string;
  tradition: string;
  category: string;
  subCategory?: string;
  region: string;
  calendar: string;
  calendarDate?: string;
  range?: [string, string];
  precision: string;
  major: boolean;
  holiday: string;
  moonPhase: string;
  moonTransition: boolean;
  solar: string;
  seasonN: string;
  seasonS: string;
  type: string;
  meaning: string;
  tags: string[];
  notes?: string;
  share: 'yes' | 'conditional' | 'no' | string;
  greetingType: string;
  greetingTone?: string;
  greetingShort?: string;
  greetingLong?: string;
  messageType?: string;
  cardWorthy: string;
  sensitivity: 'low' | 'medium' | 'high' | string;
};

export const ROWS = raw as CalendarRow[];
export const ROW_BY_ID = new Map(ROWS.map(r => [r.id, r]));

const byDay = new Map<string, CalendarRow[]>();
for (const r of ROWS) {
  const list = byDay.get(r.date);
  if (list) list.push(r);
  else byDay.set(r.date, [r]);
}

/** Every date the calendar covers, sorted. */
export const DAY_KEYS = [...byDay.keys()].sort();
export const FIRST_DAY = DAY_KEYS[0];
export const LAST_DAY = DAY_KEYS[DAY_KEYS.length - 1];

export function rowsFor(key: string) {
  const list = byDay.get(key) ?? [];
  return { moon: list.find(r => r.type === 'moon_phase'), events: list.filter(r => r.type !== 'moon_phase') };
}

// ---- Dates -------------------------------------------------------------------

const pad = (n: number) => String(n).padStart(2, '0');
export const toKey = (d: Date) => `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())}`;
export function fromKey(k: string) {
  const [y, m, d] = k.split('/').map(Number);
  return new Date(y, m - 1, d);
}
export function addDays(k: string, n: number) {
  const d = fromKey(k);
  d.setDate(d.getDate() + n);
  return toKey(d);
}
export const daysBetween = (a: string, b: string) => Math.round((fromKey(b).getTime() - fromKey(a).getTime()) / 864e5);
export const clampKey = (k: string) => (k < FIRST_DAY ? FIRST_DAY : k > LAST_DAY ? LAST_DAY : k);
export const inRange = (k: string) => k >= FIRST_DAY && k <= LAST_DAY;

const WEEKDAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** "Friday, 16 October" */
export function longDate(k: string) {
  const d = fromKey(k);
  return `${WEEKDAY[d.getDay()]}, ${d.getDate()} ${MONTH[d.getMonth()]}`;
}
/** "16 Oct" */
export function shortDate(k: string) {
  const d = fromKey(k);
  return `${d.getDate()} ${MONTH[d.getMonth()].slice(0, 3)}`;
}
/** "October 2026" from "2026/10" */
export function monthTitle(month: string) {
  const [y, m] = month.split('/').map(Number);
  return `${MONTH[m - 1]} ${y}`;
}
export const monthOf = (k: string) => k.slice(0, 7);
export function addMonths(month: string, n: number) {
  const [y, m] = month.split('/').map(Number);
  const d = new Date(y, m - 1 + n, 1);
  return `${d.getFullYear()}/${pad(d.getMonth() + 1)}`;
}
export const weekdayShort = (k: string) => WEEKDAY[fromKey(k).getDay()].slice(0, 3);

/** "Today", "Tomorrow", "In 3 days", "Yesterday", "5 days ago" */
export function relativeLabel(k: string, today: string) {
  const n = daysBetween(today, k);
  if (n === 0) return 'Today';
  if (n === 1) return 'Tomorrow';
  if (n === -1) return 'Yesterday';
  return n > 0 ? `In ${n} days` : `${-n} days ago`;
}

/** "Day 7 of 9" for multi-day observances. */
export function rangeLabel(r: CalendarRow) {
  if (!r.range) return undefined;
  const total = daysBetween(r.range[0], r.range[1]) + 1;
  const n = daysBetween(r.range[0], r.date) + 1;
  return total > 1 ? `Day ${n} of ${total}` : undefined;
}
