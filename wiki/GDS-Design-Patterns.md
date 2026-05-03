# GDS Design Patterns

This page documents how GOV.UK GDS patterns and components are applied throughout the application. All implementation decisions follow the official GOV.UK Design System and Service Manual guidance listed below.

**Primary references:**
- [GOV.UK Design System — Patterns](https://design-system.service.gov.uk/patterns/)
- [GOV.UK Design System — Components](https://design-system.service.gov.uk/components/)
- [GOV.UK Design System — Styles](https://design-system.service.gov.uk/styles/)
- [Service Manual — Form Structure](https://www.gov.uk/service-manual/design/form-structure)
- [Service Manual — Designing Good Questions](https://www.gov.uk/service-manual/design/designing-good-questions)
- [Service Manual — Making your service look like GOV.UK](https://www.gov.uk/service-manual/design/making-your-service-look-like-govuk)

---

## One Thing Per Page

Implements the GOV.UK ["one thing per page"](https://www.gov.uk/service-manual/design/form-structure#start-with-one-thing-per-page) principle from the Service Manual:

- Each form step is a **distinct page with its own URL** (`#/apply/personal`, `/contact`, etc.)
- Browser back button works naturally between steps
- Each page has a single `<h1>` that matches the page `<title>` (e.g. "Personal details – Apply for Universal Credit – GOV.UK")
- Validation only covers the fields on that page, not the whole form

---

## Start Page — `LandingPage.tsx`

Implements the [GOV.UK start using a service pattern](https://design-system.service.gov.uk/patterns/start-using-a-service/).

| Pattern element | Implementation |
|-----------------|---------------|
| Breadcrumb | `<nav aria-label="Breadcrumb">` with `aria-current="page"` |
| `<h1>` | 36px bold, `#0b0c0c`, line-height 1.1 |
| Before you start | Bullet list of required documents |
| Service selection | Radio cards inside `<fieldset>` / `<legend>` |
| Validation | Error with `role="alert"`, `tabIndex={-1}`, red border/bar |
| Start button | Green (`#00703c`), 24px bold, drop-shadow, right-arrow SVG |
| Help section | Telephone number with `tel:` link |

---

## Question Pages Pattern

Implements the [GOV.UK question pages pattern](https://design-system.service.gov.uk/patterns/question-pages/).

Each form step page follows this structure:
1. **Skip link** (first focusable element on page)
2. **GOV.UK Header** with BETA phase banner
3. **Back link** — `← Back` or `← Back to services`
4. **Progress indicator** — `<nav aria-label="Progress">` with `aria-current="step"`
5. **Error summary** — renders at top of `<main>` when validation fails (see below)
6. **`<h1>`** — the page/question title
7. **Form fields** (see components below)
8. **Continue / Submit button**
9. **Previous link** (steps 2–3 only)
10. **GOV.UK Footer**

---

## Error Summary — `ErrorSummary.tsx`

Implements the [GOV.UK error summary component](https://design-system.service.gov.uk/components/error-summary/).

- Appears **above the `<h1>`** when a page has validation errors
- `role="alert"` so screen readers announce it immediately
- Focus is programmatically moved to the summary on render (`useRef` + `focus()`)
- Heading: "There is a problem" (`<h2 id="error-summary-title">`)
- Each error is a link (`<a href="#input-fieldname">`) that jumps to the failing field
- `aria-labelledby="error-summary-title"` on the container
- 4px solid `#d4351c` border

---

## Header — `GovUKHeader.tsx`

Implements the [GOV.UK header component](https://design-system.service.gov.uk/components/header/).

- Black (`#0b0c0c`) background bar
- Crown SVG logotype with "GOV.UK" text in GDS Transport font, 30px bold
- Service name in white, 18px regular
- Visual separator between Crown and service name
- **BETA phase banner** in `#1d70b8` blue beneath the header with feedback link

---

## Footer — `GovUKFooter.tsx`

Implements the [GOV.UK footer component](https://design-system.service.gov.uk/components/footer/).

- Light grey (`#f3f2f1`) background, `#b1b4b6` top border
- Footer navigation: Help, Cookies, Contact, Terms, Welsh language link, GDS
- Open Government Licence v3.0 text
- Crown copyright with Crown SVG

---

## Text Input — `FormInput.tsx`

Implements the [GOV.UK text input component](https://design-system.service.gov.uk/components/text-input/).

| State | Style |
|-------|-------|
| Default | 2px solid `#0b0c0c` border |
| Error | 4px solid `#d4351c` border + 4px red left bar on wrapper |
| Focus | `outline: 3px solid #ffdd00`, `box-shadow: inset 0 0 0 2px` |

Each field includes:
- `<label htmlFor={inputId}>` — explicit label/input association
- **No asterisk** on required fields — GOV.UK style does not use asterisks; all fields are either clearly required or labelled as optional
- Optional hint text (`<div id={hintId}>`) below the label
- Error message: `<p role="alert" id={errorId}>` with **visible** "Error: " prefix (GOV.UK pattern — not hidden)
- `aria-describedby` linking input to hint and/or error IDs
- `aria-invalid="true"` when error present
- `autoComplete` attribute for personal data fields (`given-name`, `email`, `tel`, etc.)

Also supports `as="textarea"` and `as="select"` variants with the same error/hint pattern.

---

## Date Input — `DateInput.tsx`

Implements the [GOV.UK date input component](https://design-system.service.gov.uk/components/date-input/).

> **GOV.UK explicitly requires three separate text fields for dates — never `type="date"`.**
> See: https://design-system.service.gov.uk/components/date-input/

Structure:
- `<fieldset>` + `<legend>` wraps all three inputs
- `aria-describedby` on the fieldset links to hint and error IDs
- Three `<input type="text" inputMode="numeric">` fields: **Day** (max 2 chars), **Month** (max 2 chars), **Year** (max 4 chars)
- Each sub-input has its own visible `<label>` (Day, Month, Year)
- Fixed pixel widths per GOV.UK spacing: Day ~44px, Month ~44px, Year ~70px
- `autoComplete="bday-day"`, `bday-month"`, `"bday-year"` per WCAG 1.3.5
- Error state applies red border to all three inputs simultaneously
- Error message shown with visible "Error: " prefix

---

## Validation — `validation.ts`

Follows [GOV.UK guidance on designing good questions](https://www.gov.uk/service-manual/design/designing-good-questions#help-users-give-you-the-right-information):

> "Set up your validation so it's as tolerant as possible of users entering information in different ways."

| Step | Field | Rule |
|------|-------|------|
| 1 | First name | Required; max 70 characters |
| 1 | Last name | Required; max 70 characters |
| 1 | Date of birth | All three fields required; real date; must be in the past |
| 1 | National Insurance | Required; regex accepts with **or without** spaces (e.g. `QQ123456C` or `QQ 12 34 56 C`) |
| 2 | Email | Required; basic format check (`name@domain.tld`) |
| 2 | Phone | Required; accepts UK formats with/without spaces and `+44` prefix |
| 2 | Address | Required |
| 2 | Town/city | Required |
| 2 | Postcode | Required; UK postcode regex (accepts with/without space) |
| 3 | Employment status | Required (must select from list) |

All error messages tell users **how to fix** the problem, not just what went wrong (GOV.UK guidance).

---

## Progress Indicator — `ProgressIndicator.tsx`

- `<nav aria-label="Progress through application">` wraps an `<ol>` of steps
- `aria-current="step"` on the active step
- Coloured top border: green (completed), blue (current), grey (upcoming)
- "Step X of Y" helper text above the list

---

## Buttons

Implements the [GOV.UK button component](https://design-system.service.gov.uk/components/button/).

| Button | Colour | Shadow | Usage |
|--------|--------|--------|-------|
| Start (landing) | `#00703c` green, 24px | `0 2px 0 #002d18` | Landing page only |
| Continue / Submit | `#00703c` green, 19px | `0 2px 0 #002d18` | All form steps |
| Previous | Text link — `#1d70b8`, underlined | none | Steps 2–3 |
| Return to services | `#1d70b8` blue, 19px | `0 2px 0 #003078` | Confirmation page |

All buttons: `border: none`, `border-radius: 0` (GDS — no rounded corners).

---

## Confirmation Page — `ConfirmationStep.tsx`

Implements the [GOV.UK confirmation page pattern](https://design-system.service.gov.uk/patterns/confirmation-pages/).

- Green (`#00703c`) panel with white text, `role="status"`, `aria-live="polite"`
- Generated application reference number displayed prominently
- "What happens next" section below the panel
- Full application summary in a [GOV.UK summary list](https://design-system.service.gov.uk/components/summary-list/) (`<dl>` / `<dt>` / `<dd>`)

---

## Colour Palette

Follows the [GOV.UK colour styles](https://design-system.service.gov.uk/styles/colour/).

| Token | Hex | Usage |
|-------|-----|-------|
| `--govuk-colour-black` | `#0b0c0c` | Primary text, header |
| `--govuk-colour-blue` | `#1d70b8` | Links, back link, secondary buttons |
| `--govuk-colour-dark-blue` | `#003078` | Link hover, button shadow |
| `--govuk-colour-green` | `#00703c` | Primary buttons, confirmation panel |
| `--govuk-colour-red` | `#d4351c` | Error borders, error messages, error summary |
| `--govuk-colour-yellow` | `#ffdd00` | Focus ring |
| `--govuk-colour-light-grey` | `#f3f2f1` | Footer background |
| `--govuk-colour-mid-grey` | `#b1b4b6` | Borders, inactive steps |
| `--govuk-secondary-text-colour` | `#505a5f` | Hint text |

---

## Typography

Follows the [GOV.UK typeface](https://design-system.service.gov.uk/styles/typeface/) and [type scale](https://design-system.service.gov.uk/styles/type-scale/).

- **Font**: GDS Transport (loaded from Google Fonts), fallback: `arial, sans-serif`
- **Body / labels**: 19px, line-height 1.5
- **`<h1>` per page**: 36px, weight 700, line-height 1.1
- **`<h2>` section headings**: 24px, weight 700
- **Hint / caption text**: 16px, `#505a5f`


Implements the [GOV.UK header component](https://design-system.service.gov.uk/components/header/).

- Black (`#0b0c0c`) background bar
- Crown SVG logotype with "GOV.UK" text in GDS Transport font at 30px bold
- Service name in white at 18px regular weight
- Visual separator between crown and service name
- **BETA phase banner** in `#1d70b8` blue beneath the header (feedback link included)

---

## Footer — `GovUKFooter.tsx`

Implements the [GOV.UK footer component](https://design-system.service.gov.uk/components/footer/).

- Light grey (`#f3f2f1`) background with `#b1b4b6` top border
- Standard footer navigation links: Help, Cookies, Contact, Terms and conditions, Welsh language link, GDS link
- Open Government Licence v3.0 notice
- Crown copyright with Crown SVG icon

---

## Start Page — `LandingPage.tsx`

Implements the [GOV.UK start page pattern](https://design-system.service.gov.uk/patterns/start-using-a-service/).

| Pattern | Implementation |
|---------|---------------|
| Breadcrumb | `<nav aria-label="Breadcrumb">` with `aria-current="page"` on current item |
| H1 | 36px bold, `#0b0c0c`, line-height 1.1 |
| Inset text | 10px left border `#b1b4b6`, 15px padding |
| Warning text | `!` icon, bold 19px text, `role="note"` |
| Before you start | Bullet list of required documents |
| Start button | Green (`#00703c`), 24px bold, drop-shadow `0 2px 0 #002d18`, arrow SVG |
| Help section | Phone number, `tel:` link |

---

## Form Pattern — `FormInput.tsx`

Implements [GOV.UK form components](https://design-system.service.gov.uk/components/text-input/).

| State | Style |
|-------|-------|
| Default | 2px solid `#0b0c0c` border |
| Error | 4px solid `#d4351c` border + red left bar on wrapper |
| Focus | `outline: 3px solid #ffdd00`, `box-shadow: inset 0 0 0 2px` |

Each field includes:
- `<label htmlFor={inputId}>` — explicit label association
- Optional hint text (`<div id={hintId}>`)
- Error message with `role="alert"`, `id={errorId}`
- `aria-describedby` linking input to hint and/or error
- `aria-invalid="true"` when error present
- `autoComplete` attribute for appropriate fields

---

## Progress Indicator — `ProgressIndicator.tsx`

Implements a step progress pattern using:
- `<nav aria-label="Progress through application">`
- `<ol>` list of steps
- `aria-current="step"` on the active step
- Coloured top border: green (completed), blue (current), grey (upcoming)
- "Step X of Y" helper text above

---

## Buttons

| Type | Style |
|------|-------|
| Start (landing) | `#00703c` green, 24px, shadow `0 2px 0 #002d18`, arrow SVG |
| Continue/Submit | `#00703c` green, 19px, shadow `0 2px 0 #002d18` |
| Previous | Text link style, `#1d70b8`, underlined, no background |
| Return to services | `#1d70b8` blue, 19px, shadow `0 2px 0 #003078` |

All buttons have `border: none`, `border-radius: 0` (GDS — no rounded corners).

---

## Confirmation Panel — `ConfirmationStep.tsx`

Implements the [GOV.UK confirmation page pattern](https://design-system.service.gov.uk/patterns/confirmation-pages/).

- Green (`#00703c`) panel with white text
- `role="status"` and `aria-live="polite"` for screen reader announcement
- Application reference number displayed prominently
- "What happens next" section below the panel

---

## Summary List — `ConfirmationStep.tsx`

Implements the [GOV.UK summary list component](https://design-system.service.gov.uk/components/summary-list/).

- `<dl>` with `<dt>` (bold label) and `<dd>` (value)
- `1px solid #b1b4b6` top and bottom borders on each row
- 200px fixed width for `<dt>`, flexible `<dd>`

---

## Colour Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--govuk-colour-black` | `#0b0c0c` | Primary text, header background |
| `--govuk-colour-blue` | `#1d70b8` | Links, back link, secondary buttons |
| `--govuk-colour-dark-blue` | `#003078` | Link hover, button shadow |
| `--govuk-colour-green` | `#00703c` | Primary buttons, confirmation panel |
| `--govuk-colour-red` | `#d4351c` | Error borders, error messages |
| `--govuk-colour-yellow` | `#ffdd00` | Focus ring |
| `--govuk-colour-light-grey` | `#f3f2f1` | Footer background |
| `--govuk-colour-mid-grey` | `#b1b4b6` | Borders, inactive steps |
| `--govuk-secondary-text-colour` | `#505a5f` | Hint text, secondary labels |

---

## Typography

- **Font**: GDS Transport (loaded from Google Fonts), fallback: `arial, sans-serif`
- **Body**: 19px, line-height 1.5
- **H1 per page**: 36px, 700 weight, line-height 1.1
- **H2 section headings**: 24px, 700 weight
- **Caption / hint**: 16px, `#505a5f`
