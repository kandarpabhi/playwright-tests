const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const UserPage = require('../pages/UserPage');
const { loadData } = require('../utils/dataLoader');  // Import loadData utility

// Load login data from the JSON file
const loginData = loadData('loginData.json');

// Separate valid and invalid login data
const validLoginData = loginData.filter(data => data.isValid);
const invalidLoginData = loginData.filter(data => !data.isValid);

// Test for valid login credentials with cookies and session reuse
validLoginData.forEach(data => {
  test(`Valid user login, Save cookie, Logout, and Re-login using cookie`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const userPage = new UserPage(page);

    // Step 1: Launch browser & Navigate to 'http://automationexercise.com'
    await page.goto('https://automationexercise.com/');

    // Step 2: Verify that Home Page is visible
    const homePageVisible = await page.isVisible('body');
    expect(homePageVisible).toBe(true);  // Assert that the body is visible (page is loaded successfully)

    // Step 3: Click on 'Signup / Login' button
    await page.locator('a', { hasText: 'Signup / Login' }).click();

    // Step 4: Verify 'Login to your account' is visible 
    const isLoginPageVisible = await loginPage.isLoginPageVisible();
    expect(isLoginPageVisible).toBe(true);

    // Step 5: Enter email and password from JSON file (valid credentials)
    await loginPage.login(data.email, data.password);

    // Step 6: Verify that 'Logged in as username' is visible 
    const userLoggedIn = await userPage.isUserLoggedIn();
    expect(userLoggedIn).toBe(true);

    // Step 7: Save cookies after login
    const cookies = await page.context().cookies();
    console.log("Cookies after login:", cookies);

    // Step 8: Logout the user
    await userPage.logout();

    // Step 9: Re-login using saved cookies
    await page.context().addCookies(cookies); // Add saved cookies back to the context
    await page.goto('https://automationexercise.com/'); // Reload the page to apply cookies
    await page.locator('a', { hasText: 'Signup / Login' }).click(); // Go to login page

    // Step 10: Verify user is logged in again using saved cookies
    await loginPage.login(data.email, data.password);
    const userReLoggedIn = await userPage.isUserLoggedIn();
    expect(userReLoggedIn).toBe(true);

    // Step 11: Logout again
    await userPage.logout();

    // Step 12: Close the page
    await page.close();
  });
});

// Adding delay before starting the second test case (for invalid credentials)
test.beforeEach(async ({ page }) => {
  await page.waitForTimeout(2000); 
});

// Test for invalid login credentials
invalidLoginData.forEach(data => {
  test(`Invalid user login`, async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Step 1: Launch browser & Navigate to 'http://automationexercise.com'
    await page.goto('https://automationexercise.com/');

    // Step 2: Verify that Home Page is visible
    const homePageVisible = await page.isVisible('body');
    expect(homePageVisible).toBe(true);

    // Step 3: Click on 'Signup / Login' button
    await page.locator('a', { hasText: 'Signup / Login' }).click();

    // Step 4: Verify 'Login to your account' is visible
    const isLoginPageVisible = await loginPage.isLoginPageVisible();
    expect(isLoginPageVisible).toBe(true);

    // Step 5: Enter email and password from JSON file (invalid credentials)
    await loginPage.login(data.email, data.password);

    // Step 6: Verify error message for invalid login
    await page.waitForSelector('text="Your email or password is incorrect!"', { state: 'visible', timeout: 60000 });
    const incorrectCredentialsMessage = await page.locator('text="Your email or password is incorrect!"').innerText();
    expect(incorrectCredentialsMessage).toBe('Your email or password is incorrect!');

    // Closing the page
    await page.close();
  });
});
