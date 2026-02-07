import { defineConfig } from "cypress";
import repoPlugin from 'cypress-mochawesome-reporter/plugin';

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  env: {
    username: "rahulshettyacademy",
    password: "Learning@830$3mK2"
  },
  e2e: {
    baseUrl: "https://rahulshettyacademy.com",
    setupNodeEvents(on, config)
    {
      repoPlugin(on);
    },
    defaultCommandTimeout: 5000,
    requestTimeout: 15000,
    pageLoadTimeout: 60000,
    specPattern: 'cypress/e2e/**/*.cy.js',
  },
});