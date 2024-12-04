// tests/POM/pages/UserPage.js

class UserPage {
    constructor(page) {
      this.page = page;
      this.loggedInUserElement = page.locator('b'); // "Logged in as" text
      this.logoutButton = page.locator('a[href="/logout"]'); // Logout button
    }
  
    // Verify if the user is logged in by checking if the user's name is visible
    async isUserLoggedIn() {
      await this.page.waitForSelector('b', { state: 'visible', timeout: 60000 });
      return await this.loggedInUserElement.isVisible();
    }
  
    // Method to log out the user
    async logout() {
      await this.logoutButton.click();
    }
  }
  // Export the UserPage class as default export
module.exports = UserPage;

  