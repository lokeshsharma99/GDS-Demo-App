/**
 * FR-01: Landing Page
 * Covers: GOV.UK header, service branding, Universal Credit start link
 * BAT Reference: #13 (E2E), #23 (Accessibility)
 */
import { test, expect } from '@playwright/test';

test.describe('FR-01: Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('FR-01-01: GOV.UK header is present with correct service name', async ({ page }) => {
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByText('GOV.UK')).toBeVisible();
  });

  test('FR-01-02: Page title identifies the service', async ({ page }) => {
    await expect(page).toHaveTitle(/Universal Credit|Apply for Benefits/i);
  });

  test('FR-01-03: Universal Credit service is displayed', async ({ page }) => {
    await expect(page.getByText(/Universal Credit/i).first()).toBeVisible();
  });

  test('FR-01-04: Start Now button is present and navigates to Step 1', async ({ page }) => {
    const startBtn = page.getByRole('button', { name: /start now/i });
    await expect(startBtn).toBeVisible();
    await page.getByRole('radio', { name: /universal credit/i }).check();
    await startBtn.click();
    await expect(page.getByText(/Personal details/i)).toBeVisible();
  });

  test('FR-01-05: Skip link is present for accessibility', async ({ page }) => {
    const skipLink = page.getByRole('link', { name: /skip to main content/i });
    await expect(skipLink).toBeAttached();
  });

  test('FR-01-06: GOV.UK footer is present with OGL licence', async ({ page }) => {
    await expect(page.getByRole('contentinfo')).toBeVisible();
    await expect(page.getByText(/Open Government Licence/i)).toBeVisible();
  });

  test('FR-01-07: BETA banner is present', async ({ page }) => {
    await expect(page.getByText(/BETA/i).first()).toBeVisible();
  });
});
