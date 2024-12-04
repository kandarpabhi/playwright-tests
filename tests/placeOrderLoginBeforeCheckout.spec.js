const { test, expect } = require('@playwright/test');
const CheckoutPage = require('../pages/CheckoutPage');
const LoginPage = require('../pages/LoginPage');
const AddProductToCartPage = require('../pages/AddProductToCartPage');
const { loadData } = require('../utils/dataLoader');

// Load login data from JSON file
const loginData = loadData('loginData.json');
const validUser = loginData.find(user => user.isValid);

test('Checkout Process and Order Placement', async ({ page }) => {

    const checkoutPage = new CheckoutPage(page);
    const addProductToCartPage = new AddProductToCartPage(page);
    const loginPage = new LoginPage(page);  // Initialize loginPage here

    // Step 1: Launch browser & Navigate to 'http://automationexercise.com'
    await page.goto('https://automationexercise.com/');

    // Step 2: Verify that Home Page is visible
    const homePageVisible = await page.isVisible('body');
    expect(homePageVisible).toBe(true);  // Assert that the body is visible (page is loaded successfully)

    // Step 3: Click on 'Signup / Login' button
    await page.locator('a', { hasText: 'Signup / Login' }).click();

    // Step 4: Enter email and password from JSON file using POM method
    await loginPage.login(validUser.email, validUser.password);  // Correctly use validUser

    // Step 6: Go to Products page, click on product, and add it to the cart
    await addProductToCartPage.goToProductsPage();
    await addProductToCartPage.scrollDown();
    await addProductToCartPage.productLink.first().click();
    await addProductToCartPage.viewProductDetails();
    const productName = await addProductToCartPage.productLink.first().textContent();
    await addProductToCartPage.addFirstProductToCart();
    await addProductToCartPage.viewCart();

    // Step 7: Proceed to checkout
    await checkoutPage.proceedToCheckout();

    // Step 8: Verify if Address Details are there
    const isAddressDetailVisible = await checkoutPage.verifyAddressDetailText();
    console.log('Is Address Details Text On Page?', isAddressDetailVisible);  // Log result
    expect(isAddressDetailVisible).toBe(true);

    // Scroll down the page to bring the order comment section into view
    await page.evaluate(() => {
        window.scrollBy(0, 500);  // You can adjust the scroll amount as needed
    });

    // Wait for the order comment input to be visible with an increased timeout
    try {
        await checkoutPage.orderCommentInput.waitFor({ state: 'visible', timeout: 10000 }); // Increased timeout
    } catch (e) {
        console.error("Order Comment Input did not appear in time", e);
        throw e; // Rethrow the error for visibility in test results
    }

    // Step 9: Enter Order Comment
    await checkoutPage.enterOrderComment('order placed');

    // Step 10: Place Order
    await checkoutPage.placeOrder();

    // Step 11: Enter Payment Details
    await checkoutPage.enterPaymentDetails('Abhishek Kandarp', '1122112211221122', '05', '2029', '322');

    // Step 12: Confirm and Pay
    await checkoutPage.confirmPayment();

    // Step 13: Verify success message
    const confirmationMessage = await checkoutPage.verifyOrderSuccess();
    expect(confirmationMessage).toContain('Congratulations! Your order has been confirmed!');
});
