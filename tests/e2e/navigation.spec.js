const { test, expect } = require('@playwright/test');

test.describe('Navigation', () => {
  test('Overview page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Overview' })).toHaveClass(/active/);
  });

  test('Inventory page loads', async ({ page }) => {
    await page.goto('/inventory');
    await expect(page.getByRole('heading', { name: 'Inventory' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Inventory' })).toHaveClass(/active/);
  });

  test('Orders page loads', async ({ page }) => {
    await page.goto('/orders');
    await expect(page.getByRole('heading', { level: 2 })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Orders' })).toHaveClass(/active/);
  });

  test('Finance page loads', async ({ page }) => {
    await page.goto('/spending');
    await expect(page.getByRole('heading', { level: 2 })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Finance' })).toHaveClass(/active/);
  });

  test('Reports page loads', async ({ page }) => {
    await page.goto('/reports');
    await expect(page.getByRole('heading', { name: 'Performance Reports' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Reports' })).toHaveClass(/active/);
  });

  test('clicking nav links changes active state', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Inventory' }).click();
    await expect(page).toHaveURL(/\/inventory/);
    await expect(page.getByRole('link', { name: 'Inventory' })).toHaveClass(/active/);
    await expect(page.getByRole('link', { name: 'Overview' })).not.toHaveClass(/active/);
  });
});
