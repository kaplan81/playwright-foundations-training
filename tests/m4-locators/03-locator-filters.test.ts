import { Locator, test } from '@playwright/test';

test('Generic locator examples', async ({ page }) => {
  await page.goto('/savings.html');
  const rows: Locator = page.getByRole('row');
  console.log(await rows.count());
  const row: Locator = page.getByRole('row').filter({ hasText: 'Competition' });
  console.log(await row.textContent());
  const cell: Locator = row.getByRole('cell').nth(1);
  console.log(await cell.textContent()); // Should be "2%"
});
