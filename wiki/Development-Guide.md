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
