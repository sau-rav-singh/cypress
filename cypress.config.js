import { defineConfig } from "cypress";

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  env: {
  },
  allowCypressEnv: false,
  e2e: {
    baseUrl: "https://rahulshettyacademy.com",
    setupNodeEvents(on, config)
    {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    defaultCommandTimeout: 5000,
    requestTimeout: 15000,
    pageLoadTimeout: 60000,
    specPattern: 'cypress/e2e/**/*.cy.js',
  },
});