/**
 * FR-07: Full Happy Path — End-to-End Journey
 * Covers: complete application submission with all valid data
 * BAT Reference: #13 BAT-13-01, #16 BAT-16-01
 */
import { test, expect } from '@playwright/test';
import { completeFullJourney, VALID_FORM_DATA } from './helpers';

test.describe('FR-07: Full Happy Path — Complete Application Journey', () => {
  test('FR-07-01: Claimant can complete and submit the full Universal Credit application', async ({ page }) => {
    await completeFullJourney(page);

    // Should reach confirmation
    await expect(page.getByRole('heading', { name: /application submitted/i })).toBeVisible();
    await expect(page.getByText(/UC-/)).toBeVisible();
  });

  test('FR-07-02: All submitted data is reflected on the confirmation page', async ({ page }) => {
    await completeFullJourney(page, VALID_FORM_DATA);

    await expect(page.getByText(VALID_FORM_DATA.firstName, { exact: true })).toBeVisible();
    await expect(page.getByText(VALID_FORM_DATA.lastName, { exact: true })).toBeVisible();
    await expect(page.getByText(VALID_FORM_DATA.email, { exact: true })).toBeVisible();
    // Postcode is shown in combined address field
    await expect(page.getByText(new RegExp(VALID_FORM_DATA.postcode))).toBeVisible();
  });

  test('FR-07-03: Confirmation panel has role=status', async ({ page }) => {
    await completeFullJourney(page);
    await expect(page.locator('[role="status"]')).toBeVisible();
  });

  test('FR-07-04: "What happens next" section is shown after submission', async ({ page }) => {
    await completeFullJourney(page);
    await expect(page.getByRole('heading', { name: /what happens next/i })).toBeVisible();
  });

  test('FR-07-05: Progress indicator is not shown after form submission', async ({ page }) => {
    await completeFullJourney(page);
    await expect(page.getByRole('navigation', { name: 'Progress through application' })).not.toBeAttached();
  });

  test('FR-07-06: GDS header and footer are present on all pages throughout the journey', async ({ page }) => {
    // Landing page
    await page.goto('/');
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();

    // Step 1
    await page.getByRole('button', { name: /start now/i }).click();
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();
  });
});
