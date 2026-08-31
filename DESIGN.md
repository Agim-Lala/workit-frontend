---
name: Workit
description: "Flexible work organized as calm, sun-washed rooms."
colors:
  oat-canvas: "#f5e9d8"
  parchment-surface: "#fffaf2"
  plum-ink: "#39242c"
  muted-plum: "#6f554f"
  terracotta-action: "#a9412b"
  cream-on-color: "#fffaf3"
  clay-secondary: "#ead7c4"
  muted-oat: "#eadbca"
  warm-rule: "#dcc4b1"
  warm-input: "#caaa96"
  focus-terracotta: "#a53f2a"
  peach-field: "#f2c9b5"
  olive-courtyard: "#66705a"
  saffron-sun: "#e6a43b"
  danger-red: "#a72f35"
  night-canvas: "#2c2023"
  night-surface: "#3a2a2e"
  night-ink: "#fff3e5"
  night-muted-ink: "#d9c5bb"
  night-terracotta: "#e77d5e"
  night-action-ink: "#27191c"
  night-clay: "#503a3d"
  night-muted: "#493639"
  night-rule: "#715a55"
  night-input: "#8a7067"
  night-focus: "#ef987c"
  night-peach: "#68463f"
  night-olive: "#9ea789"
  night-action-olive-ink: "#21181b"
  night-saffron: "#efbd5d"
  night-danger: "#ff9297"
  night-danger-ink: "#2c1115"
typography:
  display:
    fontFamily: "Barlow Condensed, Barlow, ui-sans-serif, sans-serif"
    fontSize: "clamp(4rem, 7vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.88
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Barlow Condensed, Barlow, ui-sans-serif, sans-serif"
    fontSize: "clamp(3rem, 6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Barlow Condensed, Barlow, ui-sans-serif, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Barlow, ui-sans-serif, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  control:
    fontFamily: "Barlow, ui-sans-serif, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "normal"
  label:
    fontFamily: "Barlow, ui-sans-serif, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0.08em"
rounded:
  compact: "8px"
  control: "12px"
  courtyard: "16px"
  billboard: "24px"
  circular: "9999px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "20px"
  6: "24px"
  8: "32px"
  10: "40px"
  12: "48px"
components:
  button-primary:
    backgroundColor: "{colors.terracotta-action}"
    textColor: "{colors.cream-on-color}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "0 1.25rem"
    height: "2.75rem"
  button-secondary:
    backgroundColor: "{colors.parchment-surface}"
    textColor: "{colors.plum-ink}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "0 1.25rem"
    height: "2.75rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.plum-ink}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "0 1.25rem"
    height: "2.75rem"
  text-input:
    backgroundColor: "{colors.parchment-surface}"
    textColor: "{colors.plum-ink}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "0 0.875rem"
    height: "3rem"
  status-badge:
    backgroundColor: "{colors.clay-secondary}"
    textColor: "{colors.muted-plum}"
    typography: "{typography.label}"
    rounded: "{rounded.compact}"
    padding: "0.25rem 0.625rem"
  navigation-active:
    backgroundColor: "{colors.peach-field}"
    textColor: "{colors.terracotta-action}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "0 1rem"
    height: "2.75rem"
  courtyard-surface:
    backgroundColor: "{colors.parchment-surface}"
    textColor: "{colors.plum-ink}"
    rounded: "{rounded.courtyard}"
    padding: "1.75rem"
  calendar-opening:
    backgroundColor: "{colors.peach-field}"
    textColor: "{colors.plum-ink}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "0.5rem 0.625rem"
---

# Design System: Workit

## Overview

**Creative North Star: "Warm Courtyard"**

Workit turns flexible work into a sequence of calm, focused rooms. Sun-washed fields, broad plum type, quiet rules, and practical fact rows make work feel welcoming without hiding its terms. The system refuses an everything-at-once operations wall: visitors meet the promise, workers compare opportunities, and businesses move separately through overview, openings, and creation.

The grounded direction is Warm Courtyard, direction 6, seed `8d2697c7`; the approved first expression is `.impeccable/mocks/warm-courtyard-overview-c.png`. Terracotta carries decisive action, olive steadies supporting guidance, saffron marks small moments, and peach opens planning space. The official Workit mark remains the identity anchor; the interface and its real information provide the visual proof, without decorative photography or invented claims.

**Key Characteristics:**

- Broad Barlow Condensed promises paired with open, practical Barlow copy.
- Oat canvas and parchment rooms shaped by peach, olive, terracotta, and saffron fields.
- Spacious horizontal fact rows instead of a generic grid of equal cards.
- Focused routes and inner views that keep one operational task in front of the user.
- Real paper grain on a few focal working surfaces, with flat warm rules everywhere else.
- Light and dark themes that preserve the same semantic color relationships.

## Colors

The palette is a sun-warmed courtyard: oat and parchment establish calm; plum supplies durable ink; terracotta acts; olive guides; peach plans; saffron punctuates. The night palette shifts the same roles into aubergine stock and lifted cream copy rather than becoming a different visual identity.

### Primary

- **Terracotta Action** (`terracotta-action`): Primary buttons, key links, focus-adjacent emphasis, active counts, and current-day markers. Its paired foreground is `cream-on-color`; in dark mode the pair becomes `night-terracotta` and `night-action-ink`.

### Secondary

- **Olive Courtyard** (`olive-courtyard`): Guidance panels, business summaries, calendar context, and the left field on authentication. Use its paired cream foreground; the dark counterpart is `night-olive` with `night-action-olive-ink`.
- **Peach Planning Field** (`peach-field`): Page openings, active route fields, preview selections, calendar opportunities, and planning regions. It supports plum copy rather than competing with the primary action.

### Tertiary

- **Saffron Sun** (`saffron-sun`): Small highlight bars, compact calls to attention, selected text, and an occasional full-width moment. Always pair it with plum; `night-saffron` pairs with the dark canvas ink.

### Neutral

- **Oat Canvas** (`oat-canvas`): The continuous page ground.
- **Parchment Surface** (`parchment-surface`): Forms, opportunity rows, calendars, nav rails, and other working rooms.
- **Plum Ink** (`plum-ink`): Primary light-theme type and strong iconography; `muted-plum` carries supporting copy.
- **Clay Secondary and Muted Oat** (`clay-secondary`, `muted-oat`): Passive bands, filter groups, hover states, and subdued calendar cells.
- **Warm Rule and Input Clay** (`warm-rule`, `warm-input`): Structural dividers and field boundaries. Rules organize content quietly; they do not box every element.
- **Night Canvas, Surface, Ink, and Clay** (`night-canvas`, `night-surface`, `night-ink`, `night-clay`): Dark-theme equivalents that retain warm undertones.
- **Danger Red** (`danger-red`): Validation and destructive feedback only; use `night-danger` with `night-danger-ink` in dark mode.

### Named Rules

**The Paired-Foreground Rule.** Saturated fields keep their shipped semantic foreground: cream on terracotta and olive, plum on saffron and peach, and the corresponding `night-*` pair in dark mode. New combinations must pass WCAG AA before use.

**The One Action Color Rule.** Terracotta owns action. Peach, olive, and saffron create rooms, guidance, and moments; they do not become competing primary buttons.

**The Warm-at-Night Rule.** Dark mode uses aubergine, clay, warm cream, and softened accents; never replace the night palette with cold gray or blue stock.

## Typography

**Display Font:** Barlow Condensed with Barlow and system sans fallbacks  
**Body Font:** Barlow with system sans fallbacks  
**Label/Mono Font:** Barlow with tabular numerals for dates, pay, times, counts, and indices

**Character:** Barlow Condensed is broad in attitude but efficient in width, making plain operational promises feel generous. Barlow stays human, open, and readable across forms, fact rows, navigation, and calendar detail.

### Hierarchy

- **Display** (700, `clamp(4rem, 7vw, 6rem)`, 0.88): One broad promise in a first viewport; keep the line length around 8–13 characters when composition allows.
- **Headline** (700, `clamp(3rem, 6vw, 4.5rem)`, 0.92): Route openings, business greetings, and focused date-page titles.
- **Title** (700, 2.25rem, 1): Opportunity names, section headings, summary statements, and calendar month titles.
- **Body** (400–500, 1rem, 1.75): Explanations and instructions, usually held to 44–68 characters per line.
- **Control** (600, 0.875rem, 1.25): Buttons, navigation, fields, filters, and primary job facts.
- **Label** (600–700, 0.75rem, 0.08em): Uppercase metadata and fact labels; do not uppercase sentences or actions.

Barlow is bundled locally at weights 400–700. Barlow Condensed is bundled at 600–800; use 800 only for deliberately emphatic display moments, never for body copy.

### Named Rules

**The Broad-Promise Rule.** Barlow Condensed states the decision; Barlow explains what happens next.

**The Practical-Numbers Rule.** Dates, pay, times, counts, and ordered indices use tabular numerals so adjacent facts compare cleanly.

## Layout

The application shell is bounded at 1440px with 16px mobile gutters and 32px large-screen gutters. A 4px base rhythm supports 12–24px control and row spacing, 24–40px working-surface padding, and 40–48px route-opening padding. Broad color fields establish page structure; internal rules and whitespace establish data structure.

Public pages persuade through paired rooms: a broad promise and action on one side, then a practical preview or explanation on the other. Authenticated pages operate through route openings followed by a focused work area. Business work is intentionally split across `/business` overview, `/business/openings` review, and `/business/openings/new` creation. Worker discovery uses `/jobs` list and `/jobs/calendar?month=yyyy-MM` month as peer inner views; the calendar is reserved for short-term work, while permanent and project positions remain available in list view. Crowded dates continue to `/jobs/calendar/:date?month=yyyy-MM`, where every eligible short-term opening for that date is gathered into the familiar opportunity rows. Month state belongs in the URL so refreshes, copied links, browser navigation, and date-page return paths preserve the worker's place.

Worker discovery is location-aware. Registration collects a required city or recognizable area, and `/worker-profile` presents that saved value as a focused, editable preference. The authenticated backend—not a client-supplied worker identifier—matches the saved text against opening locations for the list, calendar, and focused date route. Saving a new value refreshes every job view. Legacy profiles with no saved location temporarily retain unfiltered discovery until the worker adds one.

Responsive behavior follows the content instead of shrinking it. Grids stack into one calm reading order at small widths; the authenticated route rail becomes a second, horizontally scrollable row. Business summaries remain compact while forms become single-column. The monthly calendar retains a full seven-column, 980px minimum working width and scrolls horizontally on mobile, with a visible swipe cue and keyboard-focusable scroller. It must never squeeze seven days into unreadable cards.

Calendar cells show at most three short-term opening previews and never place permanent or project positions on a date. When a date contains more than three, the count is capped visually at `3+ open`, the date header becomes a descriptive link to the focused date page, and a `View all N openings` action follows the previews. The calendar exposes one labelled region for the month and one labelled group per date; it does not claim ARIA grid behavior that its links and reading model do not implement.

A focused date page preserves the list/calendar switch, the originating `month` query in every back path, date-aware loading/error/empty states, and one row per matching opportunity. On mobile, the opening count becomes a compact inline olive badge inside the peach route opening while the larger olive count panel is reserved for desktop. The optional day filters use a native details disclosure and start collapsed on mobile; desktop keeps the full filter courtyard visible.

**The Focused-Room Rule.** A route or inner view owns one primary job. Do not recombine business overview, all openings, and creation—or worker list, month, and crowded-day detail—into one long operations wall.

**The Full-Calendar Rule.** On narrow screens, preserve the large month and let the viewport move across it; never compress away the facts.

**The Worker-Location Rule.** Make the saved city or area visible and editable, explain its effect on discovery, and refresh every worker job view after it changes. The server derives the worker from authentication and owns the location filter.

## Elevation & Depth

Warm Courtyard is flat by default. Parchment against oat, broad color fields, one-pixel warm rules, and occasional overlap provide most hierarchy. The single ambient lift is `0 18px 46px -28px color-mix(in srgb, var(--color-foreground) 38%, transparent)` and belongs only on a focal preview, planner, or authentication surface.

Real material appears through `src/assets/warm-courtyard-paper.jpg`, repeated at 512px with multiply blending and 0.12 opacity inside an isolated, pointer-transparent overlay. It is shipped on the home opportunity preview, the weekly business planner, and the new-opening form. Texture must remain subtle enough that fields and copy keep their contrast.

### Shadow Vocabulary

- **Courtyard lift:** One soft downward ambient shadow for a focal paper room.
- **Schedule-thumb lift:** A compact local shadow on the draggable schedule handle only; it describes affordance, not card elevation.

### Named Rules

**The One-Lift Rule.** Most rooms are flat. Use the ambient lift only when a single focal working surface needs to sit above its field.

**The Real-Paper Rule.** Use the shipped paper asset at low opacity on selected working rooms; do not synthesize noisy gradients or texture every surface.

## Shapes

The defining major radius is 16px: courtyard surfaces, data boards, forms, and calendars use this gentle corner to feel architectural rather than card-like. Controls use 12px for an approachable but disciplined touch target. Badges and compact calendar details use 8px. A 24px billboard radius is reserved for the largest hero and final-call fields, while true circles belong only to dots, schedule handles, and other intrinsically circular marks.

Quiet one-pixel rules separate facts, lanes, calendar cells, and route regions. Rounded containers do not float independently; most are part of a larger field or repeated row system.

**The Radius-by-Scale Rule.** Use 16px for major rooms and 12px for controls. The 24px exception is for broad billboard fields, not routine cards; pill shapes are not a default container language.

## Components

### Buttons

Buttons are warm, direct, and comfortably sized. Every button has a 44px minimum target, 12px corners, 14px semibold Barlow, and an active one-pixel downward response.

- **Primary:** Terracotta with its paired cream foreground, 20px horizontal padding, and a slightly quieter terracotta hover.
- **Secondary:** Parchment with a warm rule; hover moves the boundary toward terracotta and washes the surface with clay.
- **Ghost:** Transparent at rest, with a clay hover field only when the surrounding room already supplies structure.
- **Focus / Disabled:** A 2px visible focus outline with a 3px offset; disabled controls remain recognizable at 45% opacity and do not accept pointer events.

### Chips

Badges are compact metadata, not navigation pills: 8px corners, warm-rule border, clay fill, muted-plum 12px text, and 10px by 4px padding. Open or selected states use a restrained terracotta tint and terracotta text.

### Cards / Containers

The primary container is a 16px parchment courtyard, sometimes filled with peach, olive, saffron, or terracotta to create a room. Opportunity content appears as wide, repeatable rows with title and description first, a ruled facts band second, and pay/action state last. Hover may introduce a small border change and a 2px rise; it must not turn each row into a floating tile.

### Inputs / Fields

Inputs, selects, and textareas are explicit labeled fields with parchment fill, warm-input border, 12px corners, and a 48px minimum height. Focus moves the field border to terracotta and exposes the shared offset ring. Invalid fields use danger red and connect messages through `aria-describedby`; submission errors use live alert semantics. On the focused date page, optional filters collapse by default inside a native `details` disclosure on mobile and remain expanded at larger breakpoints. Disabled, pending, success, error, and empty states must all remain readable in both themes.

### Navigation

The app uses a sticky, warm parchment route rail with a 76px minimum desktop height. Active routes sit in a peach, 12px field with terracotta emphasis; inactive routes use muted plum and gain a soft clay hover. Business navigation exposes Overview, Job openings, and New opening. Worker navigation exposes Jobs, Applications, and Profile, while job discovery adds a separate list/calendar inner switch. On small authenticated layouts, the main route rail spans a second full-width row and scrolls horizontally without hiding any destination.

### Monthly Job Calendar

The calendar is a full-size ruled work surface with seven fixed columns, 176px minimum-height day cells, and a 980px minimum inner width. It includes short-term openings only; permanent and project positions stay in list view and are omitted from both month cells and focused date routes. Peach 12px opening blocks preserve title, shift, location, and pay. Today uses a terracotta date marker. The month is a labelled region and each date is a labelled group. Dates with multiple jobs expose a 44px descriptive link; crowded dates preview only the first three, show `3+ open`, and lead to the dedicated date route for the complete list. Previous, next, and Today actions update `?month=yyyy-MM`; date links carry that month forward so Back to month returns to the same context.

### Focused Date View

The dedicated date route reuses the list's spacious opportunity rows and presents the selected day as a peach route opening. Desktop balances that title with an olive count panel. Mobile replaces the panel with an inline olive badge and keeps optional filters collapsed until requested, protecting the first viewport from another wall of controls. Every calendar return, view-switch, and empty-state action preserves the originating month query.

### Worker Location Preference

Worker sign-up includes a required `City or area` field near the person's name so the matching consequence is established before account creation. The Profile route uses a split olive-and-parchment composition: a plain-language promise on the left and one editable location field on the right. Loading, retry, validation, pending, failure, and saved states remain explicit; stale profile data stays usable during a background refresh failure. A successful save invalidates the shared jobs query so list, month, and focused-date results all update without requiring manual navigation.

### Paper Opportunity Preview

The public preview is the signature focal room: subtle real paper grain, one ambient lift, a short saffron bar, tabular index, a ruled fact list, and terracotta detail action. On desktop, three vertical edge selectors reveal alternate illustrative opportunities; on small screens they become three equal 44px controls below the preview. Its 620ms clip-and-opacity reveal uses `cubic-bezier(0.16, 1, 0.3, 1)` and disappears entirely when reduced motion is requested.

### Named Rules

**The Facts-Before-Commitment Rule.** Worker-facing job descriptions keep role, place, schedule, pay, and dates visible before the next step. Hiring headcount remains a business planning fact and does not appear in worker-facing job cards or briefs.

**The Complete-State Rule.** Hover, keyboard focus, active, disabled, pending, invalid, error, empty, selected, and responsive states are part of the component—not finishing polish.

## Do's and Don'ts

### Do:

- **Do** preserve the oat/parchment/terracotta/plum/olive/saffron/peach hierarchy in light and dark themes.
- **Do** keep major rooms at 16px, controls at 12px, compact metadata at 8px, and all interactive targets at least 44px high.
- **Do** pair saturated fills with their semantic foregrounds, keep focus visible, and verify new color combinations against WCAG AA.
- **Do** show practical job facts in repeatable rows, calendar cells, and focused date views before asking for commitment.
- **Do** preserve the mobile calendar's 980px working width and horizontal exploration, including the visible swipe cue.
- **Do** honor reduced motion, explicit form labels, semantic definitions, labelled calendar regions and day groups, descriptive link labels, live errors, and tabular operational numbers.
- **Do** keep month context URL-backed with `?month=yyyy-MM` and preserve it through focused-date links and all calendar return actions.
- **Do** show the worker's saved city or area in Profile, explain the match, and refresh all job discovery views after it changes.
- **Do** preserve the official Workit mark and the real paper texture asset where the shipped system uses them.

### Don't:

- **Don't** collapse the product back into an everything-at-once business dashboard or merge list, month, and crowded-day detail into one surface.
- **Don't** replace broad fields and spacious rows with a generic grid of individually shadowed cards.
- **Don't** use olive, peach, or saffron as competing primary action colors.
- **Don't** squeeze the seven-day calendar to viewport width, hide crowded openings without a `View all` path, make overflow reachable only by pointer, or discard the worker's selected month on a date-page round trip.
- **Don't** accept a client-supplied worker identity or location override when filtering jobs; use the authenticated worker profile on the server.
- **Don't** apply paper grain, the ambient lift, 24px corners, or pill geometry to every container.
- **Don't** fabricate photography, employer proof, ratings, metrics, or claims to make the interface feel credible.
