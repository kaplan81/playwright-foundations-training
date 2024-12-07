import test, { APIResponse, expect } from '@playwright/test';

/**
 * I do not know why but this test does not work for me aka agesteira-fever
 *
 * I do the POST request correctly but with my Fever account the repo
 * does not get created and therefore the test fails.
 *
 * But I keep the code as an example of API+UI testing.
 */

const repoName = 'Playwright-Test-Repo';

test.use({
  baseURL: 'http://api.github.com/',
  extraHTTPHeaders: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `token xxxyourtokenxxx`,
  },
});

/**
 * 1. Create a repo via web API.
 */
test.beforeEach('Create repo', async ({ request }) => {
  const response: APIResponse = await request.post('user/repos', {
    // This would the payload:
    data: {
      name: repoName,
    },
  });
  expect(response.ok()).toBe(true);
  const responseBody: any[] = await response.json();
  console.log(
    'responseBody',
    responseBody.filter((el) => el.owner.login !== 'Feverup')
  );
});

/**
 * 2. Go to UI and check if exists.
 */
test('Work with the newly created repo', async ({ page }) => {
  await page.goto('https://github.com/agesteira-fever?tab=repositories');
  // await expect(page.getByRole('link', { name: repoName })).toHaveCount(1);
});

/**
 * 3. Clean up. Remove repo.
 */
test.afterEach('Delete repo', async ({ request }) => {
  const response: APIResponse = await request.delete(
    `repos/agesteira-fever/${repoName}`
  );
  expect(response.ok()).toBe(true);
  expect(response.status()).toBe(204);
});
