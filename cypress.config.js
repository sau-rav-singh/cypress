import { defineConfig } from "cypress";

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  allowCypressEnv: false,
  e2e: {
    setupNodeEvents(on, config)
    {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    pageLoadTimeout: 60000,
    specPattern: 'cypress/e2e/**/*.cy.js',
  },
});