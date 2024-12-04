import { expect, Locator, test } from '@playwright/test';

const name = 'Andres';

test('Storage', async ({ page }) => {
  await page.goto('/');

  const input: Locator = page.getByLabel('First name');
  await input.fill(name);
  await page.reload();
  await expect(input).toHaveValue('');

  await input.fill(name);
  await page.getByRole('button', { name: 'Save Input' }).click();
  await page.reload();
  await expect(input).toHaveValue(name);
});

test('Local Storage', async ({ page }) => {
  await page.goto('/');

  page.getByLabel('First name').fill(name);
  await page.getByRole('button', { name: 'Save Input' }).click();

  const storage = await page.context().storageState();

  console.log(storage.cookies);
  /**
   * Playwright does not provide a feature to set or clear
   * the local storage. We can just read it.
   */
  console.log(storage.origins[0].localStorage);
});

test('Session or Local Storage', async ({ page }) => {
  await page.goto('/');

  const input: Locator = page.getByLabel('First name');
  input.fill(name);
  await page.getByRole('button', { name: 'Save Input' }).click();

  /**
   * This code is NOT Playwright.
   * It is plain JavaScript.
   */
  const storage: Storage = await page.evaluate(() => window.localStorage);
  console.log(storage);

  /**
   * So if for example I want to clear the local storage:
   */
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
  await expect(input).toHaveValue('');

  /**
   * Same to set it.
   */
  await page.evaluate(setLocalStorage);
  await page.reload();
  await expect(input).toHaveValue('Andres');
});

function setLocalStorage() {
  localStorage.setItem('firstName', 'Andres');
}
