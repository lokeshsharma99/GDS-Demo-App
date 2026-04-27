/**
 * FR-05: Confirmation Page
 * Covers: UC- reference number, role=status panel, summary list, what happens next
 * BAT Reference: #13 (E2E), #16 (Submit to API)
 */
import { test, expect } from '@playwright/test';
import { completeFullJourney, VALID_FORM_DATA } from './helpers';

test.describe('FR-05: Confirmation Page', () => {
  test.beforeEach(async ({ page }) => {
    await completeFullJourney(page);
  });

  test('FR-05-01: Confirmation heading "Application submitted" is displayed', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /application submitted/i })
    ).toBeVisible();
  });

  test('FR-05-02: Confirmation panel has role=status for screen reader announcement', async ({ page }) => {
    await expect(page.locator('[role="status"]')).toBeVisible();
  });

  test('FR-05-03: Application reference number starting with UC- is displayed', async ({ page }) => {
    await expect(page.getByText(/UC-/)).toBeVisible();
  });

  test('FR-05-04: Reference number is unique on each submission', async ({ page, context }) => {
    const refText1 = await page.getByText(/UC-\w+/).textContent();

    // Submit again in a new page
    const page2 = await context.newPage();
    await completeFullJourney(page2);
    const refText2 = await page2.getByText(/UC-\w+/).textContent();

    expect(refText1).not.toBe(refText2);
    await page2.close();
  });

  test('FR-05-05: Submitted first name appears in the summary', async ({ page }) => {
    await expect(page.getByText(VALID_FORM_DATA.firstName, { exact: true })).toBeVisible();
  });

  test('FR-05-06: Submitted last name appears in the summary', async ({ page }) => {
    await expect(page.getByText(VALID_FORM_DATA.lastName, { exact: true })).toBeVisible();
  });

  test('FR-05-07: Submitted email address appears in the summary', async ({ page }) => {
    await expect(page.getByText(VALID_FORM_DATA.email)).toBeVisible();
  });

  test('FR-05-08: Submitted postcode appears in the address summary', async ({ page }) => {
    await expect(page.getByText(new RegExp(VALID_FORM_DATA.postcode))).toBeVisible();
  });

  test('FR-05-09: "What happens next" section is present', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /what happens next/i })
    ).toBeVisible();
  });

  test('FR-05-10: Progress indicator is hidden on confirmation page (submitted state)', async ({ page }) => {
    // ProgressIndicator is not rendered after isSubmitted=true
    await expect(page.getByRole('navigation', { name: 'Progress through application' })).not.toBeAttached();
  });

  test('FR-05-11: "Return to services" button returns to the landing page', async ({ page }) => {
    await page.getByRole('button', { name: /return to services/i }).click();
    await expect(page.getByText(/Universal Credit/i).first()).toBeVisible();
    // Ensure form is reset — no reference number visible
    await expect(page.getByText(/UC-/)).not.toBeVisible();
  });
});
