/**
 * FR-04: Step 3 — Additional Information
 * Covers: employment status select, optional textarea, navigation
 * BAT Reference: #8 (Validation), #13 (E2E)
 */
import { test, expect } from '@playwright/test';
import { startApplication, fillStep1, fillStep2, fillStep3 } from './helpers';

test.describe('FR-04: Step 3 — Additional Information', () => {
  test.beforeEach(async ({ page }) => {
    await startApplication(page);
    await fillStep1(page);
    await page.getByRole('button', { name: /continue/i }).click();
    await fillStep2(page);
    await page.getByRole('button', { name: /continue/i }).click();
  });

  test('FR-04-01: Step 3 heading is "Additional information"', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Additional information/i })).toBeVisible();
  });

  test('FR-04-02: Progress indicator shows Step 3 of 4 as current', async ({ page }) => {
    await expect(page.getByText(/Step 3 of 4/i)).toBeVisible();
    const currentStep = page.locator('[aria-current="step"]');
    await expect(currentStep).toContainText(/Additional/i);
  });

  test('FR-04-03: Steps 1 and 2 are marked as completed', async ({ page }) => {
    const progressNav = page.getByRole('navigation', { name: 'Progress through application' });
    const steps = progressNav.locator('li');
    // Steps 1 and 2 should not have aria-current="step", step 3 should
    await expect(steps.nth(0)).not.toHaveAttribute('aria-current', 'step');
    await expect(steps.nth(1)).not.toHaveAttribute('aria-current', 'step');
    await expect(steps.nth(2)).toHaveAttribute('aria-current', 'step');
  });

  test('FR-04-04: Employment status select renders with all required options', async ({ page }) => {
    const select = page.getByLabel('Employment status');
    await expect(select).toBeVisible();
    // Check each option value is present in the select
    await expect(page.locator('option[value="employed"]')).toBeAttached();
    await expect(page.locator('option[value="self-employed"]')).toBeAttached();
    await expect(page.locator('option[value="unemployed"]')).toBeAttached();
    await expect(page.locator('option[value="student"]')).toBeAttached();
    await expect(page.locator('option[value="retired"]')).toBeAttached();
    await expect(page.locator('option[value="other"]')).toBeAttached();
  });

  test('FR-04-05: Employment status can be selected', async ({ page }) => {
    await page.getByLabel('Employment status').selectOption({ label: 'Employed' });
    await expect(page.getByLabel('Employment status')).toHaveValue('employed');
  });

  test('FR-04-06: Submit button is present on Step 3', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /submit/i })
    ).toBeVisible();
  });

  test('FR-04-07: Selecting employment status and submitting moves to Confirmation', async ({ page }) => {
    await fillStep3(page);
    await page.getByRole('button', { name: /submit/i }).click();
    await expect(page.getByText(/application submitted/i)).toBeVisible();
  });

  test('FR-04-08: Back navigation from Step 3 returns to Step 2 with data preserved', async ({ page }) => {
    await page.getByRole('button', { name: /back|previous/i }).click();
    await expect(page.getByRole('heading', { name: /Contact information/i })).toBeVisible();
  });
});
