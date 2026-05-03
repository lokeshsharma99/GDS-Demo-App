# GDS Demo App — Project Wiki

Welcome to the **GDS Demo App** wiki. This application is a GOV.UK-style Universal Credit application form built with React, TypeScript, and Tailwind CSS. It follows GDS (Government Design System) patterns, the GOV.UK Service Manual design guidance, and WCAG 2.1 AA accessibility standards.

---

## Table of Contents

| Page | Description |
|------|-------------|
| [Home](Home) | Project overview (this page) |
| [Architecture](Architecture) | Technical architecture and component structure |
| [GDS Design Patterns](GDS-Design-Patterns) | How GDS patterns are implemented |
| [WCAG Accessibility](WCAG-Accessibility) | Accessibility compliance details |
| [Development Guide](Development-Guide) | Local setup, build, and dev workflow |
| [Deployment](Deployment) | CI/CD pipeline and GitHub Pages deployment |
| [Backlog & Roadmap](Backlog-and-Roadmap) | Planned features and known issues |

---

## Design References

This application strictly follows official GOV.UK design guidance:

| Source | Purpose |
|--------|---------|
| [GOV.UK Design System — Patterns](https://design-system.service.gov.uk/patterns/) | Question pages, confirmation pages, start page, check answers |
| [GOV.UK Design System — Styles](https://design-system.service.gov.uk/styles/) | Typography, colour, spacing, layout |
| [GOV.UK Design System — Components](https://design-system.service.gov.uk/components/) | Header, footer, buttons, inputs, error summary, date input |
| [Service Manual — Design](https://www.gov.uk/service-manual/design) | Overall design philosophy |
| [Service Manual — Form Structure](https://www.gov.uk/service-manual/design/form-structure) | One thing per page, question protocol |
| [Service Manual — Designing Good Questions](https://www.gov.uk/service-manual/design/designing-good-questions) | Error messages, hint text, closed questions |
| [Service Manual — Making your service look like GOV.UK](https://www.gov.uk/service-manual/design/making-your-service-look-like-govuk) | Visual identity requirements |
| [Service Manual — Using, adapting and creating patterns](https://www.gov.uk/service-manual/design/using-adapting-and-creating-patterns) | Pattern reuse principles |

---

## Project Overview

The GDS Demo App demonstrates a fully functional government service application flow:

1. **Landing / Start Page** — GOV.UK start page pattern: service title, "Before you start" section, green Start button
2. **Personal Details** (`#/apply/personal`) — First name, last name, date of birth (3-field GOV.UK date input), National Insurance number
3. **Contact Information** (`#/apply/contact`) — Email, phone, address, town, postcode
4. **Additional Information** (`#/apply/additional`) — Employment status, supporting details
5. **Confirmation** (`#/apply/confirmation`) — GDS confirmation panel with application reference and summary list

Each step is a **separate page** (URL), following the GOV.UK "one thing per page" principle. The browser URL changes as users progress, enabling back-button navigation and bookmarking.

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Routing | React Router v6 (HashRouter for GitHub Pages) |
| Build tool | Vite 6 |
| Styling | GDS inline styles + Tailwind CSS utilities |
| Icons | Lucide React |
| CI/CD | GitHub Actions |
| Hosting | GitHub Pages |
| Design System | GOV.UK GDS |

### Live Site

**https://lokeshsharma99.github.io/GDS-Demo-App/**

---

## Repository Structure

```
GDS-Demo-App/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions CI/CD pipeline
├── src/
│   ├── context/
│   │   └── FormContext.tsx         # Shared form state (React Context + Provider)
│   ├── pages/
│   │   ├── LandingPage.tsx         # Route: #/
│   │   ├── PersonalDetailsPage.tsx # Route: #/apply/personal
│   │   ├── ContactInformationPage.tsx  # Route: #/apply/contact
│   │   ├── AdditionalInformationPage.tsx # Route: #/apply/additional
│   │   └── ConfirmationPage.tsx    # Route: #/apply/confirmation
│   ├── components/
│   │   ├── GovUKHeader.tsx         # GOV.UK Crown header + BETA banner
│   │   ├── GovUKFooter.tsx         # GOV.UK footer with OGL licence
│   │   ├── LandingPage.tsx         # Service start page content
│   │   ├── ProgressIndicator.tsx   # Step tracker (nav with aria-current="step")
│   │   ├── FormInput.tsx           # WCAG-compliant form field
│   │   ├── DateInput.tsx           # GOV.UK date input (3 text fields: day/month/year)
│   │   ├── ErrorSummary.tsx        # GOV.UK error summary panel
│   │   ├── PersonalDetailsStep.tsx
│   │   ├── ContactInformationStep.tsx
│   │   ├── AdditionalInformationStep.tsx
│   │   └── ConfirmationStep.tsx
│   ├── types/
│   │   └── form.ts                 # FormData and FormErrors types
│   ├── utils/
│   │   └── validation.ts           # Step-level validation with GDS error messages
│   ├── App.tsx                     # Route definitions + FormProvider wrapper
│   ├── main.tsx                    # App entry point with HashRouter
│   └── index.css                   # GDS CSS custom properties + focus styles
├── wiki/                           # This wiki
├── vite.config.ts
└── package.json
```
