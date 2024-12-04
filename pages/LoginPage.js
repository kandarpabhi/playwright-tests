// tests/POM/pages/LoginPage.js

class LoginPage{
    constructor(page) {
    this.page=page;
    this.emailInput = page.locator('input[data-qa="login-email"]'); // Login email input
    this.passwordInput = page.locator('input[data-qa="login-password"]'); // Password input
    this.loginButton = page.locator('button[data-qa="login-button"]'); // Login button
    this.loginToAccountText = page.locator('//h2[text()="Login to your account"]'); // Login header

    }

      // Method to fill login form and submit
        async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }


  // Verify if the "Login to your account" section is visible
  async isLoginPageVisible() {
    const loginToAccountText = await this.loginToAccountText.innerText();
    return loginToAccountText.trim().includes('Login to your account');
  }


}
// Export the LoginPage class as default export
module.exports = LoginPage;
