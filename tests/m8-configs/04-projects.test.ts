import { test } from '@playwright/test';

test.use({ headless: false });

/**
 * If we have several projects, this test will run
 * as many times as projects we have.
 */
test('Test 1', async ({ page }) => {
  await page.goto('');
  await page.goBack();
  console.log('test');
});
