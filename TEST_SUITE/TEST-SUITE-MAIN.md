# GDS Demo App — Main Test Suite
## Universal Credit Benefits Application Form
### Manual Functional Test Cases

---

## MODULE 1: Landing Page — Display

**TC-01 — Landing page loads successfully**
The landing page displays with the GOV.UK header, service selection area, and a Start Now button visible without errors.

**TC-02 — All three benefit services are shown**
Universal Credit, Housing Benefit, and Jobseeker's Allowance are all listed as selectable radio options on the landing page.

**TC-03 — Before you start section is visible**
The "Before you start" section is displayed, listing required items like National Insurance number and bank details.

**TC-04 — GOV.UK branding is correct**
The GOV.UK logo, crown symbol, and service name "Apply for Benefits and Support" are displayed in the header.

**TC-05 — BETA banner is displayed**
A blue BETA banner is shown below the header with a feedback link on the landing page.

**TC-06 — GOV.UK footer is present**
The footer is visible at the bottom of the landing page with the Open Government Licence link and Crown copyright.

---

## MODULE 2: Landing Page — Service Selection & Validation

**TC-07 — Clicking Start Now without selecting a service shows an error**
When the user clicks Start Now without selecting any service, the message "Select a benefit before continuing" appears in red above the options.

**TC-08 — Validation error has correct styling**
The error message is displayed with a red left border and role=alert so screen readers announce it immediately.

**TC-09 — Clicking Start Now without a selection does not navigate away**
The user stays on the landing page; no form step is shown when Start Now is clicked without a selection.

**TC-10 — Validation error disappears when a service is selected**
After the error is shown, selecting any service clears the error message from the page.

**TC-11 — Selecting Universal Credit and clicking Start Now navigates to Step 1**
After selecting Universal Credit and clicking Start Now, the user is taken to the Personal Details step.

**TC-12 — Selecting Housing Benefit and clicking Start Now navigates to Step 1**
After selecting Housing Benefit and clicking Start Now, the user proceeds to the form.

**TC-13 — Selecting Jobseeker's Allowance and clicking Start Now navigates to Step 1**
After selecting Jobseeker's Allowance and clicking Start Now, the user proceeds to the form.

---

## MODULE 3: Step 1 — Personal Details

**TC-14 — Step 1 heading is "Personal details"**
The heading "Personal details" is displayed at the top of Step 1.

**TC-15 — Progress indicator shows Step 1 of 4**
The progress bar reads "Step 1 of 4" and highlights "Personal" as the current step.

**TC-16 — First name field is visible and labelled correctly**
A text input labelled "First name" is present and accepts text input.

**TC-17 — Last name field is visible and labelled correctly**
A text input labelled "Last name" is present and accepts text input.

**TC-18 — Date of birth field is visible with hint text**
A date input labelled "Date of birth" is present with the hint "For example, 31 3 1980".

**TC-19 — National Insurance number field is visible with hint and placeholder**
The NI number field shows the hint explaining where to find it and a placeholder of "QQ 12 34 56 C".

**TC-20 — Continue button is present on Step 1**
A green "Continue" button is visible at the bottom of the Step 1 form.

**TC-21 — Filling Step 1 and clicking Continue moves to Step 2**
After filling all Step 1 fields with valid data and clicking Continue, the user lands on the Contact Information step.

---

## MODULE 4: Step 2 — Contact Information

**TC-22 — Step 2 heading is "Contact information"**
The heading "Contact information" is displayed at the top of Step 2.

**TC-23 — Progress indicator shows Step 2 of 4**
The progress bar reads "Step 2 of 4" and highlights "Contact" as the current step.

**TC-24 — Step 1 is marked as completed in the progress indicator**
The "Personal" step in the progress bar is marked as done (green) when the user reaches Step 2.

**TC-25 — Email address field is visible with hint text**
The email field labelled "Email address" is present with the hint "We'll only use this to contact you about your application."

**TC-26 — UK telephone number field is visible with hint text**
The phone field labelled "UK telephone number" is present with a hint about country codes.

**TC-27 — Address line 1 field is visible**
A text input labelled "Address line 1" is present.

**TC-28 — Town or city field is visible**
A text input labelled "Town or city" is present.

**TC-29 — Postcode field is visible with hint and placeholder**
A text input labelled "Postcode" is present with placeholder "SW1A 1AA".

**TC-30 — Filling Step 2 and clicking Continue moves to Step 3**
After filling all Step 2 fields with valid data and clicking Continue, the user lands on the Additional Information step.

---

## MODULE 5: Step 3 — Additional Information

**TC-31 — Step 3 heading is "Additional information"**
The heading "Additional information" is displayed at the top of Step 3.

**TC-32 — Progress indicator shows Step 3 of 4**
The progress bar reads "Step 3 of 4" and highlights "Additional" as the current step.

**TC-33 — Employment status dropdown is present with all options**
The "Employment status" dropdown contains: Employed, Self-employed, Unemployed, Student, Retired, Other.

**TC-34 — Employment status can be selected**
The user can pick any option from the Employment status dropdown and it stays selected.

**TC-35 — Additional information textarea is present and optional**
A multi-line text area for extra information is visible. It is not required — the form can be submitted without filling it.

**TC-36 — Submit button is present on Step 3**
The submit button labelled "Submit Universal Credit Application" is visible on Step 3.

**TC-37 — Selecting employment status and clicking Submit moves to Confirmation**
After selecting an employment status and clicking Submit, the user lands on the Confirmation page.

---

## MODULE 6: Confirmation Page — Panel & Reference

**TC-38 — Confirmation heading "Application submitted" is displayed**
The green confirmation panel shows the heading "Application submitted".

**TC-39 — A unique reference number starting with UC- is shown**
A reference number in the format "UC-XXXXXXXX" is visible inside the confirmation panel.

**TC-40 — Each submission generates a different reference number**
Submitting the form twice produces two different UC- reference numbers.

**TC-41 — Confirmation email message is shown**
The text "We have sent you a confirmation email" is displayed below the confirmation panel.

---

## MODULE 7: Confirmation Page — Application Summary

**TC-42 — Submitted first name appears in the summary**
The applicant's first name is listed in the Application Summary section.

**TC-43 — Submitted last name appears in the summary**
The applicant's last name is listed in the Application Summary section.

**TC-44 — Submitted email address appears in the summary**
The email address entered in Step 2 is displayed in the summary.

**TC-45 — Submitted address (line, city, postcode) appears in the summary**
The full address including postcode is shown as a combined entry in the summary.

**TC-46 — Submitted National Insurance number appears in the summary**
The NI number entered in Step 1 is displayed in the Application Summary.

**TC-47 — Submitted phone number appears in the summary**
The telephone number entered in Step 2 is displayed in the Application Summary.

**TC-48 — Submitted date of birth appears formatted in the summary**
The date of birth is displayed in human-readable format (e.g., "15 June 1985"), not as a raw date string.

**TC-49 — Submitted employment status appears as a readable label in the summary**
The employment status shows the display label (e.g., "Employed") rather than a raw value (e.g., "employed").

**TC-50 — Additional information row only appears when the field was filled**
If the applicant left the Additional information textarea blank, that row does not appear in the summary. If filled, it appears.

---

## MODULE 8: Confirmation Page — What Happens Next

**TC-51 — "What happens next" section is present**
A section titled "What happens next" is displayed below the application summary.

**TC-52 — 5 working days response time is mentioned**
The section states the application will be reviewed and the applicant contacted within 5 working days.

**TC-53 — Link to find out more about Universal Credit is present**
A link "Find out more about Universal Credit" is visible and points to the GOV.UK Universal Credit page.

---

## MODULE 9: Navigation

**TC-54 — Back navigation from Step 2 returns to Step 1**
On Step 2, clicking the Previous button takes the user back to the Personal Details step.

**TC-55 — Back navigation from Step 3 returns to Step 2**
On Step 3, clicking the Previous button takes the user back to the Contact Information step.

**TC-56 — Previously entered data is preserved when navigating back**
When the user navigates back to a previous step, all data they had entered in that step is still present in the fields.

**TC-57 — Progress indicator step counter decrements on back navigation**
Navigating back from Step 2 to Step 1 changes the indicator from "Step 2 of 4" to "Step 1 of 4".

**TC-58 — Previous button is not shown on Step 1**
The Previous button does not appear on Step 1 as there is no earlier form step.

**TC-59 — Back to services link is present on all form steps**
A "← Back to services" link is visible on every form step before submission.

**TC-60 — Return to services button resets the form**
Clicking "Return to services" on the confirmation page takes the user back to the landing page, and re-entering the form shows empty fields.

---

## MODULE 10: Progress Indicator

**TC-61 — Progress indicator is visible on all form steps**
The step progress bar (Step X of 4) is displayed on Steps 1, 2, and 3.

**TC-62 — Progress indicator is hidden after form submission**
The progress bar does not appear on the Confirmation page after the form is submitted.

**TC-63 — Current step is visually highlighted**
The current step label in the progress bar is shown in blue and bold; completed steps are shown in green.

---

## MODULE 11: Accessibility

**TC-64 — Skip to main content link is present on every page**
A "Skip to main content" link is the first focusable element on every page for keyboard users.

**TC-65 — All form fields are reachable by Tab key**
Every input field on every step can be focused and filled using only the keyboard.

**TC-66 — Continue and Submit buttons are activatable by keyboard**
Pressing Enter on a focused Continue or Submit button triggers the same action as clicking it.

**TC-67 — Each page has exactly one H1 heading**
Every form step and the landing page has exactly one main heading (H1), as required by accessibility standards.

**TC-68 — Progress indicator has an accessible label**
The progress indicator navigation has an aria-label of "Progress through application" for screen readers.
