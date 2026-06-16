const { test, expect } = require('@playwright/test');

test.describe('Inventory page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory');
    // Wait for data to finish loading before each test
    await expect(page.getByText('32 SKUs')).toBeVisible();
  });

  test('displays stock table with data', async ({ page }) => {
    const table = page.getByRole('table').first();
    await expect(table).toBeVisible();
    // Header columns
    await expect(table.getByRole('columnheader', { name: 'SKU' })).toBeVisible();
    await expect(table.getByRole('columnheader', { name: 'Item Name' })).toBeVisible();
    await expect(table.getByRole('columnheader', { name: 'Status' })).toBeVisible();
  });

  test('shows 32 SKUs by default', async ({ page }) => {
    await expect(page.getByText('32 SKUs')).toBeVisible();
    const rows = page.getByRole('table').first().getByRole('row');
    // 32 data rows + 1 header row
    await expect(rows).toHaveCount(33);
  });

  test('search filters the table rows', async ({ page }) => {
    const search = page.getByPlaceholder('Search by item name...');
    await search.fill('PCB');
    const rows = page.getByRole('table').first().getByRole('row');
    // 3 PCB items + 1 header
    await expect(rows).toHaveCount(4);
    await expect(page.getByText('PCB Assembly', { exact: false }).first()).toBeVisible();
  });

  test('search is case-insensitive', async ({ page }) => {
    const search = page.getByPlaceholder('Search by item name...');
    await search.fill('sensor');
    const rows = page.getByRole('table').first().getByRole('row');
    // Should show sensor items
    await expect(rows).not.toHaveCount(1); // more than header only
  });

  test('clearing search restores all rows', async ({ page }) => {
    const search = page.getByPlaceholder('Search by item name...');
    await search.fill('PCB');
    await search.clear();
    const rows = page.getByRole('table').first().getByRole('row');
    await expect(rows).toHaveCount(33);
  });

  test('category filter shows only matching items', async ({ page }) => {
    const categoryFilter = page.locator('.filter-group').filter({ hasText: 'Category' }).locator('select');
    await categoryFilter.selectOption('Circuit Boards');
    const rows = page.getByRole('table').first().getByRole('row');
    // 3 circuit board items + header
    await expect(rows).toHaveCount(4);
    const cells = page.getByRole('cell', { name: 'Circuit Boards' });
    await expect(cells).toHaveCount(3);
  });

  test('status badges render for low-stock items', async ({ page }) => {
    const lowStockBadges = page.getByText('Low Stock');
    await expect(lowStockBadges).not.toHaveCount(0);
  });
});
