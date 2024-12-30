import { expect, Request, Response, test } from '@playwright/test';

test('Request / Response', async ({ page }) => {
  const response: Response | null = await page.goto('');

  if (response === null) {
    return;
  }

  console.log(response.url());
  console.log(response.status());
  console.log(response.ok());

  expect(response.ok()).toBe(true);

  /**
   * You can get the headers both as an object or as an array.
   */
  console.log(await response.allHeaders());
  console.log(await response.headersArray());

  /**
   * The `body()` method returns a promise of a buffer
   * so it is not readable.
   *
   * If you want to read the body do use the `text` method.
   */
  console.log(await response.body());
  console.log(await response.text());
  /**
   * This will throw an error because HTML is not parsable to json.
   */
  // console.log(await response.json());

  const request: Request = response.request();

  console.log(await request.allHeaders());
  console.log(request.method());
});

test('Request from fixture', async ({ request }) => {
  const response = await request.get('http://api.github.com/');

  console.log(response.ok());
  console.log(response.status());
  console.log(response.headersArray());
  console.log(await response.json());
});
