import { defineConfig } from '@playwright/test';

/**
 * For a full description of the options
 * that can be used:
 *
 * https://playwright.dev/docs/api/class-testconfig
 */

const baseURL = 'http://localhost:3000/';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  webServer: {
    command: 'npm start',
    url: baseURL,
    reuseExistingServer: true,
  },
  use: {
    baseURL,
    headless: false,
    launchOptions: { slowMo: 1000 },
  },
});
