import type { ImageSourcePropType } from 'react-native';
import { color } from '../theme/tokens';
import type { CalendarRow } from './calendar';
import { IMG } from './editorial';

// Day and observance content comes from the master calendar (calendar.ts / engine.ts).
// This file keeps the greeting card styles and the sample journal entries.

export type CardStyleId = 'lamp' | 'clay' | 'linen';
export type CardStyle = { id: CardStyleId; label: string; image?: ImageSourcePropType; bg: string; wash: string; fg: string; eyebrow: string };

export const CARDS: CardStyle[] = [
  { id: 'lamp', label: 'Lamplight', image: IMG.candlePinecone, bg: color.charcoal900, wash: 'rgba(43,42,39,0.55)', fg: color.linen0, eyebrow: color.linen200 },
  { id: 'clay', label: 'Clay', image: IMG.terracottaRoom, bg: color.terracotta50, wash: 'rgba(248,238,231,0.78)', fg: color.charcoal900, eyebrow: color.terracotta700 },
  { id: 'linen', label: 'Linen', bg: color.linen0, wash: 'transparent', fg: color.charcoal900, eyebrow: color.stone600 },
];

/**
 * Note suggestions for the greeting composer, built from the calendar's greeting copy.
 * For respectful (conditional) occasions the CSV's greeting_long is guidance on how to share,
 * not a message, so it is shown on the observance page instead of being offered here.
 */
export function suggestionsFor(e: CalendarRow) {
  if (e.share !== 'yes') {
    return [
      { label: 'Simple', text: 'Thinking of you today.' },
      { label: 'Presence', text: 'Holding you in mind today, with care.' },
    ];
  }
  const rest = e.greetingLong && e.greetingShort && e.greetingLong.startsWith(e.greetingShort) ? e.greetingLong.slice(e.greetingShort.length).trim() : e.greetingLong;
  const list = [
    rest ? { label: 'Full message', text: rest } : null,
    { label: 'Simple', text: `Thinking of you this ${e.name}.` },
  ];
  return list.filter((x): x is { label: string; text: string } => !!x);
}

export type JournalEntry = { date: string; prompt: string; text: string };

export const SEED_ENTRIES: JournalEntry[] = [
  { date: '12 Oct', prompt: 'What can I let settle today?', text: 'The kitchen table, mostly. And the conversation from Sunday.' },
  { date: '9 Oct', prompt: 'Where did I notice the season today?', text: 'Cold air on the walk to the station. The plane trees have started turning.' },
];
