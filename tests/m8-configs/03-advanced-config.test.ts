import {
  Browser,
  BrowserContext,
  chromium,
  devices,
  Geolocation,
  LaunchOptions,
  Page,
  test,
} from '@playwright/test';

/**
 * This file exemplifies how we can make our tests more scalable
 * through re-usable configs.
 */

/**
 * This would belong to a `*.enum.ts` file.
 */
export enum City {
  london,
  rome,
}
export type CityET = keyof typeof City;

const iPad = devices['iPad Pro 11'];

/**
 * These coordinates are real.
 *
 * They are not made up.
 */
const locationCoordinates: Record<CityET, Geolocation> = {
  london: { latitude: 51.509865, longitude: -0.118092 },
  rome: { latitude: 41.9027835, longitude: 12.4963655 },
};

const slowAndHeadless: LaunchOptions = {
  headless: false,
  slowMo: 2000,
};

test('Test 1', async ({ page }) => {
  const browser: Browser = await chromium.launch(slowAndHeadless);
  const context: BrowserContext = await browser.newContext({
    geolocation: locationCoordinates.london,
  });
  // Test something.
});

test('Test 2', async () => {
  const browser: Browser = await chromium.launch(slowAndHeadless);
  const context: BrowserContext = await browser.newContext({
    viewport: iPad.viewport,
    userAgent: iPad.userAgent,
    deviceScaleFactor: iPad.deviceScaleFactor,
    geolocation: locationCoordinates.rome,
    locale: 'en_GB',
    /**
     * Without this, the geolocation will not work.
     *
     * It is needed for native capabilities of an emulated device.
     */
    permissions: ['geolocation'],
  });
  const page: Page = await context.newPage();
  await page.goto('http://maps.google.com/');
  await page.getByRole('button', { name: 'Accept all' }).click();
  await page.getByRole('button', { name: 'Stay on web' }).click();
  await page.screenshot({ path: 'rome-ipad.png' });
});
