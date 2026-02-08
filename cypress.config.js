import { defineConfig } from "cypress";
import repoPlugin from 'cypress-mochawesome-reporter/plugin';

export default defineConfig({
  allowCypressEnv: false,
  projectId: "xax378",
  reporter: 'cypress-mochawesome-reporter',
  // This prevents the requests from even being made/logged
  blockHosts: ["*google-analytics.com", "*segment.io"],
  env: {
    username: "rahulshettyacademy",
    password: "Learning@830$3mK2"
  },
  expose: {
    PLUGIN_CONFIG: 'value1',
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
  retries: {
    runMode: 1,
    openMode: 0,
  },
  viewportWidth: 1366,
  viewportHeight: 720,
});