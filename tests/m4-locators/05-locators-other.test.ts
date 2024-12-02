import { test } from '@playwright/test';

test('Fill test', async ({ page }) => {
  await page.goto('/');
  await page.check('#heard-about');
  await page.fill('#textarea', 'So I was thinking.');
});
