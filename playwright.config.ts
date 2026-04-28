import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/test/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/e2e-junit.xml' }],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false,
      environmentInfo: {
        framework: 'Playwright',
        application: 'GDS Demo App',
        environment: process.env.CI ? 'CI' : 'local',
      },
    }],
  ],
  use: {
    baseURL: 'http://localhost:12000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    // In CI: serve the production build via `vite preview` so tests run against
    // the same compiled output that will be deployed.
    // Locally: use the Vite dev server for a faster feedback loop.
    command: process.env.CI
      ? 'npx vite preview'
      : 'npm run dev',
    url: 'http://localhost:12000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
