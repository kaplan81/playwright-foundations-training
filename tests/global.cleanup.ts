import { test as setup } from '@playwright/test';

setup('Cleanup', async ({ page }) => {
  console.log('cleanup');
});
