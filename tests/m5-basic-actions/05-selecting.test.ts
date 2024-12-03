import { expect, Locator, test } from '@playwright/test';

test('Selecting', async ({ page }) => {
  await page.goto('/savings.html');

  const deposit: Locator = page.getByTestId('deposit');
  const period: Locator = page.getByTestId('period');
  const result: Locator = page.getByTestId('result');

  await deposit.fill('100');
  await period.selectOption('6 Months');
  await expect(result).toContainText(
    'After 6 Months you will earn $2.00 on your deposit'
  );

  await period.selectOption({ label: '1 year' });
  await expect(result).toContainText(
    'After 1 Year you will earn $5.00 on your deposit'
  );
});
