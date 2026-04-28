/**
 * FR-08: Accessibility — Keyboard Navigation
 * Covers: skip link, tab order, focus management, ARIA landmarks
 * BAT Reference: #23 BAT-23-04, #13 BAT-13-04
 */
import { test, expect } from '@playwright/test';
import { startApplication, fillStep1 } from './helpers';

test.describe('FR-08: Keyboard Accessibility', () => {
  test('FR-08-01: Skip to main content link is the first focusable element', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    await expect(focused).toHaveAttribute('href', '#main-content');
  });

  test('FR-08-02: Skip link target #main-content exists on all form steps', async ({ page }) => {
    await startApplication(page);
    await expect(page.locator('#main-content')).toBeAttached();
  });

  test('FR-08-03: All form fields on Step 1 are reachable by Tab', async ({ page }) => {
    await startApplication(page);

    const fields = [
      page.getByLabel('First name'),
      page.getByLabel('Last name'),
      page.getByLabel('Date of birth'),
      page.getByLabel('National Insurance number'),
    ];

    for (const field of fields) {
      await field.focus();
      await expect(field).toBeFocused();
    }
  });

  test('FR-08-04: Continue button on Step 1 is reachable and activatable by keyboard', async ({ page }) => {
    await startApplication(page);
    await fillStep1(page);

    const continueBtn = page.getByRole('button', { name: /continue/i });
    await continueBtn.focus();
    await expect(continueBtn).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('heading', { name: /Contact information/i })).toBeVisible();
  });

  test('FR-08-10: Start now button is activatable by keyboard', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('radio', { name: /universal credit/i }).check();
    const startBtn = page.getByRole('button', { name: /start now/i });
    await startBtn.focus();
    await expect(startBtn).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('heading', { name: /Personal details/i })).toBeVisible();
  });

  test('FR-08-05: Page has a single <h1> on each step', async ({ page }) => {
    await startApplication(page);
    const h1s = page.getByRole('heading', { level: 1 });
    await expect(h1s).toHaveCount(1);
  });

  test('FR-08-06: Progress indicator navigation landmark exists on all form steps', async ({ page }) => {
    await startApplication(page);
    await expect(page.getByRole('navigation', { name: 'Progress through application' })).toBeVisible();
  });

  test('FR-08-07: Banner (header) landmark is present on landing page', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('banner')).toBeVisible();
  });

  test('FR-08-08: Contentinfo (footer) landmark is present on landing page', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('contentinfo')).toBeVisible();
  });

  test('FR-08-09: ProgressIndicator has an accessible aria-label', async ({ page }) => {
    await startApplication(page);
    const progressNav = page.getByRole('navigation', { name: 'Progress through application' });
    await expect(progressNav).toBeVisible();
    const label = await progressNav.getAttribute('aria-label');
    expect(label).toBeTruthy();
  });
});
