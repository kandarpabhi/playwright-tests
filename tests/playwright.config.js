// tests/playwright.config.js (if placed inside the 'tests' folder)
module.exports = {
    timeout: 60000, // Set the global timeout to 60 seconds
    use: {
      headless: false, // Run in headed mode (with browser UI)
      baseURL: 'https://automationexercise.com', // Optional base URL
    },
  };
  