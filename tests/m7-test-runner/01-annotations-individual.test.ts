import { expect, test } from '@playwright/test';

/**
 * If I add this line, all tests in the file
 * will be skipped.
 *
 * test.skip();
 *
 * So this would not be an individual annotation
 * but a top level one.
 */

test.skip('Will not run', async ({ page }) => {
  console.log('This should not be printed');
});

test('Skip (un)conditionally', async ({ page, browserName }) => {
  test.skip(browserName === 'chromium', 'This test does not work on Chromium');

  test.skip(
    (await page.getByTestId('someId').count()) === 0,
    'Skipping because at least 1 element must be present'
  );
});

/**
 * Playwright will not run this test.
 *
 * We are supposed to fix it in the future.
 */
test.fixme('Fixme', async ({ page }) => {
  console.log();
});

/**
 * This test will pass because we are expecting a failure.
 */
test('Will fail and I intend to indicate it', async ({ page }) => {
  // Test should fail as intented.
  test.fail();

  expect(2).toEqual(3);
  // The would make the test fail, actually.
  // expect(2).toEqual(2);
});
