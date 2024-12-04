// tests/POM/pages/CreateAccountPage.js

class CreateAccountPage {
    constructor(page) {
      this.page = page;
      this.accountCreatedText = page.locator('b:text("Account Created!")');
      this.continueButton = page.locator('[data-qa="continue-button"]');
      this.firstNameInput = page.locator('input[name="first_name"]');
      this.lastNameInput = page.locator('input[name="last_name"]');
      this.companyInput = page.locator('input[name="company"]');
      this.address1Input = page.locator('input[id="address1"]');
      this.address2Input = page.locator('input[id="address2"]');
      this.stateInput = page.locator('input[id="state"]');
      this.cityInput = page.locator('input[id="city"]');
      this.zipcodeInput = page.locator('input[id="zipcode"]');
      this.mobileNumberInput = page.locator('input[id="mobile_number"]');
    }
  
    async enterPersonalDetails(firstName, lastName, company, address1, address2, state, city, zipcode, mobileNumber) {
      await this.firstNameInput.fill(firstName);
      await this.lastNameInput.fill(lastName);
      await this.companyInput.fill(company);
      await this.address1Input.fill(address1);
      await this.address2Input.fill(address2);
      await this.stateInput.fill(state);
      await this.cityInput.fill(city);
      await this.zipcodeInput.fill(zipcode);
      await this.mobileNumberInput.fill(mobileNumber);
    }
  
    async isAccountCreatedVisible() {
      return await this.accountCreatedText.isVisible();
    }
  
    async clickContinue() {
      await this.continueButton.click();
    }
  }
  
  module.exports = CreateAccountPage;