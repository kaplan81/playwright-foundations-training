import { expect, Request, Response, test } from '@playwright/test';

test('Monitoring HTTP traffic', async ({ page }) => {
  // page.on('console', (consoleMessage: ConsoleMessage) => {
  //   expect(consoleMessage.type()).not.toEqual('error');
  // });
  page.on('request', (request: Request) => {
    console.log(`>> ${request.method()} ${request.url()}`);
  });
  page.on('response', (response: Response) => {
    console.log(`<< ${response.status()} ${response.url()}`);
  });

  await page.goto('');
});

test('Testing HTTP traffic', async ({ page }) => {
  page.on('response', (response: Response) => {
    expect
      .soft(
        response.status(),
        `Response with status ${response.status()} failed for URL: ${response.url()}`
      )
      .toBeLessThan(300);
  });

  await page.goto('');
});
