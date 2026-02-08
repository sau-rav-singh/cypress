import { defineConfig } from "cypress";
const ExcelJS = require("exceljs");
import repoPlugin from 'cypress-mochawesome-reporter/plugin';
const fs = require('fs');
const path = require('path');

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
      on("task", {
        async createJsonFromExcel(filePath)
        {
          const workbook = new ExcelJS.Workbook();
          await workbook.xlsx.readFile('cypress/fixtures/' + filePath);

          const processedSheets = [];

          workbook.eachSheet((worksheet) =>
          {
            const sheetName = worksheet.name;
            const jsonData = [];
            let headers = [];

            worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) =>
            {
              // row.values returns [empty, col1, col2...]
              const rowValues = row.values.slice(1);

              if (rowNumber === 1)
              {
                // Identify the headers from the first row
                headers = rowValues;
              } else
              {
                // Map each cell to its corresponding header
                const rowObject = {};
                headers.forEach((header, index) =>
                {
                  rowObject[header] = rowValues[index] !== undefined ? rowValues[index] : null;
                });
                jsonData.push(rowObject);
              }
            });

            const jsonFileName = `${sheetName}.json`;
            const outputPath = path.join('cypress/fixtures', jsonFileName);

            fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2));
            processedSheets.push({ sheetName, fileName: jsonFileName });
          });

          return processedSheets;
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