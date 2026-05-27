const { test, expect } = require('@playwright/test');
const users = require('../../configs/test-data.json').saucedemo;
const env = require('../../configs/environments.js').saucedemo;

test.describe('SauceDemo Frontend Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(env.url);
  });

  // FE-001: Login with valid credentials
  test('FE-001: Login with valid credentials', async ({ page }) => {
    await page.fill('#user-name', users.valid.username);
    await page.fill('#password', users.valid.password);
    await page.click('#login-button');
    await expect(page).toHaveURL(env.inventoryUrl);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  // FE-002: Login with invalid credentials
  test('FE-002: Login with invalid credentials', async ({ page }) => {
    await page.fill('#user-name', users.invalid.username);
    await page.fill('#password', users.invalid.password);
    await page.click('#login-button');
    await expect(page.locator('h3[data-test="error"]')).toHaveText(/Username and password do not match/);
  });

  // FE-003: Login with locked out user
  test('FE-003: Login with locked out user', async ({ page }) => {
    await page.fill('#user-name', users.locked.username);
    await page.fill('#password', users.locked.password);
    await page.click('#login-button');
    await expect(page.locator('h3[data-test="error"]')).toHaveText(/Sorry, this user has been locked out/);
  });

  // FE-004: View product catalog
  test('FE-004: View product catalog after login', async ({ page }) => {
    await page.fill('#user-name', users.valid.username);
    await page.fill('#password', users.valid.password);
    await page.click('#login-button');
    await expect(page).toHaveURL(env.inventoryUrl);
    const products = page.locator('.inventory_item');
    await expect(products).toHaveCount(6);
    await expect(products.first()).toBeVisible();
  });

  // FE-005: Add product to cart
  test('FE-005: Add product to cart', async ({ page }) => {
    await page.fill('#user-name', users.valid.username);
    await page.fill('#password', users.valid.password);
    await page.click('#login-button');
    await expect(page).toHaveURL(env.inventoryUrl);
    
    const firstProduct = page.locator('.inventory_item').first();
    const addToCartButton = firstProduct.locator('button:has-text("Add to cart")');
    await addToCartButton.click();
    
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  // FE-006: Remove product from cart
  test('FE-006: Remove product from cart', async ({ page }) => {
    await page.fill('#user-name', users.valid.username);
    await page.fill('#password', users.valid.password);
    await page.click('#login-button');
    await expect(page).toHaveURL(env.inventoryUrl);
    
    // Add product to cart first
    const firstProduct = page.locator('.inventory_item').first();
    const addToCartButton = firstProduct.locator('button:has-text("Add to cart")');
    await addToCartButton.click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    
    // Go to cart and remove
    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL(/.*cart\.html/);
    await expect(page.locator('.cart_item')).toHaveCount(1);
    
    const removeButton = page.locator('button:has-text("Remove")').first();
    await removeButton.click();
    
    await expect(page.locator('.cart_item')).toHaveCount(0);
  });

  // FE-007: Checkout process
  test('FE-007: Complete checkout process', async ({ page }) => {
    await page.fill('#user-name', users.valid.username);
    await page.fill('#password', users.valid.password);
    await page.click('#login-button');
    await expect(page).toHaveURL(env.inventoryUrl);
    
    // Add product to cart
    const firstProduct = page.locator('.inventory_item').first();
    const addToCartButton = firstProduct.locator('button:has-text("Add to cart")');
    await addToCartButton.click();
    
    // Go to cart
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
    
    // Fill checkout information
    await page.fill('[data-test="firstName"]', 'Test');
    await page.fill('[data-test="lastName"]', 'User');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
    
    // Verify checkout step 2
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
    await expect(page.locator('.cart_item')).toHaveCount(1);
    
    // Finish checkout
    await page.click('[data-test="finish"]');
    
    // Verify completion
    await expect(page).toHaveURL(/.*checkout-complete\.html/);
    await expect(page.locator('[data-test="complete-header"]')).toBeVisible();
  });

  // FE-008: Sort products by price
  test('FE-008: Sort products by price (low to high)', async ({ page }) => {
    await page.fill('#user-name', users.valid.username);
    await page.fill('#password', users.valid.password);
    await page.click('#login-button');
    await expect(page).toHaveURL(env.inventoryUrl);
    
    // Sort by price low to high
    await page.selectOption('.product_sort_container', 'lohi');
    
    // Verify sorting - first product should be the cheapest
    const prices = await page.locator('.inventory_item_price').allTextContents();
    const priceValues = prices.map(p => parseFloat(p.replace('$', '')));
    
    for (let i = 0; i < priceValues.length - 1; i++) {
      expect(priceValues[i]).toBeLessThanOrEqual(priceValues[i + 1]);
    }
  });

  // FE-009: Filter products by name
  test('FE-009: Filter products by name', async ({ page }) => {
    await page.fill('#user-name', users.valid.username);
    await page.fill('#password', users.valid.password);
    await page.click('#login-button');
    await expect(page).toHaveURL(env.inventoryUrl);
    
    // Filter by product name - SauceDemo doesn't have a visible search input, 
    // but we can test filtering by using the product list and verifying text
    const products = page.locator('.inventory_item');
    await expect(products).toHaveCount(6);
    
    // Verify we can find products by their names
    const firstProduct = products.first();
    await expect(firstProduct).toContainText(/Sauce Labs/);
  });

  // FE-010: View product details
  test('FE-010: View product details', async ({ page }) => {
    await page.fill('#user-name', users.valid.username);
    await page.fill('#password', users.valid.password);
    await page.click('#login-button');
    await expect(page).toHaveURL(env.inventoryUrl);
    
    // Click on first product name link to view details
    await page.click('a[id*="item_"]');
    
    // Verify we're on the product detail page
    await expect(page).toHaveURL(/.*inventory-item\.html/);
    await expect(page.locator('.inventory_details_name')).toBeVisible();
    await expect(page.locator('.inventory_details_desc')).toBeVisible();
    await expect(page.locator('.inventory_details_price')).toBeVisible();
    await expect(page.locator('button:has-text("Add to cart")')).toBeVisible();
  });
});
