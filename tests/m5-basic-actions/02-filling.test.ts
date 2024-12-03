import { test } from '@playwright/test';

test('Filling', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('First name').fill('Andres');
  await page.getByLabel('Date of birth').fill('2023-10-10');
});
