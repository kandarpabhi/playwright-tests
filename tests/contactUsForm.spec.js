const { test, expect } = require('@playwright/test');
const path = require('path');
const ContactUsPage = require('../pages/ContactUsPage');
const { loadData } = require('../utils/dataLoader');

// Load contact form data from the JSON file
const contactFormData = loadData('testData.json');

test.describe('Submit contact form and handle JS alerts', () => {

  // Set up a listener for dialogs (JS Alerts, Confirms)
  test.beforeEach(async ({ page }) => {
    page.on('dialog', async dialog => {
      console.log(dialog.message()); 
      await dialog.accept();  // Accept (click "OK") for alerts and confirms
    });
  });

  // Iterate over each data entry in the JSON file
  contactFormData.forEach(data => {
    test(`Submit contact form for ${data.name}`, async ({ page }) => {

      const contactUsPage = new ContactUsPage(page);

      // Step 1: Navigate to the homepage
      await page.goto('http://automationexercise.com');

      // Step 2: Click on "Contact Us" link
      await contactUsPage.navigateToContactPage();

      // Step 3: Fill out the contact form slowly
      await contactUsPage.fillContactForm(data.name, data.email, data.subject, data.message);

      // Add delay after filling out the form
      await page.waitForTimeout(1000);  // Wait 1 second after filling out the form

      // Step 4: Upload a file 
      const filePath = path.resolve(__dirname, '..', 'data', 'ImageToUpload.jpg');
      await contactUsPage.uploadFile(filePath);  // Upload file to the form

      // Add delay after file upload
      await page.waitForTimeout(1000);  // Wait 1 second after uploading the file

      // Step 5: Submit the form with a delay after clicking submit button
      await contactUsPage.submitForm();
      await page.waitForTimeout(2000);  // Wait 2 seconds after clicking submit 

      // Step 6: Wait for the success message
      await contactUsPage.verifySuccessMessage();

      // Verify the exact success message text
      const successMessage = page.locator('.status.alert.alert-success');
      const successMessageText = await successMessage.textContent();
      expect(successMessageText).toContain('Success! Your details have been submitted successfully.');

      // Closing the page
      await page.close();
    });
  });
});
