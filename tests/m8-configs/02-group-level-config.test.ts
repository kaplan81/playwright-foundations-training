import { Page, test } from '@playwright/test';

/**
 * At this level, configs would apply to the whole file.
 *
 * You have all available: geolocation, baseURL, etc.
 */
test.use({
  // browser.newContext() options.
  actionTimeout: 3000,
  navigationTimeout: 3000,
  timezoneId: 'America/New_York',
  launchOptions: {
    // browserType.launch() options.
    slowMo: 2000,
    headless: true,
  },
});

test('File Group Level', async ({ page }) => {
  await page.goto('');
  const zone: string = await getTimeZone(page);
  console.log(zone);
});

test.describe('Describe Group Level', () => {
  /**
   * At this level, configs would apply to the test group in `describe()`.
   */
  test.use({
    // This options overrieds the one applied at the file level.
    timezoneId: 'America/Toronto',
  });
  test('Test 1', async ({ page }) => {
    await page.goto('');
    const zone: string = await getTimeZone(page);
    console.log(zone);
  });
});

async function getTimeZone(page: Page) {
  return await page.evaluate(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone
  );
}
