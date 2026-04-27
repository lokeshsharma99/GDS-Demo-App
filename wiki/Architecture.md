# Architecture

## Overview

The GDS Demo App is a single-page React application (SPA) that simulates a multi-step government service form, following GOV.UK design and accessibility standards.

---

## Component Tree

```
App.tsx
├── LandingPage.tsx              ← Service start page (shown when no service selected)
│   ├── GovUKHeader.tsx
│   └── GovUKFooter.tsx
│
└── Multi-step form (shown after service selection)
    ├── GovUKHeader.tsx
    ├── ProgressIndicator.tsx    ← Step tracker (nav with aria-current="step")
    ├── PersonalDetailsStep.tsx
    │   └── FormInput.tsx (×4)
    ├── ContactInformationStep.tsx
    │   └── FormInput.tsx (×5)
    ├── AdditionalInformationStep.tsx
    │   └── FormInput.tsx (×2)
    ├── ConfirmationStep.tsx     ← GDS summary list + confirmation panel
    └── GovUKFooter.tsx
```

---

## State Management

All state is managed locally in `App.tsx` using React `useState` hooks. No external state library is used.

| State | Type | Purpose |
|-------|------|---------|
| `selectedService` | `string \| null` | Which service was selected on landing page |
| `currentStep` | `number` | Current step (1–4) in the form |
| `isSubmitted` | `boolean` | Whether form has been submitted |
| `formData` | `FormData` | All form field values |
| `errors` | `FormErrors` | Validation error messages by field name |

---

## Data Flow

```
User selects service
    → setSelectedService('universal-credit')
    → App renders multi-step form

User fills form fields
    → handleInputChange → setFormData (partial update)
    → error for field cleared on change

User clicks Continue
    → handleNext → validateStep(currentStep, formData)
    → if errors: setErrors, stop
    → if valid: advance step (or submit on final step)

Form submitted
    → setIsSubmitted(true), setCurrentStep(TOTAL_STEPS)
    → ConfirmationStep rendered
```

---

## Styling Strategy

- **GDS CSS custom properties** defined in `index.css` (`--govuk-colour-*`, `--govuk-focus-colour`, etc.)
- **GDS inline styles** on components for precise GDS spacing and typography (avoiding Tailwind conflicts)
- **Tailwind CSS** retained for utility classes where appropriate
- **No rounded corners** on any interactive elements (GDS requirement)
- **Focus ring**: `3px solid #ffdd00` with `box-shadow: 0 -2px #ffdd00, 0 4px #0b0c0c` (GDS standard)

---

## Key Files

| File | Responsibility |
|------|---------------|
| `App.tsx` | Top-level routing, form state, step navigation |
| `components/GovUKHeader.tsx` | GOV.UK Crown SVG logo, service name, BETA phase banner |
| `components/GovUKFooter.tsx` | OGL licence, Crown copyright, footer navigation |
| `components/FormInput.tsx` | WCAG-compliant field: label↔input binding, hint text, error state |
| `utils/validation.ts` | Step-level validation logic |
| `types/form.ts` | `FormData` and `FormErrors` TypeScript types |
| `index.css` | GDS CSS custom properties, skip link, focus styles |
