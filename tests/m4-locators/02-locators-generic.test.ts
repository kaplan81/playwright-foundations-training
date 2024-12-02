import { expect, test } from '@playwright/test';

test('Generic locator examples', async ({ page }) => {
  page.goto('');
  await page.locator('.needs-validation label[for="firstName"]').fill('Andres');
  await page.locator('//form//button[2]').click();
  await expect(page.getByText('Valid last name is required')).toBeVisible();
});
