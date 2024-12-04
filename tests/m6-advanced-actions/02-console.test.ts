import { ConsoleMessage, expect, test } from '@playwright/test';

/**
 * With regard to errors the tests will fail
 * and that is why we use `expect.soft()`
 */
test('Console', async ({ page }) => {
  /**
   * Will listen to all the console traces
   * (log, warn, error, etc) but not to thrown
   * uncatched errors.
   */
  page.on('console', (msg: ConsoleMessage) => {
    console.log(msg);
    expect.soft(msg.type()).not.toEqual('error');
  });
  /**
   * This one on the other hand will show those errors in the terminal console.
   */
  page.on('pageerror', (error: Error) => {
    console.error(error);
    expect.soft(error.name).not.toEqual('Error');
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Register' }).click();
});
