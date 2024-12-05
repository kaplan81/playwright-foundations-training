import { defineConfig } from '@playwright/test';

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
