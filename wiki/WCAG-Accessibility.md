# WCAG Accessibility

This application targets **WCAG 2.1 Level AA** compliance in line with GOV.UK requirements.

References:
- https://www.w3.org/TR/WCAG21/
- [GOV.UK Design System — Accessibility](https://design-system.service.gov.uk/accessibility/)

---

## Skip Link (2.4.1 Bypass Blocks — Level A)

Every page renders a skip link as the first focusable element:

```html
<a href="#main-content" class="govuk-skip-link">Skip to main content</a>
```

- Visually hidden until focused (clip/clip-path technique in `index.css`)
- Jumps to `id="main-content"` on the page body
- Yellow (`#ffdd00`) focus state when activated

---

## Keyboard Navigation (2.1.1 Keyboard — Level A)

All interactive elements are fully keyboard accessible:

- Buttons and links receive native focus order
- Tab order follows visual reading order (top-to-bottom, left-to-right)
- No keyboard traps
- Previous/Continue buttons placed logically after form fields
- Date input sub-fields (Day, Month, Year) are each individually focusable

---

## Focus Visible (2.4.7 Focus Visible — Level AA)

Global focus styles applied in `index.css`:

```css
a:focus, button:focus, input:focus, select:focus, textarea:focus {
  outline: 3px solid #ffdd00;
  outline-offset: 0;
  background-color: #ffdd00;
  color: #0b0c0c;
  box-shadow: 0 -2px #ffdd00, 0 4px #0b0c0c;
}
```

Form inputs use an inset shadow variant to maintain border visibility.

---

## Labels and Instructions (1.3.1 / 3.3.2 — Level A)

Every form input has an explicit `<label>` with matching `for`/`id`:

```tsx
<label htmlFor="input-firstName">First name</label>
<input id="input-firstName" name="firstName" ... />
```

Date input sub-fields each have their own visible label (Day, Month, Year) inside a `<fieldset>`/`<legend>`.

Hint text and error messages are linked via `aria-describedby`:

```tsx
<input
  aria-describedby="hint-firstName error-firstName"
  aria-invalid={true}
/>
```

---

## Error Identification (3.3.1 / 3.3.3 — Level A/AA)

On validation failure:

- **Error summary** panel (`role="alert"`) appears at the top of `<main>` and receives programmatic focus — screen readers announce all errors immediately
- Each error in the summary is a link to its input field (`href="#input-fieldname"`)
- Individual field error messages use `role="alert"` and a visible **"Error: "** prefix (GOV.UK pattern)
- Input border changes to `4px solid #d4351c`
- A red 4px left bar appears on the field wrapper
- `aria-invalid="true"` set on the input

---

## Date Input Accessibility (1.3.1 / 1.3.5 — Level AA)

The date input uses three separate text fields inside a `<fieldset>`:

- `<legend>` provides the overall label ("Date of birth")
- `aria-describedby` on the `<fieldset>` links to hint and error IDs
- Each sub-field (`input-dobDay`, `input-dobMonth`, `input-dobYear`) has an explicit `<label>`
- `inputMode="numeric"` triggers numeric keyboard on mobile
- `autoComplete="bday-day"`, `"bday-month"`, `"bday-year"` per WCAG 1.3.5
- `aria-invalid` set on all three inputs when there is an error

---

## Autocomplete (1.3.5 Identify Input Purpose — Level AA)

All personal data fields include appropriate `autoComplete` attributes:

| Field | autoComplete value |
|-------|--------------------|
| First name | `given-name` |
| Last name | `family-name` |
| Date of birth — day | `bday-day` |
| Date of birth — month | `bday-month` |
| Date of birth — year | `bday-year` |
| Email | `email` |
| Phone | `tel` |
| Address line 1 | `address-line1` |
| City | `address-level2` |
| Postcode | `postal-code` |

---

## Page Language (3.1.1 — Level A)

```html
<html lang="en">
```

Set in `index.html`.

---

## Page Title (2.4.2 — Level A)

Each page sets `document.title` in a `useEffect` hook using the pattern:

```
[Question / Step name] – Apply for Universal Credit – GOV.UK
```

| Route | Page title |
|-------|-----------|
| `#/` | Apply for Benefits and Support – GOV.UK |
| `#/apply/personal` | Personal details – Apply for Universal Credit – GOV.UK |
| `#/apply/contact` | Contact information – Apply for Universal Credit – GOV.UK |
| `#/apply/additional` | Additional information – Apply for Universal Credit – GOV.UK |
| `#/apply/confirmation` | Application submitted – Apply for Universal Credit – GOV.UK |

---

## Headings (1.3.1 / 2.4.6 — Level AA)

- One `<h1>` per page (question/step title) — matches the `<title>` element
- Logical heading hierarchy: `<h1>` → `<h2>` for subsections only
- No heading levels skipped

---

## Landmarks (1.3.6 / 4.1.2 — Level AA)

| Landmark | Role | Element |
|----------|------|---------|
| Header | `banner` | `<header role="banner">` |
| Main | `main` | `<main>` |
| Footer | `contentinfo` | `<footer role="contentinfo">` |
| Navigation | `navigation` | `<nav aria-label="...">` |

---

## Colour Contrast (1.4.3 — Level AA)

All text meets or exceeds 4.5:1 contrast ratio against its background:

| Text | Background | Ratio |
|------|------------|-------|
| `#0b0c0c` on `#ffffff` | White | ~19:1 ✅ |
| `#ffffff` on `#00703c` | Green button | ~4.5:1 ✅ |
| `#ffffff` on `#0b0c0c` | Header | ~19:1 ✅ |
| `#d4351c` error on `#ffffff` | White | ~5.1:1 ✅ |
| `#505a5f` hint on `#ffffff` | White | ~4.6:1 ✅ |

---

## Images / Icons (1.1.1 — Level A)

- Crown SVG logos: `aria-hidden="true"`, `focusable="false"` — decorative
- Arrow SVGs on buttons: `aria-hidden="true"`
- No meaningful images without text alternatives

---

## Live Regions (4.1.3 — Level AA)

| Element | Attribute | Purpose |
|---------|-----------|---------|
| Error summary | `role="alert"` | Announces all validation errors on submit |
| Confirmation panel | `role="status"` + `aria-live="polite"` | Announces application submitted |
| Individual field errors | `role="alert"` | Immediately announces field error on re-render |

---

## Known Limitations / Future Work

- [ ] Session timeout warning not implemented
- [ ] Welsh language version not available
- [ ] PDF/print stylesheet not implemented
- [ ] Automated axe-core accessibility tests not yet added to CI


## Skip Link (2.4.1 Bypass Blocks — Level A)

Every page renders a skip link as the first focusable element:

```html
<a href="#main-content" class="govuk-skip-link">Skip to main content</a>
```

- Visually hidden until focused (clip/clip-path technique)
- Jumps to `id="main-content"` on the page body
- Shows a yellow (`#ffdd00`) focus state when activated

---

## Keyboard Navigation (2.1.1 Keyboard — Level A)

All interactive elements are fully keyboard accessible:

- Buttons and links receive native focus order
- Tab order follows visual reading order (top to bottom, left to right)
- No keyboard traps
- Previous/Continue buttons placed logically after form fields

---

## Focus Visible (2.4.7 Focus Visible — Level AA)

Global focus styles applied in `index.css`:

```css
a:focus, button:focus, input:focus, select:focus, textarea:focus {
  outline: 3px solid #ffdd00;
  outline-offset: 0;
  background-color: #ffdd00;
  color: #0b0c0c;
  box-shadow: 0 -2px #ffdd00, 0 4px #0b0c0c;
}
```

Form inputs use an inset shadow variant to maintain border visibility.

---

## Labels and Instructions (1.3.1 Info and Relationships — Level A / 3.3.2 Labels — Level A)

Every form input has an explicit `<label>` with matching `for`/`id`:

```tsx
<label htmlFor="input-firstName">First name</label>
<input id="input-firstName" name="firstName" ... />
```

Hint text and error messages are linked via `aria-describedby`:

```tsx
<input
  aria-describedby="hint-firstName error-firstName"
  aria-invalid={true}
/>
```

---

## Error Identification (3.3.1 Error Identification — Level A / 3.3.3 Error Suggestion — Level AA)

On validation failure:

- Error messages use `role="alert"` for immediate screen reader announcement
- Error text includes a visually hidden "Error:" prefix
- Input border changes to `4px solid #d4351c`
- A red `4px` left bar appears on the field wrapper
- `aria-invalid="true"` is set on the input

```tsx
<p id="error-fieldName" role="alert">
  <span style={{ display: 'none' }}>Error: </span>
  Enter your first name
</p>
```

---

## Autocomplete (1.3.5 Identify Input Purpose — Level AA)

All personal data fields include appropriate `autoComplete` attributes:

| Field | autoComplete value |
|-------|--------------------|
| First name | `given-name` |
| Last name | `family-name` |
| Date of birth | `bday` |
| Email | `email` |
| Phone | `tel` |
| Address line 1 | `address-line1` |
| City | `address-level2` |
| Postcode | `postal-code` |

---

## Page Language (3.1.1 Language of Page — Level A)

```html
<html lang="en">
```

Set in `index.html`.

---

## Page Title (2.4.2 Page Titled — Level A)

Title is set in `index.html`:

```html
<title>Apply for Universal Credit – GOV.UK</title>
```

---

## Headings (1.3.1 / 2.4.6 — Level AA)

- One `<h1>` per page (step heading)
- Logical heading hierarchy: `<h1>` → `<h2>` for subsections
- No heading levels skipped

---

## Landmarks (1.3.6 / 4.1.2 — Level AA)

| Landmark | Role | Element |
|----------|------|---------|
| Header | `banner` | `<header role="banner">` |
| Main | `main` | `<main>` |
| Footer | `contentinfo` | `<footer role="contentinfo">` |
| Navigation | `navigation` | `<nav aria-label="...">` |

---

## Colour Contrast

All text meets or exceeds 4.5:1 contrast ratio against its background (WCAG 1.4.3 — Level AA):

| Text | Background | Ratio |
|------|------------|-------|
| `#0b0c0c` on `#ffffff` | White | ~19:1 ✅ |
| `#ffffff` on `#00703c` | Green button | ~4.5:1 ✅ |
| `#ffffff` on `#0b0c0c` | Header | ~19:1 ✅ |
| `#d4351c` error on `#ffffff` | White | ~5.1:1 ✅ |
| `#505a5f` hint on `#ffffff` | White | ~4.6:1 ✅ |

---

## Images / Icons (1.1.1 Non-text Content — Level A)

- Crown SVG logos use `aria-hidden="true"` and `focusable="false"` — they are decorative
- Arrow SVGs on buttons are `aria-hidden="true"`
- No meaningful images without text alternatives

---

## Live Regions (4.1.3 Status Messages — Level AA)

| Element | Attribute | Purpose |
|---------|-----------|---------|
| Confirmation panel | `role="status"` + `aria-live="polite"` | Announces submission success |
| Error messages | `role="alert"` | Immediately announces validation errors |

---

## Known Limitations / Future Work

- [ ] Error summary panel at top of page (GDS pattern) not yet implemented — individual field errors only
- [ ] Session timeout warning not implemented
- [ ] Welsh language version not available
- [ ] PDF/print stylesheet not implemented
