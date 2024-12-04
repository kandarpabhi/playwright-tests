const { test, expect } = require('@playwright/test');
const CreateAccountPage = require('../pages/CreateAccountPage');  
const { loadData } = require('../utils/dataLoader');  // Import loadData utility

// Load user data from the JSON file
const userData = loadData('userData.json');

userData.forEach(user => {
  test(`Register User and Delete Account for ${user.name}`, async ({ page }) => {  // Dynamic test name
    const createAccountPage = new CreateAccountPage(page);

    // Step 1: Launch browser & Navigate to 'http://automationexercise.com'
    await page.goto('https://automationexercise.com/');

    // Step 2: Verify that Home Page is visible
    const homePageVisible = await page.isVisible('body');
    expect(homePageVisible).toBe(true);  // Assert that the body is visible (page is loaded successfully)

    // Step 3: Click on Signup / Login button
    await page.locator('a', { hasText: 'Signup / Login' }).click();

    // Step 4: Verify 'New User Signup!' is visible
    const headingText = await page.locator('//h2[text()="New User Signup!"]').innerText();
    expect(headingText.trim()).toContain('New User Signup!');

    // Step 5: Enter Name and Email Address from JSON file
    await page.fill('input[name="name"]', user.name);
    await page.fill('[data-qa="signup-email"]', user.email);

    // Step 6: Click 'Signup' button
    await page.locator('[data-qa="signup-button"]').click();

    // Step 7: Verify 'Enter Account Information' is visible
    const enterAccountInformationVisible = await page.locator('b:text("Enter Account Information")').innerText();
    expect(enterAccountInformationVisible).toBe('ENTER ACCOUNT INFORMATION');

    // Step 8: Fill details for Create Account using userData
    await page.locator('input[value="Mr"]').click();
    await page.fill('input[id="password"]', 'test123#');
    await page.locator('select[data-qa="days"]').selectOption({ value: '15' });
    await page.locator('select[data-qa="months"]').selectOption({ value: '2' });
    await page.locator('select[data-qa="years"]').selectOption({ value: '1998' });

    // Step 9: Select checkbox 'Sign up for our newsletter!'
    await page.locator('input[name="newsletter"]').click();

    // Step 10: Select checkbox 'Receive special offers from our partners!'
    await page.locator('input[name="optin"]').click();

    // Step 11: Fill personal details
    await createAccountPage.enterPersonalDetails(
      user.firstName,
      user.lastName,
      user.company,
      user.address1,
      user.address2,
      user.state,
      user.city,
      user.zipcode,
      user.mobileNumber
    );

    // Step 12: Click 'Create Account' button
    await page.locator('button[data-qa="create-account"]').click();

    // Step 13: Verify that 'ACCOUNT CREATED!' is visible
    const accountCreatedVisible = await createAccountPage.isAccountCreatedVisible();
    expect(accountCreatedVisible).toBe(true);

    // Step 14: Click 'Continue' button
    await createAccountPage.clickContinue();

    // Step 15: Verify that 'Logged in as username' is visible
    const loggedInAsVisible = await page.isVisible('b');
    expect(loggedInAsVisible).toBe(true);

    // Step 16: Click 'Delete Account' button
    await page.locator('a[href="/delete_account"]').click();

    // Step 17: Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    const accountDeletedVisible = await page.locator('b:text("Account Deleted!")').innerText();
    expect(accountDeletedVisible).toBe('ACCOUNT DELETED!');
    await page.locator('[data-qa="continue-button"]').click();

    // Closing the page
    await page.close();
  });
});
