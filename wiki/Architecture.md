# Architecture

## Overview

The GDS Demo App is a **multi-page React application** that implements a government service application flow following GOV.UK design and accessibility standards. Each form step is a distinct URL route, following the GOV.UK ["one thing per page"](https://www.gov.uk/service-manual/design/form-structure#start-with-one-thing-per-page) principle.

Routing uses **React Router v6** with `HashRouter` (required for static GitHub Pages hosting — no server-side routing).

---

## Route Map

| Hash URL | Page | Step |
|----------|------|------|
| `#/` | Landing / Start page | — |
| `#/apply/personal` | Personal details | Step 1 of 4 |
| `#/apply/contact` | Contact information | Step 2 of 4 |
| `#/apply/additional` | Additional information | Step 3 of 4 |
| `#/apply/confirmation` | Confirmation | Step 4 of 4 |

Any unmatched route redirects to `#/`.

---

## Component Tree

```
main.tsx
└── HashRouter
    └── App.tsx  (FormProvider + Routes)
        ├── pages/LandingPage.tsx             → #/
        │   └── components/LandingPage.tsx
        │       ├── GovUKHeader.tsx
        │       └── GovUKFooter.tsx
        │
        ├── pages/PersonalDetailsPage.tsx     → #/apply/personal
        │   ├── GovUKHeader.tsx
        │   ├── ProgressIndicator.tsx
        │   ├── ErrorSummary.tsx              ← GOV.UK error summary (top of page)
        │   ├── components/PersonalDetailsStep.tsx
        │   │   ├── FormInput.tsx (×2)        ← first/last name
        │   │   └── DateInput.tsx             ← GOV.UK 3-field date input
        │   └── GovUKFooter.tsx
        │
        ├── pages/ContactInformationPage.tsx  → #/apply/contact
        │   ├── GovUKHeader.tsx
        │   ├── ProgressIndicator.tsx
        │   ├── ErrorSummary.tsx
        │   ├── components/ContactInformationStep.tsx
        │   │   └── FormInput.tsx (×5)
        │   └── GovUKFooter.tsx
        │
        ├── pages/AdditionalInformationPage.tsx → #/apply/additional
        │   ├── GovUKHeader.tsx
        │   ├── ProgressIndicator.tsx
        │   ├── ErrorSummary.tsx
        │   ├── components/AdditionalInformationStep.tsx
        │   │   └── FormInput.tsx (×2)
        │   └── GovUKFooter.tsx
        │
        └── pages/ConfirmationPage.tsx        → #/apply/confirmation
            ├── GovUKHeader.tsx
            ├── components/ConfirmationStep.tsx  ← GDS panel + summary list
            └── GovUKFooter.tsx
```

---

## State Management

All form state is held in `FormContext` (React Context API), provided at the `App` level so every page can read and update it without prop-drilling or an external state library.

| State | Type | Purpose |
|-------|------|---------|
| `selectedService` | `string \| null` | Which service was chosen on the landing page |
| `formData` | `FormData` | All field values across all steps |
| `errors` | `FormErrors` | Validation errors keyed by field name |

`FormContext` also exposes:
- `handleInputChange` — shared `onChange` handler (clears field error on change)
- `resetForm` — resets all state back to empty (used by confirmation page "Return to services")

### Guard pattern

Every form page checks `selectedService` on mount. If it is `null` (e.g. user navigated directly to a step URL without selecting a service), the page immediately redirects to `#/` to prevent empty-state rendering.

---

## Data Flow

```
User selects service on landing page
  → setSelectedService('universal-credit')
  → navigate('#/apply/personal')

User fills form fields
  → handleInputChange → updates formData (partial)
  → clears field error on keystroke

User clicks Continue / Submit
  → validateStep(step, formData)  ← validation.ts
  → if errors: setErrors → ErrorSummary renders at top of page, focus moved to it
  → if valid: navigate to next route

On confirmation page
  → ConfirmationStep shows GDS panel + summary list from formData
  → "Return to services" → resetForm() + navigate('#/')
```

---

## Styling Strategy

- **GDS inline styles** on all components — precise GDS values (no Tailwind overrides)
- **GDS CSS custom properties** in `index.css` (`--govuk-colour-*`, `--govuk-focus-colour`, etc.)
- **Tailwind CSS** retained for layout utility classes where applicable
- **No `border-radius`** on any interactive element (GDS requirement)
- **Focus ring**: `3px solid #ffdd00` with `box-shadow: 0 -2px #ffdd00, 0 4px #0b0c0c` (GDS standard)

---

## Key Files

| File | Responsibility |
|------|---------------|
| `src/main.tsx` | Entry point — mounts app inside `<HashRouter>` |
| `src/App.tsx` | Route definitions + `<FormProvider>` wrapper |
| `src/context/FormContext.tsx` | Shared form state via React Context |
| `src/pages/` | One file per URL route |
| `src/components/GovUKHeader.tsx` | GOV.UK Crown SVG + BETA phase banner |
| `src/components/GovUKFooter.tsx` | OGL licence + Crown copyright |
| `src/components/FormInput.tsx` | WCAG-compliant field: label, hint, error |
| `src/components/DateInput.tsx` | GOV.UK date input: 3 separate text fields |
| `src/components/ErrorSummary.tsx` | GOV.UK error summary (focus-managed) |
| `src/utils/validation.ts` | Step-level validation with GDS error messages |
| `src/types/form.ts` | `FormData` and `FormErrors` TypeScript interfaces |
| `src/index.css` | GDS CSS custom properties, skip link, global focus style |
