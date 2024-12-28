import { Dialog, expect, Locator, test } from '@playwright/test';

const name = 'Andres';

test('Dialog default handling is to dismiss', async ({ page }) => {
  await page.goto('/');
  const input: Locator = page.getByLabel('First name');
  await input.fill(name);
  await expect(input).toHaveValue(name);
  /**
   * This will open a dialog. Playwright will dismiss it by default
   * unless there is a `page.on('dialog')` listener, in which case
   * we need either to acccept or dismiss it. Otherwise the page
   * will freezze and the test will never finish.
   *
   * That is why, in this case, the first name input is not cleared.
   * The dialog will open and it will be dismissed automatically.
   */
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
