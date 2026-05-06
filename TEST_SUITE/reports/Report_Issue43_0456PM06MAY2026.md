# Test Coverage Report

## Issue Details
- **Issue ID:** #43
- **Issue Title:** SKTESTING: Jobseeker Option is now live
- **Issue Link:** https://github.com/lokeshsharma99/GDS-Demo-App/issues/43
- **Report Generated:** 04:56 PM 06 MAY 2026
- **Baseline File Checked:** TEST_SUITE/Baseline_Test_Suite.feature

---

## Summary

| # | Change / Behaviour | Verdict |
|---|---|---|
| 1 | "Jobseeker's Allowance" option is now visible and selectable on the Landing Page | ❌ NOT COVERED |
| 2 | Selecting "Jobseeker's Allowance" and clicking "Start now" navigates to the Personal Details page | ⚠️ PARTIALLY COVERED |
| 3 | A complete application journey can be submitted when "Jobseeker's Allowance" is selected | ❌ NOT COVERED |

---

## Detailed Findings

### Change 1 — "Jobseeker's Allowance" option is now visible and selectable on the Landing Page

**Verdict:** ❌ NOT COVERED

**Reason:**
The baseline suite only tests that selecting "Universal Credit" and clicking "Start now" navigates forward. There is no scenario that verifies the Jobseeker's Allowance radio option is rendered on the Landing Page and can be selected. This is a new benefit option and its presence must be explicitly tested.

**Existing Scenario (if applicable):**
None

**Action Taken:**
New scenario written in Claude_Test_Suite file

---

### Change 2 — Selecting "Jobseeker's Allowance" and clicking "Start now" navigates to the Personal Details page

**Verdict:** ⚠️ PARTIALLY COVERED

**Reason:**
Scenario 1 in the baseline tests that selecting "Universal Credit" and clicking "Start now" reaches the Personal Details page, which covers the navigation pattern. However, no scenario tests the same happy-path flow specifically with "Jobseeker's Allowance" selected, so the new option's routing is not verified.

**Existing Scenario (if applicable):**
```gherkin
Scenario: Navigate to Personal Details after selecting a benefit
  Given I am on the Landing Page
  When I select "Universal Credit"
  And I click "Start now"
  Then I should be taken to the Personal Details page
```

**Action Taken:**
New scenario written in Claude_Test_Suite file

---

### Change 3 — A complete application journey can be submitted when "Jobseeker's Allowance" is selected

**Verdict:** ❌ NOT COVERED

**Reason:**
The baseline has no end-to-end happy-path scenario for any benefit. There is no scenario that walks through all four steps (Personal Details → Contact Information → Additional Information → Confirmation) for any service selection, and none at all for Jobseeker's Allowance specifically. The full submission flow for this new benefit must be tested.

**Existing Scenario (if applicable):**
None

**Action Taken:**
New scenario written in Claude_Test_Suite file

---

## New Scenarios Written

```gherkin
Scenario: Jobseeker's Allowance option is displayed on the Landing Page
  Given I am on the Landing Page
  Then I should see the option "Jobseeker's Allowance"

Scenario: Navigate to Personal Details after selecting Jobseeker's Allowance
  Given I am on the Landing Page
  When I select "Jobseeker's Allowance"
  And I click "Start now"
  Then I should be taken to the Personal Details page

Scenario: Successfully submit a Jobseeker's Allowance application
  Given I am on the Landing Page
  When I select "Jobseeker's Allowance"
  And I click "Start now"
  And I complete the Personal Details step
  And I complete the Contact Information step
  And I complete the Additional Information step
  Then I should see the application confirmation page
```

---

## File Status
- **Baseline file modified:** No — baseline is never modified
- **New Claude Test Suite file created:** Yes
- **New file path:** TEST_SUITE/Claude_Test_Suite_0456_060526.feature
- **Scenarios written:** 3
