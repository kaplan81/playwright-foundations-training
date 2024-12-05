import { expect, test } from '@playwright/test';

const people: string[] = ['Alice', 'Bob'];

for (const name of people) {
  test(`Testing ${name}`, async ({ page }) => {
    console.log(name);
  });
}

const map1 = new Map();
map1.set(2, 20);
map1.set(3, 30);

for (const [key, value] of map1) {
  test(`Testing 10x function with ${key} & ${value}`, async ({ page }) => {
    expect(key * 10).toEqual(value);
  });
}

const inputs = [
  ['a', 1, 2],
  ['b', 3, 4],
  ['c', 5, 6],
];

for (const [a, b, c] of inputs) {
  test(`Testing with ${a} ${b} ${c}`, async ({ page }) => {
    console.log(a, b, c);
  });
}

const inputs2: string[][] = [
  ['10', '6 Months', 'After 6 Months you will earn $0.20 on your deposit'],
  ['20', '1 Year', 'After 1 Year you will earn $1.00 on your deposit'],
];

for (const [sum, period, result] of inputs2) {
  test(`Testing ${sum} ${period} ${result}`, async ({ page }) => {
    await page.goto('/savings.html');
    await page.getByTestId('deposit').fill(sum as string);
    await page.getByTestId('period').selectOption(period as string);
    await expect(page.getByTestId('result')).toHaveText(result as string);
  });
}
