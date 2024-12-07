import test, { expect, Locator, Route } from '@playwright/test';

/**
 * This would disable all JS in the page
 * including the hardcoded or present in the page.
 */
// test.use({ javaScriptEnabled: false });

test('Route Abort - JS Block', async ({ page }) => {
  /**
   * This aborts or blocks all JS that is additionally loaded to the page.
   */
  await page.route('**/*.{js}', (route: Route) => route.abort());
  await page.goto('/savings.html');
  await page.getByTestId('deposit').fill('10');
  await expect(page.getByTestId('result')).not.toBeVisible();
});

test('Route with a condition', async ({ page }) => {
  await page.route('**/*', (route: Route) => {
    if (route.request().resourceType() === 'script') {
      route.abort();
    } else {
      route.continue();
    }
  });
});

test('Route Fulfill', async ({ page }) => {
  const notFoundText = 'Not Found!';
  await page.route('**/*.pdf', (route: Route) => {
    route.fulfill({
      status: 404,
      contentType: 'text/plain',
      body: notFoundText,
    });
  });
  await page.goto('/savings.html');
  await page.getByText('Download Our Offer').click();
  await page.screenshot({ path: 'route.png' });
  await page.waitForURL('**/*.pdf');
  const body: Locator = page.locator('body');
  await expect(body).toContainText(notFoundText);
});
