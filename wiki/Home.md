# GDS Demo App — Project Wiki

Welcome to the **GDS Demo App** wiki. This application is a GOV.UK-style Universal Credit application form built with React, TypeScript, and Tailwind CSS. It follows GDS (Government Design System) patterns and WCAG 2.1 AA accessibility standards.

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

## Project Overview

The GDS Demo App demonstrates a fully functional government service application flow:

1. **Landing Page** — GOV.UK-style service start page with Crown logo header and footer
2. **Personal Details** — Name, date of birth, National Insurance number
3. **Contact Information** — Email, phone, address, postcode
4. **Additional Information** — Employment status, supporting details
5. **Confirmation** — GDS confirmation panel with application summary

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| Styling | Tailwind CSS + GDS inline styles |
| Icons | Lucide React |
| CI/CD | GitHub Actions |
| Hosting | GitHub Pages |
| Design System | GOV.UK GDS |

### Live Site

The app is deployed and publicly accessible at:
**https://lokeshsharma99.github.io/GDS-Demo-App/**

---

## Repository Structure

```
GDS-Demo-App/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD pipeline
├── src/
│   ├── components/
│   │   ├── GovUKHeader.tsx     # GOV.UK Crown header + BETA banner
│   │   ├── GovUKFooter.tsx     # GOV.UK footer with OGL licence
│   │   ├── LandingPage.tsx     # Service start page
│   │   ├── ProgressIndicator.tsx
│   │   ├── FormInput.tsx       # WCAG-compliant form field
│   │   ├── PersonalDetailsStep.tsx
│   │   ├── ContactInformationStep.tsx
│   │   ├── AdditionalInformationStep.tsx
│   │   └── ConfirmationStep.tsx
│   ├── types/
│   │   └── form.ts
│   ├── utils/
│   │   └── validation.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css               # GDS CSS custom properties + focus styles
├── vite.config.ts
├── tailwind.config.js
└── package.json
```
