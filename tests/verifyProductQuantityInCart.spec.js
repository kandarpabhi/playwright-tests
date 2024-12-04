const { test, expect } = require('@playwright/test');
const ProductsPage = require('../pages/ProductsPage');

test('View product and add it to cart with correct quantity', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  // Step 1: Navigate to the homepage
  await page.goto('http://automationexercise.com');

  // Step 2: Click on "View Product"
  await productsPage.clickViewProduct();

  // Step 3: Verify product page
  await expect(page).toHaveURL(/.*product_details/);

  // Step 4: Set quantity to 4
  await productsPage.setQuantity(4);

  // Step 5: Add to cart
  await productsPage.addToCart();

  // Step 6: View cart
  await productsPage.viewCart();

  // Step 7: Verify cart
  const quantityInCart = await page.locator('button.disabled');
  await expect(quantityInCart).toHaveText('4');
});
