class ContactUsPage {
    constructor(page) {
      this.page = page;
      // Locators for the Contact Us page elements
      this.nameInput = page.locator('input[name="name"]');
      this.emailInput = page.locator('input[name="email"]');
      this.subjectInput = page.locator('input[name="subject"]');
      this.messageTextarea = page.locator('textarea[name="message"]');
      this.submitButton = page.locator('input[type="submit"]');
      this.successMessage = page.locator('.status.alert.alert-success');
      this.fileInput = page.locator('input[type="file"]');
      this.contactUsLink = page.locator('a[href="/contact_us"]');
    }
  
    // Navigate to the Contact Us page
    async navigateToContactPage() {
      await this.contactUsLink.click();
    }
  
    // Fill out the Contact Us form
    async fillContactForm(name, email, subject, message) {
      await this.nameInput.fill(name);
      await this.emailInput.fill(email);
      await this.subjectInput.fill(subject);
      await this.messageTextarea.fill(message);
    }
  
    // Upload a file to the contact form (if needed)
    async uploadFile(filePath) {
      await this.fileInput.setInputFiles(filePath);
    }
  
    // Submit the form
    async submitForm() {
      await this.submitButton.click();
    }
  
    // Verify the success message after form submission
    async verifySuccessMessage() {
      await this.successMessage.waitFor({ state: 'visible' });
    }
  }
  
  module.exports = ContactUsPage;
  