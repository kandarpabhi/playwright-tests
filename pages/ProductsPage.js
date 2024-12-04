// ProductsPage.js

class ProductsPage {
  constructor(page) {
    this.page = page;
    // Locator for 'Products' button
    this.productsButton = page.locator('a[href="/products"]');
    // Locator for search input field
    this.searchInput = page.locator('input#search_product');
    // Locator for the search button
    this.searchButton = page.locator('i.fa-search');
    // Locator for the 'SEARCHED PRODUCTS' heading
    this.searchedProductsHeading = page.locator('h2.title.text-center');
    // Locator for searched products (example for the first product)
    this.productLocator = page.locator('.productinfo');
    // Locator for 'View Product' button (modify this if necessary)
    this.viewProductButton = page.locator('a[href^="/product_details/"]'); // Updated locator for "View Product" button
    // Locator for the quantity input field
    this.quantityInput = page.locator('#quantity'); 
    // Locator for the "Add to Cart" button
    this.addToCartButton = page.locator('button.btn.btn-default.cart');
    // Locator for the "View Cart" button
    this.viewCartButton = page.locator('u', { hasText: 'View Cart' });
  }

  // Method to navigate to the Products page
  async goToProductsPage() {
    await this.page.goto('http://automationexercise.com');  // Navigate to homepage
    await this.productsButton.click();  // Click on the 'Products' button
  }

  // Method to search for a product
  async searchForProduct(productName) {
    await this.searchInput.fill(productName);  // Fill the search field with product name
    await this.searchButton.click();  // Click the search button
  }

  // Method to verify if the 'SEARCHED PRODUCTS' heading is visible
  async verifySearchedProductsHeading() {
    await this.searchedProductsHeading.waitFor({ state: 'visible' });  // Wait for the heading to be visible
  }

  // Method to verify if the searched product is visible
  async verifySearchedProductIsVisible() {
    await this.productLocator.first().waitFor({ state: 'visible' });  // Verify that the first product is visible
  }

  // Method to click on the "View Product" button for the first product
  async clickViewProduct() {
    await this.viewProductButton.first().click(); // Click on the "View Product" button for the first product
  }

  // Method to set the quantity for the product
  async setQuantity(quantity) {
    await this.quantityInput.fill(quantity.toString()); // Set the quantity to the given value
  }

  // Method to click the "Add to Cart" button
  async addToCart() {
    await this.addToCartButton.click(); // Click the "Add to Cart" button
  }

  // Method to click the "View Cart" button
  async viewCart() {
    await this.viewCartButton.click(); // Click the "View Cart" button
  }
}

module.exports = ProductsPage;
