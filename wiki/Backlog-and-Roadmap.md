# Backlog and Roadmap

This page tracks planned features, improvements, and known issues.

See the [GitHub Issues](https://github.com/lokeshsharma99/GDS-Demo-App/issues) for the full ticketed backlog.

---

## Current Sprint

| Ticket | Title | Priority |
|--------|-------|----------|
| [#3](https://github.com/lokeshsharma99/GDS-Demo-App/issues/3) | Add session timeout warning | Medium |
| [#4](https://github.com/lokeshsharma99/GDS-Demo-App/issues/4) | Add unit tests with Vitest | Medium |
| [#5](https://github.com/lokeshsharma99/GDS-Demo-App/issues/5) | Welsh language (Cymraeg) support | Low |
| [#6](https://github.com/lokeshsharma99/GDS-Demo-App/issues/6) | Print/PDF stylesheet | Low |
| [#7](https://github.com/lokeshsharma99/GDS-Demo-App/issues/7) | Automated accessibility tests (axe-core) | Medium |
| [#8](https://github.com/lokeshsharma99/GDS-Demo-App/issues/8) | Check answers page before submission | High |

---

## Roadmap

### Phase 1 — Foundation ✅ Complete
- [x] GOV.UK GDS header and footer
- [x] Multi-step Universal Credit application form
- [x] WCAG 2.1 AA compliance
- [x] GitHub Actions CI/CD pipeline
- [x] GitHub Pages deployment

### Phase 2 — GOV.UK Design Compliance ✅ Complete
- [x] Multi-page routing (React Router v6 HashRouter) — one URL per step
- [x] GOV.UK error summary panel at top of page with focus management
- [x] GOV.UK date input pattern — 3 separate text fields (day/month/year)
- [x] Comprehensive form validation with GOV.UK-style error messages
- [x] Unique `<title>` per page matching the question heading
- [x] Visible "Error: " prefix on field-level error messages (GOV.UK standard)
- [x] Removed asterisks from required fields (not GOV.UK style)
- [x] Tolerant validation (NI number, phone, postcode accept multiple formats)
- [x] Shared form state via React Context (FormProvider)

### Phase 3 — Quality (In Progress)
- [ ] Check answers page (GOV.UK check answers pattern) before submission
- [ ] Unit and integration tests
- [ ] Accessibility audit with axe-core in CI

### Phase 4 — Enhancement
- [ ] Save and return functionality
- [ ] Session timeout warning (GOV.UK pattern)
- [ ] Welsh language support
- [ ] Print stylesheet
- [ ] Cookie consent banner (GOV.UK cookie banner component)

### Phase 5 — Future
- [ ] Backend API integration
- [ ] GOV.UK One Login / GOV.UK Notify integration
- [ ] Additional services (Housing Benefit, Jobseeker's Allowance)

---

## Known Issues

| Issue | Severity | Notes |
|-------|----------|-------|
| No "Check your answers" page | Medium | GOV.UK pattern requires a review step before final submission |
| No session timeout warning | Low | GDS pattern not yet implemented |
| GDS Transport font requires internet | Low | Loaded from Google Fonts — offline fallback is Arial |
| No automated a11y tests in CI | Medium | Manual review only; axe-core not integrated |
