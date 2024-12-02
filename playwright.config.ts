import { defineConfig } from '@playwright/test';

const baseURL = 'http://localhost:3000/';

export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  webServer: {
    command: 'npm start',
    url: baseURL,
  },
  use: {
    baseURL,
    headless: false,
    launchOptions: { slowMo: 1000 },
  },
});
