import {
  Browser,
  chromium,
  firefox,
  Page,
  test,
  webkit,
} from '@playwright/test';

test('Browser support demo', async () => {
  for (const browswerType of [chromium, webkit, firefox]) {
    const browserName = browswerType.name();
    console.log('Running', browserName);
    const browser: Browser = await browswerType.launch();
    const page: Page = await browser.newPage();
    await page.goto('https://www.whatsmybrowser.org/');
    await page.screenshot({ path: `pw-${browserName}.png` });
    await page.close();
    await browser.close();
  }
});
