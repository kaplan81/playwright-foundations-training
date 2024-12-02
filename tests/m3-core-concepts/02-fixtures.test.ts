import { Browser, chromium, test } from '@playwright/test';

test('Page fixture', async ({ page }) => {
  const browser: Browser = await chromium.launch();
  await page.goto('https://playwright.dev/');
  console.log('Text content:::', await page.title());
});
