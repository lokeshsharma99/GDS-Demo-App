# Development Guide

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 18+ (20 recommended) |
| npm | 9+ |
| Git | 2.x |

---

## Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/lokeshsharma99/GDS-Demo-App.git
cd GDS-Demo-App

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:12000**

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (hot reload) on port 12000 |
| `npm run build` | Build for production into `/dist` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint across all source files |
| `npm run test` | Run unit tests with Vitest |
| `npm run test:coverage` | Run tests with coverage report |

---

## Environment Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `VITE_BASE_URL` | Base URL path for GitHub Pages | `/` |

Set in the GitHub Actions workflow when building for deployment:
```yaml
env:
  VITE_BASE_URL: /GDS-Demo-App/
```

Locally, `VITE_BASE_URL` is unset so the base defaults to `/`.

---

## Adding a New Form Step

The app uses **React Router** with one page component per route. Follow these steps to add a new form step.

### 1. Add fields to `src/types/form.ts`

```ts
export interface FormData {
  // ... existing fields ...
  myNewField: string;
}
```

### 2. Update `src/context/FormContext.tsx`

Add the new field with an empty default to `EMPTY_FORM`:

```ts
const EMPTY_FORM: FormData = {
  // ... existing fields ...
  myNewField: '',
};
```

### 3. Create the step content component in `src/components/`

```tsx
// src/components/MyNewStep.tsx
const MyNewStep: React.FC<{ formData: FormData; errors: FormErrors; onChange: ... }> = ({
  formData, errors, onChange
}) => (
  <div>
    <h1 style={{ fontSize: '36px', fontWeight: 700, ... }}>Question title</h1>
    <FormInput label="Field label" name="myNewField" value={formData.myNewField}
      onChange={onChange} error={errors.myNewField} required />
  </div>
);
```

### 4. Create the page component in `src/pages/`

Copy an existing page (e.g. `ContactInformationPage.tsx`) and update:
- The `useEffect` page title
- The `validateStep(N, ...)` call number
- The `navigate(...)` targets for Continue/Back
- The imported step component

### 5. Register the route in `src/App.tsx`

```tsx
import MyNewPage from './pages/MyNewPage';

// Inside <Routes>:
<Route path="/apply/my-new-step" element={<MyNewPage />} />
```

### 6. Update navigation targets

Update the previous page's Continue button to navigate to `/apply/my-new-step`, and the new page's Back button to point to the previous step.

### 7. Add validation in `src/utils/validation.ts`

```ts
if (step === N) {
  if (!formData.myNewField.trim()) {
    errors.myNewField = 'Enter your ...';
  }
}
```

### 8. Update `ProgressIndicator`

Pass the correct `currentStep` and add the new title to `STEP_TITLES`.

---

## GDS Component Guidelines

Follow the [GOV.UK Design System](https://design-system.service.gov.uk/) and [Service Manual design guidance](https://www.gov.uk/service-manual/design).

- **One `<h1>` per page** — the question or step title; no other `<h1>` on the same page
- **Always link `<label>` to its input** via `htmlFor` and matching `id`
- **No asterisks** on required fields — GOV.UK does not use asterisk notation
- **Date fields**: always use `<DateInput>` (3 text fields) — never `type="date"`
- **Error summary**: always import and render `<ErrorSummary errors={errors} />` at the top of `<main>` on form pages
- **Error messages**: pass `error={errors.fieldName}` to `<FormInput>` — the component handles the red border, left bar, and `aria-describedby`
- **Hint text**: pass `hint="..."` to `<FormInput>` for additional guidance (keep brief — 3 lines max per GOV.UK guidance)
- **No `border-radius`** on buttons or inputs
- **Use GDS colour tokens** from `index.css` (e.g. `var(--govuk-colour-green)`)
- **Validation messages**: write messages that tell users *how to fix the problem*, not just what went wrong

---

## Code Style

- TypeScript strict mode — all props must be typed
- Functional components only (no class components)
- Inline styles for GDS-specific styling (avoids Tailwind conflicts with precise GDS values)
- Tailwind utility classes for layout/spacing helpers only
- `useEffect` to set `document.title` on every page component

---

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production branch — auto-deploys to GitHub Pages |
| `feat/*` | New features |
| `fix/*` | Bug fixes |
| `chore/*` | Tooling, deps, config |

All changes go through a Pull Request. PRs require a passing build before merge.


## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 18+ (20 recommended) |
| npm | 9+ |
| Git | 2.x |

---

## Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/lokeshsharma99/GDS-Demo-App.git
cd GDS-Demo-App

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:12000**

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (hot reload) on port 12000 |
| `npm run build` | Build for production into `/dist` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint across all source files |

---

## Environment Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `VITE_BASE_URL` | Base URL path for GitHub Pages | `/` |

Set in the GitHub Actions workflow when building for deployment:
```yaml
env:
  VITE_BASE_URL: /GDS-Demo-App/
```

---

## Adding a New Form Step

1. Create a new component in `src/components/`:
   ```tsx
   // src/components/MyNewStep.tsx
   const MyNewStep: React.FC<...> = ({ formData, errors, onChange }) => {
     return (
       <div>
         <h1 style={{ fontSize: '36px', fontWeight: 700, ... }}>Step title</h1>
         <FormInput label="Field label" name="fieldName" ... />
       </div>
     );
   };
   ```

2. Add any new fields to `src/types/form.ts` (`FormData` interface)

3. Add the step to `App.tsx`:
   - Increment `TOTAL_STEPS`
   - Add the title to `STEP_TITLES`
   - Add a new `case` in `renderStep()`

4. Add validation in `src/utils/validation.ts` for the new step

---

## GDS Component Guidelines

- Use `<h1>` (not `<h2>`) as the page heading for each step — there is only one `<h1>` per page
- Always link `<label>` to its input via `htmlFor` and matching `id`
- Pass `error={errors.fieldName}` to `FormInput` — it handles the red border and `aria-describedby` automatically
- Use `hint` prop on `FormInput` for helper text beneath the label
- Never use `border-radius` on buttons or inputs (GDS requirement)
- Use GDS colour variables from `index.css` (e.g., `var(--govuk-colour-green)`)

---

## Code Style

- TypeScript strict mode — all props must be typed
- Functional components only (no class components)
- Inline styles for GDS-specific styling (avoids Tailwind conflicts with precise GDS values)
- Tailwind utility classes for layout/spacing helpers only

---

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production branch — auto-deploys to GitHub Pages |
| `feat/*` | New features |
| `fix/*` | Bug fixes |
| `chore/*` | Tooling, deps, config |

All changes go through a Pull Request. PRs require a passing build before merge.
