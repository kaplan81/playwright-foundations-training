import { expect, test } from '@playwright/test';

const homeTitle = 'Credit Association';
const savingsTitle = 'Save with us';

test('Back, forward, reaload (refresh)', async ({ page }) => {
  await page.goto('');
  await page.goto('/savings.html');
  await expect(page).toHaveTitle(savingsTitle);
  await page.goBack();
  await expect(page).toHaveTitle(homeTitle);
  await page.goForward();
  await expect(page).toHaveTitle(savingsTitle);
  await page.reload();
  await expect(page).toHaveTitle(savingsTitle);
});
