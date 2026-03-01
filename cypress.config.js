import { defineConfig } from 'cypress';
import repoPlugin from 'cypress-mochawesome-reporter/plugin';

const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

export default defineConfig({
  allowCypressEnv: false,
  projectId: 'xax378',
  reporter: 'cypress-mochawesome-reporter',
  blockHosts: ['*google-analytics.com', '*segment.io'],
  env: {
    username: 'rahulshettyacademy',
    password: 'Learning@830$3mK2'
  },
  expose: {
    PLUGIN_CONFIG: 'value1'
  },
  e2e: {
    baseUrl: "https://rahulshettyacademy.com",
    //baseUrl: 'https://playground.bondaracademy.com/',
    chromeWebSecurity: false,
    defaultCommandTimeout: 5000,
    requestTimeout: 15000,
    pageLoadTimeout: 60000,
    specPattern: 'cypress/e2e/**/*.cy.js',
    setupNodeEvents(on, config) {
      repoPlugin(on);

      on('task', {
        async readExcelJS(filePath) {
          const workbook = new ExcelJS.Workbook();
          const fileLocation = path.isAbsolute(filePath) ? filePath : path.join('cypress', 'fixtures', filePath);
          await workbook.xlsx.readFile(fileLocation);

          const worksheet = workbook.getWorksheet(1);
          const rows = [];
          worksheet.eachRow({ includeEmpty: false }, row => {
            rows.push(row.values);
          });
          return rows;
        },

        async createJsonFromExcel(filePath) {
          const workbook = new ExcelJS.Workbook();
          const fileLocation = path.isAbsolute(filePath) ? filePath : path.join('cypress', 'fixtures', filePath);
          await workbook.xlsx.readFile(fileLocation);

          const processedSheets = [];

          workbook.eachSheet(worksheet => {
            const sheetName = worksheet.name;
            const jsonData = [];
            let headers = [];

            worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
              const rowValues = row.values.slice(1);
              if (rowNumber === 1) {
                headers = rowValues;
              } else {
                const rowObject = {};
                headers.forEach((header, index) => {
                  rowObject[header] = rowValues[index] ?? null;
                });
                jsonData.push(rowObject);
              }
            });

            const jsonFileName = `${sheetName}.json`;
            const outputPath = path.join('cypress', 'fixtures', jsonFileName);
            fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2));
            processedSheets.push({ sheetName, fileName: jsonFileName });
          });

          return processedSheets;
        },

        async convertAllSheetsToJson(filePath) {
          const workbook = new ExcelJS.Workbook();
          const fileLocation = path.isAbsolute(filePath) ? filePath : path.join('cypress', 'fixtures', filePath);
          await workbook.xlsx.readFile(fileLocation);

          for (const worksheet of workbook.worksheets) {
            const sheetData = {};
            const headers = [];

            worksheet.eachRow((row, rowNumber) => {
              if (rowNumber === 1) {
                row.eachCell(cell => headers.push(cell.value.toString().toLowerCase()));
              } else {
                const rowObject = {};
                const fruitName = row.getCell(1).value.toString().toLowerCase();
                row.eachCell((cell, colNumber) => {
                  if (colNumber > 1) {
                    const headerName = headers[colNumber - 1];
                    rowObject[headerName] = cell.value;
                  }
                });
                sheetData[fruitName] = rowObject;
              }
            });

            const jsonFileName = `${worksheet.name}.json`;
            const outputPath = path.join('cypress', 'fixtures', jsonFileName);
            fs.writeFileSync(outputPath, JSON.stringify(sheetData, null, 2));
            console.log(`Generated: ${jsonFileName}`);
          }
          return null;
        },

        async updatePrice({ fruitName, newPrice, filePath }) {
          const workbook = new ExcelJS.Workbook();
          const fileLocation = path.isAbsolute(filePath) ? filePath : path.join('cypress', 'fixtures', filePath);
          await workbook.xlsx.readFile(fileLocation);
          const worksheet = workbook.getWorksheet('Sheet1');

          let output = { row: -1, column: -1 };
          worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell, colNumber) => {
              if (cell.value === fruitName) {
                output.row = rowNumber;
                output.column = colNumber;
              }
            });
          });

          if (output.row !== -1) {
            const priceColumnIndex = 3;
            const cell = worksheet.getCell(output.row, priceColumnIndex);
            cell.value = newPrice;
            await workbook.xlsx.writeFile(fileLocation);
            console.log(`Updated price of ${fruitName} to ${newPrice}.`);
            return true;
          } else {
            console.log(`Fruit '${fruitName}' not found.`);
            return false;
          }
        },

        async readExcel({ filePath, searchText }) {
          const workbook = new ExcelJS.Workbook();
          const fileLocation = path.isAbsolute(filePath) ? filePath : path.join('cypress', 'fixtures', filePath);
          await workbook.xlsx.readFile(fileLocation);
          const worksheet = workbook.getWorksheet('Sheet1');

          let output = { row: -1, column: -1 };
          worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell, colNumber) => {
              if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
              }
            });
          });
          return output;
        }
      });
    }
  },
  retries: {
    runMode: 1,
    openMode: 0
  },
  viewportWidth: 1366,
  viewportHeight: 720
});
