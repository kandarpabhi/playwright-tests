class CheckoutPage {
    constructor(page) {
        this.page = page;

        // Locators for the delivery address section
        this.deliveryAddressSection = page.locator('#address_delivery');
        this.deliveryFirstName = this.deliveryAddressSection.locator('li.address_firstname.address_lastname');
        this.deliveryStreet = this.deliveryAddressSection.locator('li.address_address1.address_address2');
        this.deliveryCityStatePostcode = this.deliveryAddressSection.locator('li.address_city.address_state_name.address_postcode');
        this.deliveryCountry = this.deliveryAddressSection.locator('li.address_country_name');

        // Locators for the billing address section
        this.billingAddressSection = page.locator('#address_invoice');
        this.billingFirstName = this.billingAddressSection.locator('li.address_firstname.address_lastname');
        this.billingStreet = this.billingAddressSection.locator('li.address_address1.address_address2');
        this.billingCityStatePostcode = this.billingAddressSection.locator('li.address_city.address_state_name.address_postcode');
        this.billingCountry = this.billingAddressSection.locator('li.address_country_name');

        // Other locators for the checkout process
        this.proceedToCheckoutButton = page.locator('a.btn.btn-default.check_out');
        this.orderCommentInput = page.locator('textarea.form-control[name="message"]');
        this.placeOrderButton = page.locator('a.btn.btn-default.check_out[href="/payment"]');
        this.paymentForm = page.locator('#payment_form');
        this.orderSuccessMessage = page.locator('p:has-text("Congratulations! Your order has been confirmed!")');
    }

    // Proceed to checkout
    async proceedToCheckout() {
        await this.proceedToCheckoutButton.click();
        await this.page.waitForURL('**/checkout**', { timeout: 10000 });
    }

    // Verify if Address Details text is visible
    async verifyAddressDetailText() {
        const addressDetailsHeading = this.page.locator('h2.heading:has-text("Address Details")');
        await addressDetailsHeading.waitFor({ state: 'visible', timeout: 5000 });
        const isVisible = await addressDetailsHeading.isVisible();
        return isVisible;
    }

    // Enter Order Comment
    async enterOrderComment(comment) {
        await this.orderCommentInput.fill(comment);
    }

    // Place the order
    async placeOrder() {
        await this.placeOrderButton.click();
    }

    // Enter Payment Details
    async enterPaymentDetails(cardHolderName, cardNumber, expMonth, expYear, cvv) {
        await this.page.locator('input[data-qa="name-on-card"]').fill(cardHolderName);
        await this.page.locator('input[name="card_number"]').fill(cardNumber);
        await this.page.locator('input[data-qa="expiry-month"]').fill(expMonth);
        await this.page.locator('input[name="expiry_year"]').fill(expYear);
        await this.page.locator('input[data-qa="cvc"]').fill(cvv);
    }

    // Confirm Payment
    async confirmPayment() {
        await this.page.locator('button[data-qa="pay-button"]').click();
    }

    // Verify Order Success
    async verifyOrderSuccess() {
        try {
            // Wait for page load or stable state before checking for the success message
            await this.page.waitForLoadState('load');  // Ensure the page has fully loaded
            await this.orderSuccessMessage.waitFor({ state: 'visible', timeout: 5000 });

            const confirmationMessage = await this.orderSuccessMessage.textContent();
            console.log('Confirmation Message:', confirmationMessage);  // Log the confirmation message for debugging
            return confirmationMessage;
        } catch (e) {
            console.error('Error while verifying order success:', e);
            throw e;  // Rethrow error for visibility in test results
        }
    }
    async getFullName() {
        // Use a more specific selector to avoid ambiguity
        const fullNameText = await this.page.locator('#address_delivery li.address_firstname.address_lastname').innerText();
        return fullNameText;  // Return the full name text for further assertion in the test
    }
    
    
    }



module.exports = CheckoutPage;
