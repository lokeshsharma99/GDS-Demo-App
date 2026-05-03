/**
 * FR-02: Step 1 — Personal Details
 * Covers: form field rendering, labels, hints, navigation
 * BAT Reference: #8 (Validation), #7 (Error summary)
 */
import { test, expect } from '@playwright/test';
import { startApplication, fillStep1, VALID_FORM_DATA } from './helpers';

test.describe('FR-02: Step 1 — Personal Details', () => {
  test.beforeEach(async ({ page }) => {
    await startApplication(page);
  });

  test('FR-02-01: Step 1 heading is "Personal details"', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Personal details/i })).toBeVisible();
  });

  test('FR-02-02: Progress indicator shows Step 1 of 4 as current', async ({ page }) => {
    await expect(page.getByText(/Step 1 of 4/i)).toBeVisible();
    const currentStep = page.locator('[aria-current="step"]');
    await expect(currentStep).toBeVisible();
    await expect(currentStep).toContainText(/Personal/i);
  });

  test('FR-02-03: First name field renders with correct label', async ({ page }) => {
    await expect(page.getByLabel('First name')).toBeVisible();
  });

  test('FR-02-04: Last name field renders with correct label', async ({ page }) => {
    await expect(page.getByLabel('Last name')).toBeVisible();
  });

  test('FR-02-05: Date of birth field renders with Day, Month and Year inputs', async ({ page }) => {
    await expect(page.getByLabel('Day')).toBeVisible();
    await expect(page.getByLabel('Month')).toBeVisible();
    await expect(page.getByLabel('Year')).toBeVisible();
  });

  test('FR-02-06: National Insurance number field renders with correct label', async ({ page }) => {
    await expect(page.getByLabel('National Insurance number')).toBeVisible();
  });

  test('FR-02-07: Continue button is present', async ({ page }) => {
    await expect(page.getByRole('button', { name: /continue/i })).toBeVisible();
  });

  test('FR-02-08: Filling all fields and clicking Continue moves to Step 2', async ({ page }) => {
    await fillStep1(page);
    await page.getByRole('button', { name: /continue/i }).click();
    await expect(page.getByRole('heading', { name: /Contact information/i })).toBeVisible();
  });

  test('FR-02-09: Entered values are preserved in the form fields', async ({ page }) => {
    await page.getByLabel('First name').fill(VALID_FORM_DATA.firstName);
    await expect(page.getByLabel('First name')).toHaveValue(VALID_FORM_DATA.firstName);
  });

  test('FR-02-10: Skip link target #main-content is present on this page', async ({ page }) => {
    await expect(page.locator('#main-content')).toBeAttached();
  });
});
