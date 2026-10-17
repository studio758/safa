# Safa 2.0: Codebase Audit and Migration Plan

Status: **Phase 1 complete. Awaiting approval before any application changes.**
Baseline: `main` at `8b4c55c` (SDK 57). Backups:

- `backup/prototype-2026-10-17` at `8b4c55c`: current prototype, including the profile onboarding and flat-colour changes.
- `backup/handoff-original` at `0f8b120`: the original design handoff, including the nine photographs that were later removed.

Checks on the current baseline: `tsc --noEmit` passes, `expo lint` passes, and `expo export --platform web` builds. There are no tests. `npm audit` reports 27 vulnerabilities (19 high), not yet addressed.

---

## 1. Codebase audit

### 1.1 Structure

| Area | Files | State |
| --- | --- | --- |
| Routing | `src/app/` (Expo Router) | One route, `index.tsx`, which renders `SafaApp`. Tabs and sheets are held in component state (`s.tab`), not in the router. |
| Shell | `src/SafaApp.tsx` | Tab bar, sheets, toast, phone frame on desktop web. |
| State | `src/state/SafaState.tsx` | One React context store (~220 lines). Persists only name, registration, hemisphere and reminder toggles (AsyncStorage). |
| Calendar data | `data/*.csv` → `scripts/build-calendar.mjs` → `src/data/calendar.json` | 672 rows, 366 days, 1 Jun 2026 to 1 Jun 2027. One 39-column CSV mixing events, moon phases, seasons and greetings. |
| Day logic | `src/data/engine.ts` | Implements the spreadsheet spec (day types R01–R11, priority ladder, module visibility). Deterministic. |
| Copy | `src/data/editorial.ts`, `content.ts` | Theme lines, practices and reflection prompts keyed by tag. |
| Screens | `Onboarding`, `Today`, `Tabs` (Almanac, Journal, You), `Overlays` (observance detail, greeting composer) | Working UI, most state in memory. |
| Design system | `src/ds/*`, `src/theme/tokens.ts` | Solid base. Tokens are a faithful port of the handoff CSS. |

### 1.2 Functional versus simulated

**Functional (real behaviour):**
- Day navigation (previous, next, back to today), with the day range clamped to the calendar.
- Hemisphere switch changes season labels and the nature note.
- Almanac week strip swipes between weeks; the month list follows.
- Onboarding steps, with the name required before continuing.
- Profile name, hemisphere and reminder toggles persist across launches.
- Practice checkboxes, the reflection sheet and the observance detail page work for the session.
- Day type, moon phase, what-shapes-today and priority ordering come from the spec engine.

**Simulated or misleading (must not ship as-is, per the brief's "do not use confirmation messages to simulate actions"):**
- "Added to your calendar" toast. Nothing is written to any calendar.
- "Message for … is ready to share" toast. Nothing is shared.
- "Morning reminder" and "Observances you follow" toggles. They persist a flag, but no notification is scheduled.
- "Saved to your journal" and "Day saved". These save in memory only, so they are lost on restart.
- Greeting card style picker. It changes the preview only.
- Fake "9:41" status bar, drawn only inside the desktop phone frame.

**Not in the app at all (required by 2.0):** Moon screen, Nature screen, Rituals screen, Sleep and audio, location or climate selection, Settings screen, local notifications, offline tests.

### 1.3 Sample data and hardcoded content

- `SEED_ENTRIES` in `content.ts`: two invented journal entries ("12 Oct", "9 Oct") shown in the Journal as if the user wrote them. Replace with an empty state.
- `recipient: 'Ahmed'` default in `SafaState.tsx`. Remove.
- Moon phases are hardcoded per row in the CSV, marked `computed_exact`, but **no code computes them**. The brief forbids invented astronomical dates as fact; the current values need a computed source (section 4.1).
- Seasons (`season_hemisphere_north`, `season_hemisphere_south`) are hardcoded per row. There is no climate or region model.
- Nature note fallback (`SEASON_NOTE`) is a single generic text per hemisphere.
- The calendar ends on 1 Jun 2027. After that the app clamps to the last day, which will be wrong for users once the date passes.
- Route example `?date=2026-11-08` in the code comment, and the `?start=` shortcut, are review tools. Keep them behind a dev flag.

### 1.4 Moon data check (done during this audit)

I compared the 26 new and full moon transitions in the CSV window against an independent low-precision lunar calculation (Meeus, *Astronomical Algorithms*, ch. 49). The CSV agrees to within a day for every transition in the window, with one exception:

- **New moon, 10 Oct 2026, 15:50 UTC (19:50 in Dubai)**. The CSV lists **11 Oct**. In Dubai local time the date should be 10 Oct.

Caveats: this is an approximation, not a validated ephemeris, so the exact minute and the date near midnight need confirming against a reference such as USNO. The result still shows that the CSV has no defined time zone and is hand-entered. The brief's accuracy requirement cannot be met by the CSV alone.

### 1.5 Known gaps against the brief

- **No real navigation.** Tabs are state. The brief requires Expo Router navigation (AGENTS.md also asks for it).
- **No audio, no sleep timer, no notifications, no location, no Settings screen.**
- **No tests of any kind.**
- **Persistence covers only profile and settings.** Saved days, journal entries, practice completion and calendar choices are in memory.
- **Content is not separated by type.** Astronomy, seasonal ecology, traditional belief, mindfulness and audio metadata all live in one CSV and one editorial file.
- **Nature is hemisphere-only.** The brief forbids hemisphere alone as the basis for planting or pruning.
- **Expo API check.** AGENTS.md asks that Expo APIs be checked against the current docs before use. I could not fetch the docs from this sandbox. Each Expo module must be checked before it is added.

---

## 2. Reusable component inventory

| Component | Location | Reuse in 2.0 |
| --- | --- | --- |
| Design tokens (colour, type, radius, motion) | `theme/tokens.ts` | **Keep as-is.** Matches the brief's palette. |
| `Button`, `IconButton`, `Icon` | `ds/` | Keep. |
| `TabBar` | `ds/TabBar.tsx` | Keep. Change its five items to Today, Moon, Nature, Rituals, Sleep. |
| `Wordmark` | `ds/Wordmark.tsx` | Keep. |
| `Eyebrow`, `Tag`, `PullQuote` | `ds/display.tsx` | Keep. |
| `Checkbox`, `Toggle`, `SegmentedControl`, `TextField`, `JournalField` | `ds/forms.tsx` | Keep. `JournalField` and `TextField` cover Rituals and Settings. |
| `Sheet`, `Toast` | `ds/feedback.tsx` | Keep. The toast must not announce actions that did not happen. |
| `BlendHero`, `ShapesList`, `PracticeItem`, `ReflectPrompt`, `JourneySteps`, `FlatTile`, `IconBadge` | `ds/almanac.tsx` | Keep. `BlendHero` and `ShapesList` become Today and Moon components. |
| `Scroller`, `ScreenTitle`, `ListRow`, `card`, `TAB_CONTENT` | `screens/shared.tsx` | Keep. |
| `useTween` | `lib/useTween.ts` | Keep. |
| Onboarding step pattern (`Step`) | `screens/Onboarding.tsx` | Keep the pattern; the steps change. |
| `engine.ts` day logic | `data/engine.ts` | **Keep the logic, adapt the inputs.** It becomes the Today composer. |
| `calendar.ts` loader and date helpers | `data/calendar.ts` | Keep the date helpers. Replace the data source for moon phases. |
| `editorial.ts` copy | `data/editorial.ts` | Move to versioned content files (section 3). |
| Greeting composer, observance detail, `CARDS`, `suggestionsFor` | `screens/Overlays.tsx`, `data/content.ts` | **Preserve, do not show in primary navigation.** Move to a `legacy/` folder with the observance database. |
| Almanac week strip and month list | `screens/Tabs.tsx` | Keep the swipe logic. Move under Moon as a calendar view. |
| Journal (saved days, entries) | `screens/Tabs.tsx` | Rebuild as Rituals journal with real persistence. |
| `SEED_ENTRIES`, `recipient` default | `data/content.ts`, `SafaState.tsx` | **Delete.** |
| Fake status bar, phone frame | `SafaApp.tsx` | Keep for desktop review only. |

---

## 3. Revised screen map

Primary navigation (five destinations, per the brief):

| Destination | Contents | Detail routes |
| --- | --- | --- |
| **Today** | Moon (phase, illumination, one line) → Nature Now (local season guidance) → Today's Ritual → Tonight on Safa (evening audio suggestion) | Moon, Nature, Ritual, Sleep item |
| **Moon** | Current phase, lunar cycle, moon calendar, upcoming events, astronomical facts, clearly labelled traditional interpretations | Day view, traditional-belief page, calculation note |
| **Nature** | Local seasonal guidance, planting and pruning windows, wildlife observations, nature journal | Plant window detail, observation entry |
| **Rituals** | Mindfulness, reflection, gratitude, intention setting, moon rituals, optional short journal entries | Ritual session, journal history |
| **Sleep** | Bedtime stories, nature soundscapes, calming music, evening rituals, player, sleep timer | Category list, player |

Settings (from the profile icon or the top bar): name, location or climate region, interests, reminders, hemisphere override, data (export, clear), about and sources.

Onboarding (minimal): welcome → name (optional, not required) → climate region → interests → reminder preference. Hemisphere is derived from region, not asked separately.

Hidden, preserved: observance database, observance detail, greeting composer. Reachable only from a developer flag until a decision is made.

---

## 4. Data architecture

Separate content types, each versioned as a static file with a schema:

1. **`astro/`** — facts and calculations. Computed by code (section 4.1), never typed in. Stores only the algorithm version and the timezone rule.
2. **`ecology/`** — seasonal and ecological guidance keyed by **climate region**, not hemisphere: regional season windows, plant suitability, planting and pruning windows, wildlife notes. Each entry carries its source and confidence.
3. **`traditions/`** — traditional lunar and cultural beliefs. Each entry labelled with its tradition, its origin, and a "traditional, not scientific" flag.
4. **`rituals/`** — mindfulness and reflective practices, gratitude and intention prompts, moon rituals. Labelled as reflective suggestions.
5. **`audio/`** — metadata only: title, category, duration, licence, file reference, and a placeholder flag until licensed audio is supplied.
6. **`user/`** (local storage only) — profile, region, interests, reminder preferences, journal entries, practice completion, saved days, calendar choices.

The existing CSV is kept as the **legacy observance database** and read only by the preserved features. New screens do not read it.

### 4.1 Lunar calculations

Use a validated astronomy library rather than hand-entered dates. Candidates to verify before choosing: a maintained JavaScript astronomy package (for example `astronomia`), with the Meeus algorithms as a fallback. Validate against published reference times (USNO or a similar source) in tests. Store all event times in UTC and convert to the user's time zone at display time. Default display zone: **Asia/Dubai**, as the profile is based there, with a setting to change it.

### 4.2 Regional seasonal logic

Users choose a climate region (country or a short list of climate zones) during onboarding. The app derives:
- Seasonal season names and windows from `ecology/` for that region.
- Planting and pruning windows that depend on the region **and** plant type, never hemisphere alone.
- Solar terms only where they are relevant to the region. The Chinese solar term currently shown in Nature Now applies to East Asia; it is an option, not a default, consistent with the earlier decision to make Chinese, Japanese, Hindu and Hebrew calendars toggles.

### 4.3 Recommendation engine

Deterministic and content-driven. Inputs: date, moon phase (from 4.1), region (from 4.2), interests, recent completions. Output: one moon item, one nature item, one ritual and one evening audio suggestion, chosen by fixed rules with a stable tie-break so the same day always gives the same result. No paid API calls.

### 4.4 Persistence

- Profile, settings, practice completion, saved days and journal entries: AsyncStorage, versioned keys (`safa.v2.*`) with a migration from `safa.profile.v1`.
- Journal grows over time. If it becomes large or needs search, move to `expo-sqlite`. Decision deferred until Phase 5.
- No accounts, no cloud sync, no analytics, no external backend (per Phase 5 of the brief).

---

## 5. Implementation plan (phased)

Each phase ends with: what changed, files changed, what works, what remains, how to test, and whether the project builds. Nothing starts until you approve this plan.

| Phase | Scope | Exit criteria |
| --- | --- | --- |
| **0. Backup** (done) | Backup branches pushed to GitHub. | Branches visible on the remote. |
| **1. Navigation shell** | Expo Router: five primary tabs plus Settings. Move Almanac, Journal and observance code under `legacy/` (kept, not shown). Remove seed entries and the default recipient. | Five tabs navigate on web and in Expo Go. Build and lint pass. |
| **2. Persistence and onboarding** | Versioned storage, migration from v1, minimal onboarding (name, region, interests, reminder), Settings screen. | Settings survive restart. Onboarding runs once. |
| **3. Moon** | Computed lunar calculations (4.1) with tests against reference times. Moon screen with calendar, events and labelled traditions. Remove the moon rows from the CSV's role. | Tests pass for the reference dates. Time-zone test covers Dubai and UTC. |
| **4. Nature** | Region data (4.2), planting and pruning windows, wildlife notes, nature journal. | Same date gives different guidance for two regions. |
| **5. Rituals and journal** | Mindfulness, reflection, gratitude, intention, moon rituals, persisted journal entries, history view. | Entry written, closed app, reopened, entry still there. |
| **6. Today composition** | Four-module Today (Moon, Nature Now, Ritual, Tonight). Deterministic selection (4.3). | Same inputs give same output; each module links to its detail. |
| **7. Sleep** | Audio library metadata, player (interruption handling, progress), sleep timer. Placeholder files until licensed audio is supplied. | Timer stops playback; interruption pauses and resumes. |
| **8. Notifications** | Local reminders for the morning and the evening audio suggestion. | Reminder fires at the chosen time on device. |
| **9. Quality** | Accessibility pass, performance, offline check, dependency vulnerabilities, remove remaining simulated actions. | Checklist in section 6 complete. |

Estimated difficulty: Phases 1–2 low; 3 high (correctness of astronomy); 4 high (needs regional ecology content, not just code); 5 medium; 6 medium; 7 medium-high (audio on web versus native); 8 medium; 9 medium.

---

## 6. Risks and open questions

**Risks**
- **Astronomical accuracy.** A wrong moon date is the most visible failure. Mitigation: computed values, tests against reference times, and a stated time zone.
- **Regional ecology content.** Planting and pruning windows need expert-reviewed regional content. Code cannot supply it. Until it exists, the app must say that guidance is general, not show false precision.
- **Audio licensing.** No licensed audio exists yet. Music from AI systems must not be assumed licensed (per the brief). Placeholders only until files are supplied.
- **Expo Go limits.** Some modules (notifications, audio background behaviour) may need a development build rather than Expo Go. Check each module's Expo docs before relying on it.
- **Browser versus native differences.** Audio, notifications and offline storage behave differently on web. Document each limitation when testing.
- **Scope.** Five destinations, Sleep, Settings and tests together are large. The phases above are ordered so each one is usable on its own.
- **Dependency vulnerabilities.** 27 reported. Unaddressed; plan a dedicated pass in Phase 9.
- **Our own earlier work.** The profile name step and the flat-colour visuals were added before this brief. The name step will become optional. The flat-colour direction may need to match the brief's palette and typography, which it already uses.

**Decisions I need from you**
1. Approve the phase order, or change it.
2. Time zone for moon times: Asia/Dubai as default, or UTC, or the device zone?
3. Location: a climate-region picker (no GPS), as the brief suggests. Which regions should be offered first?
4. Traditional lunar interpretations: which sources should they cite, and who reviews them?
5. Audio: do you have licensed files now, or should Phase 7 use placeholders?
6. Keep the observance and greeting features as hidden code only, or expose them under Settings?
7. Expo Go for testing for now, or move to a development build early for notifications and audio?

---

## 7. Test checklist (for Phase 9)

- Navigation: all five tabs and Settings reachable; back behaviour correct.
- Onboarding: runs once; skipped on the next launch; name optional.
- Moon: phases match reference times within the stated tolerance, across Dubai and UTC and a date near midnight.
- Regional logic: two regions on the same date give different nature guidance; hemisphere alone never decides planting.
- Daily selection: same inputs give same Today.
- Journal: entries persist across restart; history lists them in order.
- Audio: play, pause, progress, interruption, sleep timer.
- Offline: app opens and shows saved content with no network.
- Accessibility: labels on all controls, sufficient contrast, reduced motion respected.
- Performance: cold start and tab switch on a mid-range Android device.
- Build: typecheck, lint and export pass; `npm audit` reviewed.
