import type { ImageSourcePropType } from 'react-native';
import type { Shape } from '../ds/almanac';
import type { TagTone } from '../ds/display';
import { color } from '../theme/tokens';
import { ROWS, longDate, rowsFor, shortDate, type CalendarRow } from './calendar';
import { CATEGORY, EVENT_TYPE, IMG, PRACTICE, REFLECT, SEASON_IMG, SEASON_NOTE, THEME, hash, type Season, type Tag } from './editorial';

// Implements data/SAFA_spreadsheet_spec.xlsx: day_type_logic (R01–R11), priority_ladder,
// module_visibility and greeting_logic, applied to the master calendar rows.

export type Hemisphere = 'Northern' | 'Southern';

export type DayType =
  | 'Festive Day' | 'Sacred Solemn Day' | 'Reflection Day' | 'Intention Day' | 'Release Day' | 'Action Day'
  | 'Recalibration Day' | 'Seasonal Transition Day' | 'Nature Alignment Day' | 'Mixed Significance Day' | 'Quiet Day';

type Rule = { rule: string; tone: string; tag: TagTone; cta: string; hide: Module[] };
type Module = 'greeting' | 'respectful' | 'intentions' | 'release';

/** day_type_logic: tone, CTA and hidden modules per day type. */
const RULES: Record<DayType, Rule> = {
  'Festive Day': { rule: 'R01', tone: 'joyful, warm, communal', tag: 'terracotta', cta: 'Share a Greeting', hide: ['respectful'] },
  'Sacred Solemn Day': { rule: 'R02', tone: 'reverent, respectful, restrained', tag: 'neutral', cta: 'Share Respectfully', hide: ['greeting'] },
  'Reflection Day': { rule: 'R03', tone: 'calm, inward, thoughtful', tag: 'mauve', cta: 'Reflect', hide: ['greeting'] },
  'Intention Day': { rule: 'R04', tone: 'hopeful, clear, open', tag: 'mauve', cta: 'Set an Intention', hide: ['release'] },
  'Release Day': { rule: 'R05', tone: 'cleansing, honest, spacious', tag: 'mauve', cta: 'Release', hide: ['intentions'] },
  'Action Day': { rule: 'R06', tone: 'focused, active, committed', tag: 'sage', cta: 'Take Action', hide: ['release', 'intentions'] },
  'Recalibration Day': { rule: 'R07', tone: 'simplifying, adjusting, clear', tag: 'sage', cta: 'Recalibrate', hide: ['greeting'] },
  'Seasonal Transition Day': { rule: 'R08', tone: 'grounded, observant, renewing', tag: 'sage', cta: 'Explore the Shift', hide: [] },
  'Nature Alignment Day': { rule: 'R09', tone: 'earthy, practical, attentive', tag: 'sage', cta: 'Act with Nature', hide: [] },
  'Mixed Significance Day': { rule: 'R10', tone: 'depends on dominant frame', tag: 'terracotta', cta: 'Depends on dominant frame', hide: [] },
  'Quiet Day': { rule: 'R11', tone: 'simple, soft, uncluttered', tag: 'neutral', cta: 'Notice Today', hide: ['greeting', 'respectful'] },
};

// ---- Event classification ------------------------------------------------------

/** greeting_logic G04/G05: a high-sensitivity row, or a solemn/reverent acknowledgment. */
export const isSolemn = (e: CalendarRow) => e.sensitivity === 'high' || e.greetingType === 'remembrance' || e.greetingTone === 'solemn';
/** greeting_logic G01–G03: safe for a celebratory greeting card. */
export const isFestive = (e: CalendarRow) => e.share === 'yes' && !isSolemn(e);
/** Reflective but not festive (respectful acknowledgment without high sensitivity). */
const isReflective = (e: CalendarRow) => e.share === 'conditional' && !isSolemn(e);
/** The solstice/equinox row itself (solar_context is a per-date column shared by every row that day). */
const isSolstice = (e: CalendarRow) => e.type === 'seasonal_marker' && (e.solar === 'Solstice' || e.solar === 'Equinox');
/** nature_logic: solar terms and harvest markers are the calendar's nature timing cues. */
const isNatureCue = (e: CalendarRow) => e.type === 'solar_term' || e.type === 'harvest_marker';

export type GreetingMode = 'greeting' | 'respectful';
/** Which share CTA an event offers (module_visibility: yes → Share a Greeting, conditional → Share Respectfully). */
export const greetingModeFor = (e: CalendarRow): GreetingMode | null => (e.share === 'yes' ? 'greeting' : e.share === 'conditional' ? 'respectful' : null);

/** priority_ladder order for listing a day's events. */
function rank(e: CalendarRow) {
  if (e.major && !isSolemn(e) && e.type !== 'solar_term' && e.type !== 'seasonal_marker') return 1;
  if (isSolemn(e)) return 2;
  if (isSolstice(e)) return 4;
  if (isNatureCue(e)) return 5;
  return 6;
}
export const rankEvents = (events: CalendarRow[]) => [...events].sort((a, b) => rank(a) - rank(b) || Number(b.major) - Number(a.major) || a.id - b.id);

/** day_type_logic + priority_ladder: the first matching rule wins. */
function dayTypeFor(moon: CalendarRow | undefined, events: CalendarRow[]): DayType {
  const majorFestive = events.some(e => e.major && isFestive(e) && !isSolstice(e));
  const solemn = events.some(isSolemn);
  if (majorFestive && solemn) return 'Mixed Significance Day'; // R10, solemn frame dominates tone
  if (majorFestive) return 'Festive Day'; // R01
  if (solemn) return 'Sacred Solemn Day'; // R02
  if (events.some(e => e.major && isReflective(e))) return 'Reflection Day'; // R03
  if (moon?.moonTransition) {
    const phase = moon.moonPhase;
    if (phase === 'New Moon') return 'Intention Day'; // R04
    if (phase === 'Full Moon') return 'Release Day'; // R05
    if (phase === 'First Quarter') return 'Action Day'; // R06
    if (phase === 'Last Quarter') return 'Recalibration Day'; // R07
  }
  if (events.some(isSolstice)) return 'Seasonal Transition Day'; // R08
  if (events.some(isNatureCue)) return 'Nature Alignment Day'; // R09
  // priority_ladder 6: a minor marker leads only when the day is otherwise quiet.
  if (events.some(isFestive)) return 'Festive Day';
  if (events.some(isReflective)) return 'Reflection Day';
  return 'Quiet Day'; // R11
}

/** The design's weightTags: rank practical theme tags across the day's rows. */
function weightTags(moon: CalendarRow | undefined, events: CalendarRow[]): Tag[] {
  const w: Record<string, number> = {};
  const add = (e: CalendarRow, k: number) => e.tags.forEach((t, i) => (w[t] = (w[t] ?? 0) + k * (i === 0 ? 1.2 : 1)));
  if (moon) add(moon, 1);
  events.forEach(e => add(e, e.major ? 4 : 2));
  if (moon?.moonPhase === 'Full Moon') w.release = (w.release ?? 0) + 3;
  if (moon?.moonPhase === 'New Moon') w.renewal = (w.renewal ?? 0) + 3;
  const solemn = events.find(isSolemn);
  if (solemn) solemn.tags.forEach(t => (w[t] = (w[t] ?? 0) + 10));
  return Object.entries(w)
    .sort((a, b) => b[1] - a[1])
    .map(x => x[0])
    .filter((t): t is Tag => t in THEME);
}

/** The Chinese solar term in effect on a date (the calendar's continuous nature thread). */
const SOLAR_TERMS = ROWS.filter(r => r.type === 'solar_term' && r.tradition === 'Chinese solar terms');
function solarTermOn(key: string) {
  let cur: CalendarRow | undefined;
  for (const t of SOLAR_TERMS) if (t.date <= key) cur = t;
  return cur;
}

export const seasonOf = (row: CalendarRow | undefined, hemi: Hemisphere) => ((hemi === 'Southern' ? row?.seasonS : row?.seasonN) || 'Autumn') as Season;

export function imageForEvent(e: CalendarRow, season: Season): ImageSourcePropType {
  if (isSolemn(e)) return IMG.lampPlinth;
  const pool = SEASON_IMG[season];
  return pool[hash(e.name) % pool.length];
}

// ---- Day view ------------------------------------------------------------------

export type Practice = { title: string; category: string; duration?: string };
export type PromptModule = { kind: 'reflect' | 'intention' | 'release'; label: string; prompt: string; action: string };

export type DayView = {
  key: string;
  date: string;
  short: string;
  dayType: DayType;
  tone: string;
  tagTone: TagTone;
  theme: string;
  blend: string;
  image: ImageSourcePropType;
  cues: string[];
  season: Season;
  moon?: CalendarRow;
  /** Ranked by the priority ladder. */
  events: CalendarRow[];
  lead?: CalendarRow;
  shapes: (Shape & { eventId?: number })[];
  nature: { title: string; text: string; image: ImageSourcePropType };
  practice: Practice[];
  prompt: PromptModule | null;
  /** Journal prompt for the day, used even when no prompt module is shown. */
  reflect: string;
  /** The day's share CTA, if module visibility allows one. */
  share: { event: CalendarRow; mode: GreetingMode } | null;
  /** What the dot in the week strip shows. */
  kind: 'observance' | 'moon' | 'season' | 'quiet';
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** content_objects: Today's Blend is at most 220 characters. */
function blendFor(moon: CalendarRow | undefined, events: CalendarRow[], lead: CalendarRow | undefined) {
  const moonLine = moon?.meaning ?? '';
  if (!lead) return `No major observance falls today. ${moonLine} Every day holds a subtle rhythm, even the quiet ones.`.trim();
  const others = events.filter(e => e !== lead && e.type !== 'solar_term').map(e => e.name);
  for (let n = Math.min(2, others.length); n >= 0; n--) {
    const also = n ? ` Also marked today: ${others.slice(0, n).join(' and ')}.` : '';
    const text = `${lead.meaning}${also} ${moonLine}`.trim();
    if (text.length <= 220 || n === 0) return text.length <= 220 ? text : lead.meaning;
  }
  return lead.meaning;
}

export function buildDay(key: string, hemi: Hemisphere): DayView {
  const { moon, events: raw } = rowsFor(key);
  const events = rankEvents(raw);
  const dayType = dayTypeFor(moon, events);
  const rule = RULES[dayType];
  const season = seasonOf(moon ?? events[0], hemi);
  const tags = weightTags(moon, events);
  const top: Tag = tags[0] ?? 'grounding';
  const solemn = events.find(isSolemn);
  const lead = dayType === 'Sacred Solemn Day' || dayType === 'Mixed Significance Day' ? solemn : events[0];

  const pool = SEASON_IMG[season];
  const h = hash(key);
  const image =
    moon?.moonPhase === 'Full Moon' ? IMG.moonrise : solemn ? IMG.lampPlinth : pool[h % pool.length];

  // Nature Now must appear every day (module_visibility). North: the solar term in effect.
  const term = hemi === 'Northern' ? solarTermOn(key) : undefined;
  const natureImg = pool[(h + 1) % pool.length];
  const nature = term
    ? { title: term.date === key ? `${term.name} begins today` : `${term.name}, since ${shortDate(term.date)}`, text: term.meaning, image: natureImg }
    : { ...SEASON_NOTE[season], image: natureImg };

  // What Shapes Today: the strongest 2–5 drivers.
  const shapes: DayView['shapes'] = [];
  events.slice(0, 3).forEach(e => {
    const cat = CATEGORY[e.category] ?? CATEGORY.religion;
    shapes.push({ icon: cat.icon, kind: 'observance', tint: cat.tint, title: e.name, detail: `${e.meaning} · ${e.tradition}`, eventId: e.id });
  });
  if (moon) shapes.push({ icon: 'moon', kind: 'moon', title: moon.moonPhase, detail: moon.meaning });
  shapes.push({
    icon: 'leaf',
    kind: 'season',
    title: `${season} in the ${hemi} Hemisphere`,
    detail: term ? `Solar term: ${term.name}` : undefined,
  });

  const second: Tag = tags.find(t => t !== top) ?? 'grounding';
  const practice = [...PRACTICE[top], ...PRACTICE[second]].slice(0, 3).map(([title, category, duration]) => ({ title, category, duration }));

  let prompt: PromptModule | null = null;
  if (dayType === 'Intention Day') prompt = { kind: 'intention', label: 'Set an Intention', prompt: REFLECT.renewal, action: 'Write an intention' };
  else if (dayType === 'Release Day') prompt = { kind: 'release', label: 'Release', prompt: REFLECT.release, action: 'Write what you release' };
  else if (['Reflection Day', 'Quiet Day', 'Sacred Solemn Day', 'Mixed Significance Day'].includes(dayType))
    prompt = { kind: 'reflect', label: 'Reflect', prompt: REFLECT[top], action: 'Write in your journal' };

  let share: DayView['share'] = null;
  for (const e of events) {
    const mode = greetingModeFor(e);
    if (!mode || rule.hide.includes(mode)) continue;
    if (dayType === 'Mixed Significance Day' && mode === 'greeting') continue; // the solemn frame leads
    share = { event: e, mode };
    break;
  }

  const cues = [moon?.moonPhase, season, cap(top)].filter((c): c is string => !!c);
  const kind: DayView['kind'] = events.some(e => e.type !== 'solar_term' && e.type !== 'seasonal_marker')
    ? 'observance'
    : moon?.moonTransition
      ? 'moon'
      : events.length
        ? 'season'
        : 'quiet';

  return {
    key,
    date: longDate(key),
    short: shortDate(key),
    dayType,
    tone: rule.tone,
    tagTone: rule.tag,
    theme: THEME[top],
    blend: blendFor(moon, events, lead),
    image,
    cues,
    season,
    moon,
    events,
    lead,
    shapes: shapes.slice(0, 5),
    nature,
    practice,
    prompt,
    reflect: prompt?.prompt ?? REFLECT[top],
    share,
    kind,
  };
}

export const DAY_KIND_COLOR: Record<DayView['kind'], string> = {
  observance: color.terracotta500,
  moon: color.mauve500,
  season: color.sage500,
  quiet: 'transparent',
};

/** Display label: "Festive Day" → "Festive day" (sentence case, per the brand guide). */
export const dayTypeLabel = (t: DayType) => t.charAt(0) + t.slice(1).toLowerCase();

export const eventTypeLabel = (e: CalendarRow) => EVENT_TYPE[e.type] ?? cap(e.type.replace(/_/g, ' '));

export const practiceFor = (e: CalendarRow): Practice[] => {
  const tags = e.tags.filter((t): t is Tag => t in PRACTICE);
  const list = [...(PRACTICE[tags[0]] ?? PRACTICE.grounding), ...(PRACTICE[tags[1]] ?? [])];
  return list.slice(0, 3).map(([title, category, duration]) => ({ title, category, duration }));
};
