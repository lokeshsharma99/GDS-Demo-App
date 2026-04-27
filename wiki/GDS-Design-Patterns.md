# GDS Design Patterns

This page documents how GOV.UK GDS (Government Design System) patterns are applied throughout the application.

Reference: https://design-system.service.gov.uk/

---

## Header — `GovUKHeader.tsx`

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
