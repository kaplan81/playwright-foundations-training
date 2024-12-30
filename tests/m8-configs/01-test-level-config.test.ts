import { Browser, BrowserContext, Page, test } from '@playwright/test';

/**
 * The playwright featurue allows us to test differently
 * depending on browsers.
 *
 * However, you will most likely not use this feature
 * because you can import the browsers also from '@playwright/test'.
 */
test('Top Level Firefox', async ({ playwright }) => {
  const firefoxBrowser: Browser = await playwright.firefox.launch();
  const firefoxContext: BrowserContext = await firefoxBrowser.newContext();
  const firefoxPage: Page = await firefoxContext.newPage();
  await firefoxPage.goto('');
});

test('Top Level Chromium', async ({ playwright }) => {
  /**
   * Config examples for the browser.
   */
  const chromiumBrowser: Browser = await playwright.chromium.launch({
    headless: false,
    slowMo: 2000,
    downloadsPath: 'your/path',
  });

  /**
   * Config examples for the browser context.
   */
  const chromiumContext: BrowserContext = await chromiumBrowser.newContext({
    baseURL: 'http://google.com/',
    timezoneId: 'America/New_York',
    locale: 'es-ES',
    geolocation: { longitude: 12.492507, latitude: 41.889938 },
    viewport: { width: 600, height: 400 },
    javaScriptEnabled: true,
    acceptDownloads: true,
  });

  const chromiumPage: Page = await chromiumContext.newPage();
  await chromiumPage.goto('');
  await chromiumPage.getByRole('button', { name: 'Aceptar todo' }).click();
});
