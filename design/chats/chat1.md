# Mobile app design request

_Started 2026-10-16 08:58 UTC_

---

## User

Design a mobile app for

## Assistant



## User

Answered — Asked for follow-up questions; what: Safa - the daily almanac; variations: One solid direction; content: Use the design system's sample data

## Assistant



## Assistant

_[tool: ask_user]_

The form came back empty, so I'll build the Safa daily app as a clickable iOS prototype using the design system's sample data.

_[tool: list_files]_

_[tool: read_file]_

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: grep]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: list_files]_

_[tool: read_file]_

_[tool: copy_files]_

_[tool: dc_write]_

_[tool: ask_user]_

I added a few follow-up questions to the form: how many screens to cover, which interactions Today needs, and anything else you want included. I'll keep building once you submit.

## User

Answered — Asked for follow-up questions; scope: Everything incl. observance detail + greeting composer; today_focus: Switch between day types (quiet / full moon / sacred), Check off practices, Write a reflection, Save a day, Learn more sheet

## Assistant



## Assistant

_[tool: ask_user]_

I added a last round to the form. It asks how the greeting composer should flow, what goes on the observance detail page, and how solemn days should handle greetings. I'll build the full prototype once you submit.

## User

Answered — greeting_flow: Card preview first, then customise; observance_detail: Meaning & history, How it's observed, Respectful etiquette, Related practices, Send a greeting (if appropriate), Add to calendar; sacred_greetings: Hide greetings on solemn days

## Assistant

_[tool: copy_files]_

_[tool: dc_write]_

_[tool: ready_for_verification]_

_[tool: snip]_

I've built the Safa prototype as a clickable iOS app in **Safa App.dc.html**. It's now going through an automated check.

- **Onboarding:** welcome, hemisphere choice, then a morning reminder setting.
- **Today:** use the arrows to move between a quiet day, a full moon day and a sacred day. You can tick off practices, save the day, write a reflection into the journal, and open the "Learn more" sheet. The sacred day links to its observance page.
- **Almanac:** a week strip and a "Coming up" list. Tapping a day or an observance opens it.
- **Observance detail:** meaning and history, how it's observed, etiquette, related practices you can tick off, and an "Add to calendar" button. Solemn days show a short note in place of the greeting option.
- **Greeting composer:** opens from Diwali. The card preview comes first, then you pick a card style, a name and a note (with three suggested messages), and share.
- **Journal and You:** saved days, past reflections, hemisphere and notification settings, and a button to replay the welcome screens.

Two things to know about the content:
- The days and the remembrance observance are the design system's sample content. I moved the dates to this week in 2026, but the moon phases don't match the real 2026 calendar.
- I added Diwali (8 November) myself so the greeting composer has a festive observance to work from.

In the Tweaks panel you can choose whether the app opens on onboarding or on Today, and which day it starts on.

## User

Convert this design into a slide deck using the deck-stage starter component, then export it as a PPTX: `Safa App.dc.html`

