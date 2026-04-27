/**
 * FR-03: Step 2 — Contact Information
 * Covers: form field rendering, hints, navigation back/forward
 * BAT Reference: #8 (Validation), #13 (E2E)
 */
import { test, expect } from '@playwright/test';
import { startApplication, fillStep1, fillStep2, VALID_FORM_DATA } from './helpers';

test.describe('FR-03: Step 2 — Contact Information', () => {
  test.beforeEach(async ({ page }) => {
    await startApplication(page);
    await fillStep1(page);
    await page.getByRole('button', { name: /continue/i }).click();
  });

  test('FR-03-01: Step 2 heading is "Contact information"', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Contact information/i })).toBeVisible();
  });

  test('FR-03-02: Progress indicator shows Step 2 of 4 as current', async ({ page }) => {
    await expect(page.getByText(/Step 2 of 4/i)).toBeVisible();
    const currentStep = page.locator('[aria-current="step"]');
    await expect(currentStep).toContainText(/Contact/i);
  });

  test('FR-03-03: Step 1 is marked as completed in the progress indicator', async ({ page }) => {
    const progressNav = page.getByRole('navigation', { name: 'Progress through application' });
    const steps = progressNav.locator('li');
    const step1 = steps.first();
    await expect(step1).not.toHaveAttribute('aria-current', 'step');
    // Step 2 should be current
    const step2 = steps.nth(1);
    await expect(step2).toHaveAttribute('aria-current', 'step');
  });

  test('FR-03-04: Email address field renders with hint text', async ({ page }) => {
    await expect(page.getByLabel('Email address')).toBeVisible();
    await expect(page.getByText(/We'll only use this to contact you/i)).toBeVisible();
  });

  test('FR-03-05: Phone number field renders with hint text', async ({ page }) => {
    await expect(page.getByLabel('UK telephone number')).toBeVisible();
    await expect(page.getByText(/Include the country code/i)).toBeVisible();
  });

  test('FR-03-06: Postcode field is present', async ({ page }) => {
    await expect(page.getByLabel('Postcode')).toBeVisible();
  });

  test('FR-03-07: Filling all fields and clicking Continue moves to Step 3', async ({ page }) => {
    await fillStep2(page);
    await page.getByRole('button', { name: /continue/i }).click();
    await expect(page.getByRole('heading', { name: /Additional information/i })).toBeVisible();
  });

  test('FR-03-08: Email field has type=email for native browser validation', async ({ page }) => {
    await expect(page.getByLabel('Email address')).toHaveAttribute('type', 'email');
  });

  test('FR-03-09: Previously entered Step 1 data is preserved after returning', async ({ page }) => {
    // Go back to Step 1
    await page.getByRole('button', { name: /back|previous/i }).click();
    await expect(page.getByLabel('First name')).toHaveValue(VALID_FORM_DATA.firstName);
  });
});
