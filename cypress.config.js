const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://automationintesting.online",
    supportFile: "cypress/support/e2e.js",
  },
});
