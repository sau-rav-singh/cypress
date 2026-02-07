import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config)
    {
      // implement node event listeners here
    },
    defaultCommandTimeout: 10000, // Sets global timeout to 10 seconds
    requestTimeout: 15000,        // Timeout for cy.request()
    pageLoadTimeout: 60000,       // Timeout for page transitions
  },
});
