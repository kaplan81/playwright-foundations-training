import { Download, expect, test } from '@playwright/test';
import fs from 'fs';

/**
 * This test gets stuck if the file can be previewed
 * e.g. a `*.pdf` file.
 *
 * unlesss! we run the test headless.
 *
 * If the file is e.g a `*.zip` the download event
 * does get triggered both in headed and headless mode.
 */
test('Download a single file and assert', async ({ page }) => {
  await page.goto('/savings.html');
  const downloadEvent: Promise<Download> = page.waitForEvent('download');
  await page.getByText('Download Our Offer').click();
  const download: Download = await downloadEvent;

  const suggestedFileName: string = download.suggestedFilename();
  const filePath = `download/${suggestedFileName}`;
  await download.saveAs(filePath);
  expect(await download.failure()).toBeNull();

  expect(fs.existsSync(filePath)).toBeTruthy();

  const fileSizeInBytes = fs.statSync(filePath).size;
  console.log(fileSizeInBytes);
  expect(fileSizeInBytes).toBeLessThan(20_000);
});

test('Upload', async ({ page }) => {
  await page.goto('/loans.html');

  const uploadInput = page.locator('input[type="file"]');
  await uploadInput.setInputFiles(['download/dummy.pdf']);

  // clear
  await uploadInput.setInputFiles([]);
});
