const { test, expect } = require('@playwright/test');
const ProductsPage = require('../pages/ProductsPage');  // Import ProductsPage class

test('Search for products and verify visibility', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Step 1: Launch browser and navigate to URL 'http://automationexercise.com'
    await page.goto('http://automationexercise.com');
    
    // Step 2: Verify that home page is visible successfully
    const homePageVisible = await page.isVisible('body');
    expect(homePageVisible).toBe(true);  // Assert that the body is visible 

    // Step 3: Click on 'Products' button
    await page.locator('a[href="/products"]').click(); 
    
    // Step 4: Verify user is navigated to 'ALL PRODUCTS' page successfully
    // Verify that the URL contains '/products'
    await expect(page).toHaveURL(/.*\/products/); // Assert that the URL contains '/products'

    // Step 5: Enter product name 'dress' in the search input and click the search button
    await productsPage.searchForProduct('dress');  // Search for 'dress'
    
    // Step 6: Verify that the 'SEARCHED PRODUCTS' heading is visible
    const searchedProductsHeading = page.locator('h2.title.text-center');
    await expect(searchedProductsHeading).toBeVisible();  // Assert that 'Searched Products' heading is visible

    // Step 7: Verify that the products related to the search are visible
    const searchResults = page.locator('.single-products');
    const productCount = await searchResults.count();
    expect(productCount).toBeGreaterThan(0);  // Assert that at least one product is displayed
});
