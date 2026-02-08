const exceljs = require('exceljs');
const path = require('path');
const fs = require('fs').promises;

async function writeExcel(searchText, replaceText, change, filePath)
{
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await findTextInWorksheet(worksheet, searchText);

    if (output.row !== -1 && output.column !== -1)
    {
        const rowChange = change.rowChange || 0;
        const colChange = change.colChange || 0;
        const cell = worksheet.getCell(output.row + rowChange, output.column + colChange);
        cell.value = replaceText;
        await workbook.xlsx.writeFile(filePath);
        console.log("Write operation successful.");
    } else
    {
        console.log("Search text not found.");
    }
}

async function readExcel(filePath, searchText)
{
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    return await findTextInWorksheet(worksheet, searchText);
}

async function findTextInWorksheet(worksheet, searchText)
{
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) =>
    {
        row.eachCell((cell, colNumber) =>
        {
            if (cell.value === searchText)
            {
                output.row = rowNumber;
                output.column = colNumber;
            }
        });
    });
    return output;
}

async function convertAllSheetsToJson(filePath)
{
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile(filePath);

    // Iterate through all sub-sheets
    for (const worksheet of workbook.worksheets)
    {
        const sheetData = {};
        const headers = [];

        worksheet.eachRow((row, rowNumber) =>
        {
            if (rowNumber === 1)
            {
                // Store headers (Color, Price, Season, etc.)
                row.eachCell((cell) => headers.push(cell.value.toString().toLowerCase()));
            } else
            {
                const rowObject = {};
                const fruitName = row.getCell(1).value.toString().toLowerCase();

                // Map subsequent cells to headers
                row.eachCell((cell, colNumber) =>
                {
                    if (colNumber > 1)
                    {
                        const headerName = headers[colNumber - 1];
                        rowObject[headerName] = cell.value;
                    }
                });

                sheetData[fruitName] = rowObject;
            }
        });

        // Create the JSON file named after the sheet (e.g., Sheet1.json)
        const jsonFileName = `${worksheet.name}.json`;
        const outputPath = path.join(__dirname, '..', 'fixtures', jsonFileName);

        await fs.writeFile(outputPath, JSON.stringify(sheetData, null, 2));
        console.log(`Generated: ${jsonFileName}`);
    }
}
async function main()
{
    const filePath = path.join(__dirname, '..', 'fixtures', 'excelData.xlsx');

    // Update Mango Price to 350
    // https://rahulshettyacademy.com/upload-download-test/
    await writeExcel("Mango", 350, { rowChange: 0, colChange: 2 }, filePath);

    // Read Mango position
    const output = await readExcel(filePath, "Mango");
    console.log("Search Text found at row: " + output.row + ", column: " + output.column);

    await convertAllSheetsToJson(filePath);
}

main();
