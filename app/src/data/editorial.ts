import type { Flat } from '../ds/almanac';
import { color } from '../theme/tokens';

// Editorial layer, ported from the design system's app/content.js: copy that turns
// a day's practical theme tags into a theme line, practices and a reflection prompt.

export type Tag =
  | 'celebration' | 'devotion' | 'gratitude' | 'renewal' | 'release' | 'reflection' | 'remembrance'
  | 'grounding' | 'transition' | 'cleansing' | 'harvest' | 'balance' | 'planting';

export const THEME: Record<Tag, string> = {
  celebration: 'A day for shared joy',
  devotion: 'A day of devotion and attention',
  gratitude: 'A day to give thanks',
  renewal: 'A day of renewal',
  release: 'What is ready to be released',
  reflection: 'A day for honest reflection',
  remembrance: 'A day of remembrance',
  grounding: 'A day of quiet grounding',
  transition: 'A day between phases',
  cleansing: 'A day to clear space',
  harvest: 'A day to gather in',
  balance: 'A day of balance',
  planting: 'A day to plant',
};

type P = [title: string, category: string, duration?: string];
export const PRACTICE: Record<Tag, P[]> = {
  celebration: [['Share a meal or a sweet with someone', 'Connection'], ['Send one warm message', 'Connection', '2 min']],
  devotion: [['Light a candle and sit for five minutes', 'Spirit', '5 min'], ['Read one passage slowly', 'Learning']],
  gratitude: [['Write down three things you are thankful for', 'Reflection', '3 min'], ['Thank someone by name', 'Connection']],
  renewal: [['Open the windows and let fresh air in', 'Home & body'], ['Begin one small thing you have postponed', 'Intention']],
  release: [['Write and release one emotional burden', 'Reflection', '5 min'], ['Give away one thing you no longer use', 'Home']],
  reflection: [['Take a slow walk without your phone', 'Body', '15 min'], ['Write a few honest lines', 'Reflection', '5 min']],
  remembrance: [['Slow your pace', 'Body'], ['Remember someone by name', 'Reflection']],
  grounding: [['Spend ten quiet minutes outside', 'Nature', '10 min'], ['Make one nourishing choice for your body', 'Home & body']],
  transition: [['Tend to one corner of your home', 'Home & body', '15 min'], ['Notice what is changing in the light', 'Nature']],
  cleansing: [['Clear one room or drawer', 'Home & body', '20 min'], ['Drink water slowly, before coffee', 'Body']],
  harvest: [['Cook with something in season', 'Nature'], ['Gather seeds or cuttings to keep', 'Garden']],
  balance: [['Divide the day evenly between work and rest', 'Body'], ['Sit for a minute at dusk', 'Nature', '1 min']],
  planting: [['Sow or repot one plant', 'Garden', '10 min'], ['Check the soil before watering', 'Garden']],
};

export const REFLECT: Record<Tag, string> = {
  celebration: 'Who would I like to celebrate with, and have I told them?',
  devotion: 'What do I give my full attention to?',
  gratitude: 'What am I grateful for that I usually overlook?',
  renewal: 'What would I like to begin again?',
  release: 'What truth has become too visible to ignore?',
  reflection: 'What do I notice when life is not demanding my reaction?',
  remembrance: 'Who or what would I like to remember today?',
  grounding: 'What helps me feel steady?',
  transition: 'What am I moving out of, and what am I moving into?',
  cleansing: 'What can I let settle today?',
  harvest: 'What have I gathered this season?',
  balance: 'Where would I like a little more balance?',
  planting: 'What small thing am I willing to tend?',
};

export type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter';

/**
 * Flat colour fields replace photography: one colour family and one glyph per kind of day,
 * so each occasion reads at a glance and never looks like a stock picture.
 */
export const FLAT = {
  moon: { bg: color.mauve100, ink: color.mauve700, icon: 'moon' },
  festive: { bg: color.terracotta100, ink: color.terracotta700, icon: 'star' },
  solemn: { bg: color.charcoal900, ink: color.linen100, icon: 'star' },
} satisfies Record<string, Flat>;

export const SEASON_FLAT: Record<Season, Flat> = {
  Spring: { bg: color.sage100, ink: color.sage700, icon: 'seedling' },
  Summer: { bg: color.sage200, ink: color.sage800, icon: 'sun' },
  Autumn: { bg: color.terracotta50, ink: color.terracotta700, icon: 'leaf' },
  Winter: { bg: color.linen300, ink: color.charcoal700, icon: 'snowflake' },
};

/**
 * Nature Now fallback for the Southern Hemisphere, where the calendar's solar terms
 * (written for the north) do not apply. Practical and region-neutral, per the brand guide.
 */
export const SEASON_NOTE: Record<Season, { title: string; text: string }> = {
  Spring: { title: 'Spring is under way', text: 'Days are lengthening and soil is warming. A good time to sow, repot and watch for the first pollinators.' },
  Summer: { title: 'High summer', text: 'Water early or late in the day, leave some shade for wildlife, and let a corner of the garden grow a little wild.' },
  Autumn: { title: 'The season is turning', text: 'Leave seed heads standing for birds, gather fallen leaves for mulch, and notice the earlier dusk.' },
  Winter: { title: 'The quiet season', text: 'Most plants are resting. Keep a little water out for birds and use the slower weeks to plan what to grow.' },
};

/** Category → glyph and accent, from the design's data.js CAT table. */
export const CATEGORY: Record<string, { label: string; icon: string; tint: string }> = {
  religion: { label: 'Faith', icon: 'star', tint: color.terracotta500 },
  natural_cycle: { label: 'Moon', icon: 'moon', tint: color.mauve500 },
  seasonal_system: { label: 'Season', icon: 'leaf', tint: color.sage500 },
  ancient_tradition: { label: 'Ancient', icon: 'landmark', tint: color.stone500 },
  folklore: { label: 'Folklore', icon: 'feather', tint: color.sage700 },
  indigenous_tradition: { label: 'Indigenous', icon: 'seedling', tint: color.terracotta700 },
};

/** Human labels for event_type. */
export const EVENT_TYPE: Record<string, string> = {
  festival: 'Festival',
  solar_term: 'Solar term',
  ritual_day: 'Ritual day',
  feast: 'Feast',
  new_year: 'New year',
  sacred_day: 'Sacred day',
  remembrance: 'Remembrance',
  fast: 'Fast',
  ancestor_day: 'Ancestor day',
  harvest_marker: 'Harvest',
  seasonal_marker: 'Seasonal marker',
  moon_phase: 'Moon phase',
};

export const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
