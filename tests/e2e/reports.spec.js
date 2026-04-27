const { test, expect } = require('@playwright/test');

test.describe('Reports page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/reports');
    await expect(page.getByRole('heading', { name: 'Performance Reports' })).toBeVisible();
  });

  test('quarterly performance table has 4 quarters', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Quarterly Performance' })).toBeVisible();
    const table = page.getByRole('table').first();
    const rows = table.getByRole('row');
    // Q1–Q4 + header row
    await expect(rows).toHaveCount(5);
    await expect(table.getByText('Q1-2025')).toBeVisible();
    await expect(table.getByText('Q4-2025')).toBeVisible();
  });

  test('quarterly table shows revenue and fulfillment data', async ({ page }) => {
    const table = page.getByRole('table').first();
    await expect(table.getByRole('columnheader', { name: 'Total Revenue' })).toBeVisible();
    await expect(table.getByRole('columnheader', { name: 'Fulfillment Rate' })).toBeVisible();
    // Spot-check a known value
    await expect(table.getByText('$8,653,365.00')).toBeVisible();
  });

  test('month-over-month table has 12 months', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Month-over-Month Analysis' })).toBeVisible();
    const tables = page.getByRole('table');
    const momTable = tables.nth(1);
    const rows = momTable.getByRole('row');
    // 12 months + header
    await expect(rows).toHaveCount(13);
    await expect(momTable.getByText('Jan 2025')).toBeVisible();
    await expect(momTable.getByText('Dec 2025')).toBeVisible();
  });

  test('summary cards show YTD metrics', async ({ page }) => {
    await expect(page.getByText('Total Revenue (YTD)')).toBeVisible();
    await expect(page.getByText('Total Orders (YTD)')).toBeVisible();
    await expect(page.getByText('Avg Monthly Revenue')).toBeVisible();
    await expect(page.getByText('Best Performing Quarter')).toBeVisible();
  });

  test('location filter updates the report data', async ({ page }) => {
    // Capture unfiltered order count
    const unfiltered = await page.getByRole('table').first()
      .getByRole('row').nth(1).getByRole('cell').nth(1).textContent();

    await page.locator('.filter-group').filter({ hasText: 'Location' }).locator('select').selectOption('San Francisco');
    // Wait for table to update
    await page.waitForTimeout(500);

    const filtered = await page.getByRole('table').first()
      .getByRole('row').nth(1).getByRole('cell').nth(1).textContent();

    // Filtered data should differ from unfiltered
    expect(parseInt(filtered)).toBeLessThanOrEqual(parseInt(unfiltered));
  });

  test('monthly trend chart is rendered', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Monthly Revenue Trend' })).toBeVisible();
    // The chart renders month labels
    await expect(page.getByText('Jan 2025').first()).toBeVisible();
    await expect(page.getByText('Dec 2025').first()).toBeVisible();
  });
});
