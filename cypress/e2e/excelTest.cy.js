describe("Excel Multi-Sheet Test Suite", () => {
    const testDataFile = 'testData.xlsx';
    const excelDataFile = 'excelData.xlsx';
    const sheet1Fixture = 'cypress/fixtures/Sheet1.json';

    describe('Data Validation with testData.xlsx', () => {
        it('should convert excel to JSON and validate content', () => {
            cy.task('createJsonFromExcel', testDataFile);
            // Read file directly to bypass fixture cache and ensure latest content
            cy.readFile(sheet1Fixture).then((data) => {
                expect(data[0].hello).to.eq('npm');
                expect(data[0].world).to.eq('cypress');
            });
        });

        it('should read excel directly and assert values', () => {
            cy.task('readExcelJS', testDataFile).then((rows) => {
                expect(rows[0][1]).to.eq('hello');
                expect(rows[0][2]).to.eq('world');
                expect(rows[1][1]).to.eq('npm');
                expect(rows[1][2]).to.eq('cypress');
            });
        });
    });

    describe.skip('Data Manipulation with excelData.xlsx', () => {
        it('should convert sheets to JSON and validate fruit data', () => {
            cy.task('convertAllSheetsToJson', excelDataFile);
            cy.readFile(sheet1Fixture).then((data) => {
                expect(data.mango.price).to.eq(400);
                expect(data.apple.color).to.eq('Red');
            });
        });

        describe('Update Operation', () => {
            const fruitName = 'Mango';
            const newPrice = 500;
            const originalPrice = 400;

            // Ensure cleanup happens even if test fails
            after(() => {
                cy.task('updatePrice', {
                    fruitName,
                    newPrice: originalPrice,
                    filePath: excelDataFile
                });
            });

            it('should update fruit price and verify change', () => {
                cy.task('updatePrice', {
                    fruitName,
                    newPrice,
                    filePath: excelDataFile
                });

                // Verify using readExcel task (coordinates check)
                cy.task('readExcel', {
                    filePath: excelDataFile,
                    searchText: fruitName
                }).should((output) => {
                    expect(output.row).to.be.greaterThan(0);
                    expect(output.column).to.be.greaterThan(0);
                });

                // Verify using JSON conversion (value check)
                cy.task('convertAllSheetsToJson', excelDataFile);
                cy.readFile(sheet1Fixture).then((data) => {
                    expect(data.mango.price).to.eq(newPrice);
                });
            });
        });
    });
});