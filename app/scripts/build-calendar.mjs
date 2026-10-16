// Converts data/safa_master_calendar_greeting_audit.csv into src/data/calendar.json.
// Run after editing the CSV:  npm run data
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const csv = readFileSync(root + 'data/safa_master_calendar_greeting_audit.csv', 'utf8').replace(/^﻿/, '');

/** RFC 4180 parser: quoted fields, doubled quotes, newlines inside quotes. */
function parse(s) {
  const rows = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (quoted) {
      if (c === '"' && s[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c !== '\r') field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}

const [header, ...body] = parse(csv);
const records = body.filter(r => r.length === header.length).map(r => Object.fromEntries(header.map((k, i) => [k, r[i].trim()])));
const yes = v => v === 'yes';
const opt = v => v || undefined;

const rows = records.map(r => ({
  id: Number(r.row_id),
  date: r.gregorian_date,
  name: r.event_name,
  alt: opt(r.alternate_name),
  tradition: r.tradition_or_system,
  category: r.category,
  subCategory: opt(r.sub_category),
  region: r.region,
  calendar: r.source_calendar_system,
  calendarDate: opt(r.source_calendar_date_if_applicable),
  range: r.single_day_or_range === 'range' && r.range_start ? [r.range_start, r.range_end] : undefined,
  precision: r.date_precision,
  major: yes(r.is_major_observance),
  holiday: r.is_public_holiday_if_applicable,
  moonPhase: r.moon_phase_daily,
  moonTransition: yes(r.is_moon_phase_transition),
  solar: r.solar_context,
  seasonN: r.season_hemisphere_north,
  seasonS: r.season_hemisphere_south,
  type: r.event_type,
  meaning: r.short_meaning,
  tags: r.practical_theme_tags.split(',').map(t => t.trim()).filter(Boolean),
  notes: opt(r.notes),
  share: r.shareable_greeting_applicable,
  greetingType: r.greeting_type,
  greetingTone: opt(r.greeting_tone),
  greetingShort: opt(r.greeting_short),
  greetingLong: opt(r.greeting_long),
  messageType: opt(r.blessing_or_message_type),
  cardWorthy: r.visual_card_worthy,
  sensitivity: r.sensitivity_flag,
}));

if (rows.length !== body.filter(r => r.length > 1).length) throw new Error('Some CSV rows have the wrong number of columns');
writeFileSync(root + 'src/data/calendar.json', JSON.stringify(rows));
console.log(`calendar.json: ${rows.length} rows, ${new Set(rows.map(r => r.date)).size} days`);
