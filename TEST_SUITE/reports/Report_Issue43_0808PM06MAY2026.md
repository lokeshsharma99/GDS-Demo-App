# Test Coverage Report

## Issue Details
- **Issue ID:** #43
- **Issue Title:** SKTESTING: Jobseeker Option is now live
- **Issue Link:** https://github.com/lokeshsharma99/GDS-Demo-App/issues/43
- **Report Generated:** 08:08 PM 06 May 2026
- **Baseline File Checked:** TEST_SUITE/Baseline_Test_Suite.feature

---

## Summary

| # | Change / Behaviour | Verdict | Action Taken |
|---|---|---|---|
| 1 | "Jobseeker's Allowance" radio option is present and selectable on the Landing Page | ❌ NOT COVERED | New scenario written |
| 2 | Selecting "Jobseeker's Allowance" and clicking "Start now" navigates to the Personal Details page | ⚠️ PARTIALLY COVERED | New scenario written alongside existing |

---

## Detailed Findings

### Change 1 — "Jobseeker's Allowance" radio option is present and selectable on the Landing Page

**Verdict:** ❌ NOT COVERED

**Reason:**
The source code in `src/components/LandingPage.tsx` defines three radio options in the `SERVICES` array, one of which is `Jobseeker's Allowance` with `id: 'jobseekers-allowance'`. No existing scenario in the baseline verifies that this option is present and can be selected. Scenario 1 only selects `Universal Credit` and Scenario 2 tests the error when nothing is selected — neither confirms that the Jobseeker's Allowance radio is available and interactive.

**Existing Scenario (if applicable):** None

**Action Taken:** New scenario written

---

### Change 2 — Selecting "Jobseeker's Allowance" and clicking "Start now" navigates to the Personal Details page

**Verdict:** ⚠️ PARTIALLY COVERED

**Reason:**
Scenario 1 in the baseline tests the happy path of selecting a benefit and clicking "Start now", but it only does so for "Universal Credit". The same navigation behaviour must now also be confirmed for the newly live Jobseeker's Allowance option, as the issue specifically states this option is now fully coded. Updating Scenario 1 is not appropriate because its correctness is unaffected — a new scenario alongside it is the cleaner approach.

**Existing Scenario (if applicable):**
```gherkin
Scenario: Navigate to Personal Details after selecting a benefit
  Given I am on the Landing Page
  When I select "Universal Credit"
  And I click "Start now"
  Then I should be taken to the Personal Details page
```

**Action Taken:** New scenario written alongside existing — updating Scenario 1 was not chosen because the existing scenario's correctness is not affected by this issue; a separate scenario provides dedicated traceability to Issue #43.

---

## New and Updated Scenarios

```gherkin
# ───────────────────────────────────────────────
# Issue #43 — Change 1: Jobseeker's Allowance option is selectable on Landing Page
# ───────────────────────────────────────────────
Scenario: Select Jobseeker's Allowance on Landing Page
  Given I am on the "Landing Page" page
  When I select "Jobseeker's Allowance"
  Then I am on the "Landing Page" page
  And I see heading "Apply for Benefits and Support"

# ───────────────────────────────────────────────
# Issue #43 — Change 2: Selecting Jobseeker's Allowance and starting navigates to Personal Details
# ───────────────────────────────────────────────
Scenario: Navigate to Personal Details after selecting Jobseeker's Allowance
  Given I am on the "Landing Page" page
  When I select "Jobseeker's Allowance"
  And I click "Start now"
  Then I am on the "Personal Details" page
```

---

## Confidence Score

| Criterion | Score |
|---|---|
| Step reusability and parameterisation | 20 / 20 |
| Scenario to issue traceability | 20 / 20 |
| Exact label and error message accuracy | 20 / 20 |
| No duplicate step definition patterns | 20 / 20 |
| Existing scenario updates are correctness-only | 20 / 20 |
| **Total** | **100 / 100** |

---

## File Status
- **Baseline file modified:** No — baseline is never modified
- **New Claude Test Suite file created:** Yes
- **New file path:** TEST_SUITE/Claude_Test_Suite_0808_060526.feature
- **Scenarios added:** 2
- **Scenarios updated:** 0
