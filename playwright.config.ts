import { defineConfig, devices } from '@playwright/test';

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
    /**
     *  Collect trace when retrying the failed test.
     * See https://playwright.dev/docs/trace-viewer
     */
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
      /**
       * Here we could also add other properties.
       *
       * For example, if I want to test a mobile device
       * I can assign a directory to those test e.g:
       *
       * testDir: './tests/mobile'
       *
       * Or let us say we want to run smoke tests.
       * We can name those files as `*.smoke.test.ts`:
       *
       * testMatch: /.*.smoke.test.ts/,
       * retries: 0
       *
       * So also for the other tests we could ignore the smoke ones:
       *
       * testIgnore: /.*.smoke.test.ts/,
       * retries: 2
       */
    },
    /**
     * Let us also see how we could implement a global setup for a project:
     */
    {
      name: 'setup-cleanup-demo',
      testMatch: '05-global-setup.test.ts',
      /**
       * This would be for global setup.
       *
       * We could specify several dependencies but
       * notice that they should not be interdependent
       * because Playwright does not run them
       * in the order of the array.
       */
      dependencies: ['setup'],
      /**
       * This is for global cleanup.
       *
       * It only accepts one project.
       *
       * But you can add `teardown` property
       * to a corresponding global setup project
       * and not only that would be a good practice
       * but also it would allow you to specify several.
       */
      teardown: 'cleanup',
    },
    {
      name: 'setup',
      testMatch: '**/global.setup.ts',
    },
    {
      name: 'cleanup',
      testMatch: '**/global.cleanup.ts',
    },
  ],
});
