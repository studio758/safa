# Safa Design System

**Safa** (pronounced *sah-fah*, one flowing word) — *The modern almanac for mindful living.*

Safa is a daily app that brings together the world's calendars, cycles, observances and natural rhythms into one calm daily experience: moon phases, solstices and seasons, religious and cultural observances, nature and garden timing, and small practical rituals. Its belief: *Time is not just something that passes. It is something we can relate to.* It must never feel like a horoscope machine, a productivity app, a spiritual dashboard or a loud lifestyle label.

**Products represented**
- **Safa mobile app** (concept stage) — onboarding (Welcome → Hemisphere → Notification → Daily Blend) and a fixed daily screen: Today's Blend → What Shapes Today → Nature Now → Practice Today → Reflect → Learn More → Save/Act. Freemium, with à-la-carte guides, a curated marketplace and a single sponsorship line.
- **Pitch / brand decks** — light linen slides with Playfair headlines and Inter body.

## Sources
All provided as uploads (no Figma, no codebase, no production screens):
- `uploads/Safa Brand Dna Ai Manual.pdf` (+ identical `(1)` copy) — the 17-page operating manual: tone, palette hexes, typography direction, content hierarchy, lexicon. **Primary source for rules.**
- `uploads/Safa_Brand_DNA.pptx` — 15 image-only slides (NotebookLM-generated) visualising the manual: palette as torn paper/leaf/clay, watercolour pillar icons, guardrails.
- `uploads/6a. Safa App Concept Deck.pdf` — 11 image slides: philosophy, visual identity, user journey, content architecture, monetisation. **Primary source for the deck/visual style.**
- `uploads/6.Safa Comprehensive Deck.pdf` — 50 image slides: product strategy, daily screen structure, day types with example copy, ritual library, monetisation, risks.
- **Safa Brand Manifesto** — supplied in chat; stored verbatim in `guidelines/manifesto.md`. Use it for long-form brand copy and the manifesto's cadence (short declaratives, "Not to… Not to… But to…", "Reconnect with…, because…").

Rendered pages for reference live in `extract/` (full) and `reference/` (a curated few).

---

## CONTENT FUNDAMENTALS

**Voice:** clear, calm, elegant, thoughtful, emotionally intelligent, lightly poetic, respectful of difference. Sincerity over hype, clarity over abstraction, depth over buzzwords, restraint over excess.

**Person:** Safa speaks as a quiet guide. Brand copy uses "we" for Safa ("We are not here to change what you believe") and "you" sparingly; product copy is mostly impersonal and about the day ("Today invites release and recalibration."). Greeting cards close with "from Safa" — e.g. *For Ahmed, with warmth from Safa*.

**Casing:** Title Case for slide titles and section names ("What Shapes Today", "Practice Today", "The 'Quiet Day' Protocol"); sentence case for body, prompts and buttons. Small uppercase letter-spaced eyebrows ("THE SAFA PROMISE") used once per block.

**Message formula:** disconnection or speed → quiet invitation to notice → reconnective idea → gentle practical or emotional conclusion.

**Tone range by context:** Reflective (quiet days), Reverent (sacred/solemn observances — restrained, no cheerful greetings), Warm (greetings), Nature-led (earthy, practical), Uplifting (launch lines, manifesto endings).

**On brand:** "A calmer relationship with time." · "Notice the day you are living." · "Built to bring us back." · "Meaning, nature, and ritual in one calm daily experience." · "Find Your Center. The rhythms are already there. We just help you listen."
**Off brand:** "Unlock your highest vibration now." · "Manifest abundance fast." · "Level up your morning routine." · "Hack your energy with ancient secrets."

**Lexicon.** Prefer: rhythm, season, observance, reflect, release, intention, grounding, notice, renew, connect, nature, living world, reverence, stillness, awareness. Sparingly: sacred, manifest, energy, ritual, soul, spiritual. Never: magic, divine, frequency, alignment, vibration, abundance, hack, level up.

**Nature copy** is practical and region-aware (planting timing, pollinators, migration), never trivia or fake science. Rituals are practical, not theatrical ("Clear one drawer", "Spend ten quiet minutes outside").

**Emoji:** never. **Exclamation marks:** avoid. Numbers only when meaningful (prices, durations).

---

## VISUAL FOUNDATIONS

**Mood:** earthy, editorial, minimal, spacious, warm, tactile, quietly luxurious; rooted in nature and calm domesticity. *Calm first, beautiful second, useful third.*

**Colour.** Default canvas is linen `#F7F5F0` (decks render ≈`#F9F8F4`). Sage `#9CAF88` = primary / trust / nav / core actions (darkened to sage-700 for filled buttons for contrast). Terracotta `#C17F59` = warmth, ritual, greetings, section subheads in decks. Mauve `#B384B1` = reflective/moon accents only, never dominant. Text is soft charcoal `#2B2A27` (headings) and `#5C5852` (body) — never pure black. No neon, no gradients beyond near-invisible warm radial washes in slide corners.

**Type.** Playfair Display (500–600) for headlines and brand lines; Inter (300–600) for body/UI; Noto Serif italic for the Today's Blend paragraph, quotes and reflection prompts (the manual names Noto Serif). Deck sizes at 1280×720: title 44px, subhead 26px terracotta, body 18px. Headline titles sit above a 1px stone rule.

**Spacing & layout.** Generous whitespace; 60px slide margins; 24px mobile gutters; 24px card padding. One idea per block. Centered compositions for quotes, titles and icon cards; left-aligned for reading.

**Backgrounds & imagery.** Mostly flat linen. Photography is warm, natural-light, tactile: clay/terracotta pottery, linen interiors, stone, single leaves with window-shadow, sage, olive branches casting shadows on plaster, soil and garden tools, moonrise. Slightly desaturated, warm, no heavy grain. Images get 14px radius when inset, or go full-bleed on one half of a slide. Brand DNA deck uses watercolour washes + single ink-line drawings (moon, sparkle, leaf, open hand) and torn-paper material swatches.

**Corners.** Cards 10px, image tiles 14px, sheets 24px top, buttons/tags fully pill. Never sharp, never blobby.

**Cards.** White `#FDFDFB` or oat `#F2EFE8` with a 1px `#E8E4DA` hairline; shadow essentially none (≤`0 2px 8px rgba(43,42,39,.05)`). No coloured left-border accents. Tinted cards (sage/mauve 50) only for Nature Now and Reflect.

**Borders & rules.** Hairlines everywhere instead of shadows; table headers get a terracotta underline.

**Transparency & blur.** Only the tab bar (frosted linen, 14px blur) and the sheet scrim (charcoal 32%).

**Motion.** Slow, calm fades and small rises (6–12px) with `cubic-bezier(.22,.61,.36,1)`, 320–600ms; sheets settle with `cubic-bezier(.16,1,.3,1)`. No bounces, no confetti, no gamified celebration.

**Hover / press.** Hover = one step darker fill (primary/warm) or oat fill (secondary/ghost). Press = scale 0.98. Focus = 3px soft sage ring.

**Iconography** — see below. Restrained: one small icon per block, sage or terracotta.

---

## ICONOGRAPHY

- The decks use **Font Awesome solid** glyphs (book, handshake, shopping bag, anchor, book-open, leaf, half-circle) tinted sage `#9CAF88` or terracotta. This system links **Font Awesome 6 Free via CDN** (`tokens/icons.css`) and wraps it in `<Icon>`. Inactive nav glyphs use FA *regular* where available.
- The Brand DNA deck has hand-made **watercolour pillar illustrations** (moon, sparkle, leaf, open hand) — copied as small PNGs in `assets/illustrations/` (low-res, ~80px; request originals). The pptx also shows thin line icons (pen nib, eye, phone, network, waveform) that were not extracted.
- No icon font or SVG sprite was supplied. No emoji. Unicode is used only for typographic quote marks and arrows (→).

---

## Logo
No prior logo existed. The logo is the deck-cover treatment made permanent: **"Safa" in Playfair Display SemiBold, outlined to vector**.
- `assets/logo.svg` (charcoal), `assets/logo-light.svg` (linen, for dark grounds and dark photography; use charcoal on light photography), `assets/logo-lockup.svg` (with tagline in Inter Light), `assets/monogram.svg` ("S"), `assets/app-icon.svg` (linen S on sage, 228/1024 corner radius).
- Clear space ≥ ½ wordmark height; minimum 16px tall. Charcoal or linen only — never coloured.
- The `Wordmark` component embeds the same outlined path.

## Fonts
**Playfair Display**, **Inter** and **Noto Serif**, loaded from Google Fonts (confirmed as the brand faces).

---

## Index

- `styles.css` — entry; `@import`s only.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css` (spacing, radii, shadows, motion), `fonts.css`, `icons.css`, `base.css`.
- `guidelines/` — 22 foundation specimen cards (Colors, Type, Spacing, Brand).
- `assets/logo*.svg`, `assets/monogram.svg`, `assets/app-icon.svg` — logo files.
- `guidelines/manifesto.md` — the brand manifesto, verbatim.
- `assets/imagery/` — 15 photographs cropped from the decks (third-party stock; see source slides for credits).
- `assets/illustrations/` — 4 watercolour pillar icons. `assets/textures/palette-scraps.jpg`.
- `components/` — React primitives (below), one card per folder.
- `ui_kits/app/` — interactive Safa mobile app recreation (deck-based sample data).
- `app/Safa App.html` — full mobile app design driven by `uploads/safa_master_calendar_greeting_audit.csv` (672 entries, Jun 2026 – Jun 2027): Today, Calendar, observance detail, greeting composer, Saved, You, onboarding.
- `slides/` — 9 slide layouts in the App Concept deck style.
- `reference/`, `extract/` — rendered source pages and extracted text.
- `SKILL.md`, `thumbnail.html`.

### Components
- **core/** — Button, IconButton, Icon, Wordmark
- **forms/** — TextField, JournalField, Checkbox, Toggle, SegmentedControl
- **display/** — Card, Tag, Eyebrow, PullQuote
- **almanac/** — BlendHero, ShapesList, PracticeItem, ReflectPrompt, JourneySteps
- **navigation/** — TabBar, TopBar
- **feedback/** — Sheet, Toast

No source defined a component inventory (brand-guidelines-only run), so this is an authored set sized to the app concept. Brand-specific pieces (BlendHero, ShapesList, PracticeItem, ReflectPrompt, JourneySteps) map one-to-one to the content hierarchy and onboarding steps in the decks.

### Slides
TitleSlide, QuoteSlide, SplitImageSlide, ThreeCardSlide, IconCardSlide, TimelineSlide, TableSlide, ComparisonSlide, ClosingSlide.
