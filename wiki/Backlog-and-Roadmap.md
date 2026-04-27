# Backlog and Roadmap

This page tracks planned features, improvements, and known issues.

See the [GitHub Issues](https://github.com/lokeshsharma99/GDS-Demo-App/issues) for the full ticketed backlog.

---

## Current Sprint

| Ticket | Title | Priority |
|--------|-------|----------|
| [#1](https://github.com/lokeshsharma99/GDS-Demo-App/issues/1) | Add GDS error summary panel at top of page | High |
| [#2](https://github.com/lokeshsharma99/GDS-Demo-App/issues/2) | Implement form validation rules | High |
| [#3](https://github.com/lokeshsharma99/GDS-Demo-App/issues/3) | Add session timeout warning | Medium |
| [#4](https://github.com/lokeshsharma99/GDS-Demo-App/issues/4) | Add unit tests with Vitest | Medium |
| [#5](https://github.com/lokeshsharma99/GDS-Demo-App/issues/5) | Welsh language (Cymraeg) support | Low |
| [#6](https://github.com/lokeshsharma99/GDS-Demo-App/issues/6) | Print/PDF stylesheet | Low |

---

## Roadmap

### Phase 1 — Foundation ✅ Complete
- [x] GOV.UK GDS header and footer
- [x] Multi-step Universal Credit application form
- [x] WCAG 2.1 AA compliance
- [x] GitHub Actions CI/CD pipeline
- [x] GitHub Pages deployment
- [x] Remove all Coming Soon placeholder services

### Phase 2 — Quality (In Progress)
- [ ] GDS error summary panel
- [ ] Comprehensive form validation
- [ ] Unit and integration tests
- [ ] Accessibility audit with axe-core

### Phase 3 — Enhancement
- [ ] Save and return functionality
- [ ] Session timeout warning
- [ ] Welsh language support
- [ ] Print stylesheet
- [ ] Cookie consent banner

### Phase 4 — Future
- [ ] Backend API integration
- [ ] GOV.UK One Login / GOV.UK Notify integration
- [ ] Additional services (Housing Benefit, etc.) — when implemented

---

## Known Issues

| Issue | Severity | Notes |
|-------|----------|-------|
| No error summary panel | Medium | GDS pattern requires errors summarised at top of page |
| Validation is no-op | High | `validateStep()` currently returns empty errors always |
| No test coverage | Medium | No unit or E2E tests exist yet |
| GDS Transport font requires internet | Low | Font loaded from Google Fonts — offline fallback is Arial |
