const { test, expect } = require('@playwright/test');

const AddProductToCartPage=require('../pages/AddProductToCartPage');
const { loadData } = require('../utils/dataLoader');  // Import loadData utility

// Load product data from the JSON file
const productData = loadData('productData.json');

productData.forEach(product => {
  test(`Add ${product.productName} to cart`, async ({ page }) => {
    const addProductToCartPage = new AddProductToCartPage(page);

// Step 1: Launch browser & Navigate to 'http://automationexercise.com'
await page.goto('https://automationexercise.com/');


    // Step 2: Click on Product
    await addProductToCartPage.goToProductsPage(); // Go to Products page

    // Step 3: Verify that home page is visible successfully
    const homePageVisible = await page.isVisible('body');
    expect(homePageVisible).toBe(true); // Assert that the body is visible (page is loaded successfully)

    // Step 3: Scroll down the page
    await addProductToCartPage.scrollDown();

    // Step 4: Add the product to the cart
    await addProductToCartPage.addFirstProductToCart();

    // Step 5: Click 'View Cart' button
    await addProductToCartPage.viewCart();

    // Step 6: Verify that the product is present in the cart
    const isProductInCart = await addProductToCartPage.isProductInCart(product.productName);
    expect(isProductInCart).toBe(true); // Assert that the product is in the cart

    // Step 7: Verify that a different product is not in the cart
    const isProductNotInCart = await addProductToCartPage.isProductNotInCart('Red Top');
    expect(isProductNotInCart).toBe(true); // Assert that 'Red Top' is not in the cart
  });
});
