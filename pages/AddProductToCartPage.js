class AddProductToCartPage {
  constructor(page) {
    this.page = page;
    // Locator for the product
    this.productLink = page.locator('.single-products');
    // More specific overlay locator for the first product
    this.overlay = page.locator('.single-products .product-overlay');
    // Add to cart button within the overlay (targeting product with ID 1)
    this.addToCartButton = this.overlay.locator('a[data-product-id="1"]');
    // View Cart button
    this.viewCartButton = page.locator('u:has-text("View Cart")');
    // Locator for the "View Product" button of the first product
    this.viewProductButton = page.locator('.product-overlay .overlay-content a');
    // Product name in the cart (verify cart)
    this.cartProductName = page.locator('a[href="/product_details/1"]');
  }

  // Navigate to the products page
  async goToProductsPage() {
    await this.page.locator('a[href="/products"]').click();
  }

  // Scroll down the page by 500px
  async scrollDown() {
    await this.page.evaluate(() => {
      window.scrollBy(0, 500);
    });
  }

  // Add the first product to the cart by hovering and clicking 'Add to cart'
  async addFirstProductToCart() {
    await this.productLink.first().hover(); // Hover over the first product
    await this.overlay.first().waitFor({ state: 'visible' }); // Ensure overlay for the first product is visible
    await this.addToCartButton.click(); // Click 'Add to Cart'
  }

  // Click the 'View Product' button for the first product
  async viewProductDetails() {
    await this.viewProductButton.first().click(); // Click the first 'View Product' button
  }

  // Click 'View Cart' button
  async viewCart() {
    await this.viewCartButton.click();
  }

  // Get product names in the cart
  async getCartProductName() {
    return await this.cartProductName.allTextContents(); // Get all text contents of the product name in the cart
  }

  // Check if a specific product is in the cart
  async isProductInCart(productName) {
    const productNames = await this.getCartProductName();
    return productNames.some(name => name.includes(productName)); // Check if the product name matches
  }

  // Check if a specific product is NOT in the cart
  async isProductNotInCart(productName) {
    const productNames = await this.getCartProductName();
    return !productNames.some(name => name.includes(productName)); // Check if the product name does NOT match
  }
}

module.exports = AddProductToCartPage;
