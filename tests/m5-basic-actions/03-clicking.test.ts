import { test } from '@playwright/test';

test('Clicking', async ({ page }) => {
  await page.goto('/');
  const btn = page.getByRole('button', { name: 'Register', exact: true });
  await btn.click();
  await btn.dblclick();
});
