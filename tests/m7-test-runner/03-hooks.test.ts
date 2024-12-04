import { expect, test } from '@playwright/test';

/**
 * This hook is exectued once per worker.
 *
 * Playwright uses one worker per each test by default if the number
 * of available workers is set up to that amount.
 *
 * The amount of workers defaults to half of the number of logical CPU cores.
 *
 * Meaning the initial setup will run several times maybe:
 *
 * Once for each root test.
 *
 * It can be declared within a `describe()` but do notice that
 * describe() does not affect the the assignment of workers.
 *
 * Use this when you need to set up something that only needs to be initialized once
 * for the entire suite (or per worker), like launching a server,
 * logging in, or setting up a shared resource.
 */
test.beforeAll('Run before all the tests in this file', async () => {
  console.log('Before All Setup');
});

/**
 * The difference with the previous one is subtle.
 *
 * The other one runs 1 time per worker.
 *
 * This one runs 1 time per test no matter how many workers are assigned.
 *
 * Use this when you need to ensure that a clean, isolated state is created
 * before each test, such as navigating to a fresh page or resetting application data.
 */
test.beforeEach('Run before each test', async ({ page }) => {
  console.log('Before Each Setup');
  page.goto('');
});

test('Test 1', async ({ page }) => {
  console.log('Test 1');
  await expect(page.getByRole('button')).toHaveCount(3);
});

test('Test 2', async ({ page }) => {
  console.log('Test 2');
  await expect(page.getByRole('checkbox')).toHaveCount(1);
});

test.afterEach('Run after each test', async () => {
  console.log('After Each Setup');
});

test.afterAll('Run after all the tests in this file', async () => {
  console.log('After All Setup');
});
