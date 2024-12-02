import { expect, test } from '@playwright/test';

test('Simple assertions', async ({ page }) => {
  expect('a').toEqual('a');
  expect(2).toBeLessThan(3);
  expect(null).toBeNull();
});

test('Simple auto-retrying assertions', async ({ page }) => {
  const url = 'http://localhost:3000/';
  await page.goto(url);
  await expect(page.getByTestId('location')).toContainText('New York');
  await expect(page).toHaveTitle('Credit Association');
  await expect(page).toHaveURL(url);
});
