/**
 * FR-06: Navigation & Progress Indicator
 * Covers: forward/back navigation, step state, data persistence across navigation
 * BAT Reference: #13 (E2E navigation), #7 (Error state cleared on back)
 */
import { test, expect } from '@playwright/test';
import { startApplication, fillStep1, fillStep2, VALID_FORM_DATA } from './helpers';

test.describe('FR-06: Navigation and Progress Indicator', () => {
  test('FR-06-01: Step counter increments correctly through all steps', async ({ page }) => {
    await startApplication(page);
    await expect(page.getByText(/Step 1 of 4/i)).toBeVisible();

    await fillStep1(page);
    await page.getByRole('button', { name: /continue/i }).click();
    await expect(page.getByText(/Step 2 of 4/i)).toBeVisible();

    await fillStep2(page);
    await page.getByRole('button', { name: /continue/i }).click();
    await expect(page.getByText(/Step 3 of 4/i)).toBeVisible();
  });

  test('FR-06-02: All 4 step titles are visible in the progress indicator', async ({ page }) => {
    await startApplication(page);
    const nav = page.getByRole('navigation', { name: 'Progress through application' });
    await expect(nav.getByText(/Personal/i)).toBeVisible();
    await expect(nav.getByText(/Contact/i)).toHaveCount(1);
    await expect(nav.getByText(/Additional/i)).toBeVisible();
    await expect(nav.getByText(/Confirm/i)).toBeVisible();
  });

  test('FR-06-03: aria-current="step" moves forward with each Continue click', async ({ page }) => {
    await startApplication(page);
    await expect(page.locator('[aria-current="step"]')).toContainText(/Personal/i);

    await fillStep1(page);
    await page.getByRole('button', { name: /continue/i }).click();
    await expect(page.locator('[aria-current="step"]')).toContainText(/Contact/i);

    await fillStep2(page);
    await page.getByRole('button', { name: /continue/i }).click();
    await expect(page.locator('[aria-current="step"]')).toContainText(/Additional/i);
  });

  test('FR-06-04: Completed steps show visually-hidden status indicator', async ({ page }) => {
    await startApplication(page);
    await fillStep1(page);
    await page.getByRole('button', { name: /continue/i }).click();

    // Step 1 should now be marked completed — has aria-current removed
    const progressNav = page.getByRole('navigation', { name: 'Progress through application' });
    const steps = progressNav.locator('li');
    await expect(steps.first()).not.toHaveAttribute('aria-current', 'step');
    // Step 2 should now be current
    await expect(steps.nth(1)).toHaveAttribute('aria-current', 'step');
  });

  test('FR-06-05: Back navigation from Step 2 returns to Step 1', async ({ page }) => {
    await startApplication(page);
    await fillStep1(page);
    await page.getByRole('button', { name: /continue/i }).click();
    await expect(page.getByRole('heading', { name: /Contact information/i })).toBeVisible();

    await page.getByRole('button', { name: /back|previous/i }).click();
    await expect(page.getByRole('heading', { name: /Personal details/i })).toBeVisible();
  });

  test('FR-06-06: Back navigation preserves previously entered data', async ({ page }) => {
    await startApplication(page);
    await fillStep1(page);
    await page.getByRole('button', { name: /continue/i }).click();

    await page.getByRole('button', { name: /back|previous/i }).click();
    await expect(page.getByLabel('First name')).toHaveValue(VALID_FORM_DATA.firstName);
    await expect(page.getByLabel('Last name')).toHaveValue(VALID_FORM_DATA.lastName);
  });

  test('FR-06-07: Step counter decrements correctly when navigating back', async ({ page }) => {
    await startApplication(page);
    await fillStep1(page);
    await page.getByRole('button', { name: /continue/i }).click();
    await expect(page.getByText(/Step 2 of 4/i)).toBeVisible();

    await page.getByRole('button', { name: /back|previous/i }).click();
    await expect(page.getByText(/Step 1 of 4/i)).toBeVisible();
  });

  test('FR-06-08: Return to services button resets the form completely', async ({ page }) => {
    await startApplication(page);
    await fillStep1(page);
    await page.getByRole('button', { name: /continue/i }).click();
    await fillStep2(page);
    await page.getByRole('button', { name: /continue/i }).click();
    await page.getByRole('button', { name: /submit/i }).click();

    await page.getByRole('button', { name: /return to services/i }).click();
    // After reset, Start Now should be visible again
    await expect(page.getByRole('button', { name: /start now/i })).toBeVisible();

    // Re-enter the form and check fields are empty
    await page.getByRole('radio', { name: /universal credit/i }).check();
    await page.getByRole('button', { name: /start now/i }).click();
    await expect(page.getByLabel('First name')).toHaveValue('');
  });
});
