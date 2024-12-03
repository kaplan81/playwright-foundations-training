import { expect, test } from '@playwright/test';

/**
 * Error: locator.click: Error: strict mode violation: getByRole('link') resolved to 3 elements:
        1) <a href="index.html" aria-current="page" class="nav-link active">Register</a> aka getByRole('link', { name: 'Register' })
        2) <a class="nav-link" href="savings.html">Savings</a> aka getByRole('link', { name: 'Savings' })
        3) <a class="nav-link" href="loans.html">Loans</a> aka getByRole('link', { name: 'Loans' })
 */
test('Multiple matches fails', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link').click();
});

/**
 * Normally test suites stop when a test fails.
 * If you want to run all the tests no matter what
 * you could use `expect.soft()` to run all the test.
 * You will see the ones that have failed but the test suite
 * will not stop.
 */

test('Multiple matches - first, last, nth', async ({ page }) => {
  await page.goto('/');
  const buttons = page.getByRole('button');

  console.log(await buttons.first().textContent());
  console.log(await buttons.last().textContent());
  console.log(await buttons.nth(1).textContent());
});

test('Multiple matches - count or iterate', async ({ page }) => {
  await page.goto('/');
  const buttons = page.getByRole('button', { name: 'Register' }).click();
  const feedback = page.locator('.invalid-feedback');

  await expect(feedback).toHaveCount(3);

  for (const message of await feedback.all()) {
    console.log(`${await message.textContent()}`);
  }
});
