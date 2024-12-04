import { test } from '@playwright/test';

/**
 * You can add annotations such as `skip` to `describe()`.
 *
 * However, this function does not take any fixfures such as `page` or `browserName`
 */
test.describe('Feature A Group', () => {
  /**
   * But we can do this:
   */
  test.skip(({ browserName }) => browserName === 'chromium');
  test('Test A.1', async ({ page }) => {
    await page.goto('');
    console.log('Test A.1');
  });

  test('Test A.2', async ({ page }) => {
    await page.goto('');
    console.log('Test A.2');
  });
});

test.describe('Feature B Group', () => {
  test('Test B.1', async ({ page }) => {
    await page.goto('');
    console.log('Test B.1');
  });

  test('Test B.2', async ({ page }) => {
    await page.goto('');
    console.log('Test B.2');
  });
});
