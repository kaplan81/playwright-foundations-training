import { expect, Locator, test } from '@playwright/test';

test('Recommended built-in locator examples', async ({ page }) => {
  page.goto('');
  const firstNameLabel = 'First name';
  const firstName = page.getByLabel(firstNameLabel);
  await firstName.fill('Sofia');
  await firstName.clear();
  await page.getByLabel(firstNameLabel).fill('Andres');
  await page.getByRole('button', { name: 'Register', exact: true }).click();
  const warning: Locator = await page.getByText('Valid last name is required');
  expect(warning).toBeVisible();
});
