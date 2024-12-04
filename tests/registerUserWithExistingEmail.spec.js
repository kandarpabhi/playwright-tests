const { test, expect } = require('@playwright/test');
const { loadData } = require('../utils/dataLoader');  // Import loadData utility

// Load login data from the JSON file
const loginData = loadData('loginData.json');

// Fetch the first user from the loginData JSON 
const existingUser = loginData[0]; // Get the first user from the file

test('Register User with existing email', async ({ page }) => {
  // Step 1: Launch browser
  // Step 2: Navigate to url 'http://automationexercise.com'
  await page.goto('https://automationexercise.com/');

  // Step 3: Verify that home page is visible successfully
  const homePageVisible = await page.isVisible('body');
  expect(homePageVisible).toBe(true);  // Assert that the body is visible (page is loaded successfully)

  // Step 4: Click on 'Signup / Login' button
  await page.locator('a', { hasText: 'Signup / Login' }).click();

  // Step 5: Verify 'New User Signup!' is visible
  const headingText = await page.locator('//h2[text()="New User Signup!"]').innerText();
  expect(headingText.trim()).toContain('New User Signup!');

  // Step 6: Enter name and already registered email address (using the existing data from loginData.json)
  await page.fill('input[name="name"]', existingUser.name || "Abhishek");  // Using existing user name from loginData.json
  await page.fill('[data-qa="signup-email"]', existingUser.email);  // Use the email from the existingUser object

  // Step 7: Click 'Signup' button
  await page.locator('[data-qa="signup-button"]').click();

  // Step 8: Verify error 'Email Address already exist!' is visible
  const errorMessage = await page.locator('p', { hasText: 'Email Address already exist!' }).innerText();
  expect(errorMessage).toBe('Email Address already exist!');
  
  // Closing the page
  await page.close();
});

