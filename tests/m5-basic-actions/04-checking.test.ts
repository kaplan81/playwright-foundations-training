import { expect, Locator, test } from '@playwright/test';

test('Checking', async ({ page }) => {
  await page.goto('/');
  const message = 'msg';
  const checkBox: Locator = page.getByRole('checkbox');
  const textarea: Locator = page.locator('#textarea');

  await checkBox.check();
  await textarea.fill(message);

  await expect(textarea).toHaveValue(message);
});
