# Safa — the daily almanac

Expo / React Native implementation of the `Safa App.dc.html` design from the Claude Design
handoff in `../project`. Runs on iOS, Android and web.

```bash
npm install
npm run web        # browser: phone frame on desktop, full-screen on narrow viewports
npm run ios        # or: npm run android / npm start (Expo Go)
npm run typecheck && npm run lint
```

On web, review shortcuts are query params: `/?start=today&date=2026-11-08`
(`start` = `onboarding` | `today`; `date` sets "today", otherwise the device date is used).

## Data

All days and events come from `data/safa_master_calendar_greeting_audit.csv`
(672 rows, 1 Jun 2026 – 1 Jun 2027). After editing it, regenerate the bundled JSON:

```bash
npm run data   # → src/data/calendar.json
```

The day logic follows `data/SAFA_spreadsheet_spec.xlsx` and lives in `src/data/engine.ts`:

- **Day type**: `day_type_logic` rules R01–R11, resolved with the `priority_ladder`. A major
  festive observance on the same day as a solemn one is a Mixed Significance Day led by the solemn frame.
- **Modules**: Nature Now every day (the Chinese solar term in effect; a seasonal note in the
  Southern Hemisphere); Intentions on New Moon days, Release on Full Moon days, Reflect on
  reflection, quiet and solemn days; "Share a Greeting" for `shareable_greeting_applicable = yes`
  and "Share Respectfully" for `conditional`, hidden where a day type's `hide_modules` says so.
- **Copy**: theme lines, practices and reflection prompts come from the design's editorial layer
  (`src/data/editorial.ts`), keyed on each row's `practical_theme_tags`.

## Layout

| Path | What |
| --- | --- |
| `src/theme/tokens.ts` | Colours, spacing, radii, shadows, motion and type roles, ported from `_ds/…/tokens/*.css` |
| `src/ds/` | Design-system components (Button, IconButton, Wordmark, Tag, Eyebrow, PullQuote, Sheet, Toast, Checkbox, Toggle, SegmentedControl, TextField, JournalField, TabBar, BlendHero, ShapesList, PracticeItem, ReflectPrompt, JourneySteps) |
| `src/data/` | `calendar.ts` (CSV rows + dates), `engine.ts` (spec logic), `editorial.ts` (copy and imagery), `content.ts` (card styles, sample journal) |
| `src/state/SafaState.tsx` | App state and actions (the prototype's `Component` logic) |
| `src/screens/` | Onboarding, Today, Almanac / Journal / You, Observance detail + Greeting composer |
| `src/SafaApp.tsx` | Shell: tab bar, sheets, toast, desktop phone frame vs. device safe areas |
| `src/app/` | Expo Router entry; loads Inter, Playfair Display, Noto Serif and Font Awesome 6 |

## Notes

- State is in memory, as in the prototype; nothing persists across launches yet.
- Observance pages show what the CSV holds (meaning, tradition, region, source calendar, dates,
  notes, greeting copy). There are no long-form "how it's observed" or etiquette texts yet.
- Sharing a greeting, "Add to calendar" and the morning reminder show confirmation toasts
  only; they are not wired to the share sheet, calendar or notifications.
