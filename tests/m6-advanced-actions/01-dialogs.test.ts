import { Dialog, expect, Locator, test } from '@playwright/test';

const name = 'Andres';

test('Dialog default handling is to dismiss', async ({ page }) => {
  await page.goto('/');
  const input: Locator = page.getByLabel('First name');
  await input.fill(name);
  await expect(input).toHaveValue(name);

  await page.getByRole('button', { name: 'Clear' }).click();
  await expect(input).toHaveValue(name);
});

test('Dialog - OK or dismiss', async ({ page }) => {
  /**
   * If I want this setting not to persist
   * I should use `page.once()`
   */
  page.on('dialog', (dialog: Dialog) => dialog.accept());
  await page.goto('/');
  const input: Locator = page.getByLabel('First name');
  await input.fill(name);
  await expect(input).toHaveValue(name);

  await page.getByRole('button', { name: 'Clear' }).click();
  await expect(input).toHaveValue('');
});
