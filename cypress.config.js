import { defineConfig } from "cypress";
const ExcelJS = require("exceljs");
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
      on("task", {
        async readExcelJS(filePath)
        {
          const workbook = new ExcelJS.Workbook();
          await workbook.xlsx.readFile('cypress/fixtures/' + filePath);

          const worksheet = workbook.getWorksheet(1); // Get first sheet
          const rows = [];

          // Iterate through rows and build a JSON object
          worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) =>
          {
            rows.push(row.values);// Note: row.values returns an array where index 1 is column A
          });
          return rows;
        },
      });
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