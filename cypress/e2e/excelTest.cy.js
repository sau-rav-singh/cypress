describe("Excel Multi-Sheet Test Suite", () =>
{
    it('should convert all excel sheets to individual JSON fixtures', () =>
    {
        cy.task('createJsonFromExcel', 'testData.xlsx').then(() =>
        {
            cy.fixture('Sheet1').then((data) =>
            {
                expect(data[0].hello).to.eq('npm');
                expect(data[0].world).to.eq('cypress');
            });
        });
    });
    
    it('should read and assert excel values', () =>
    {
        const filePath = 'testData.xlsx';

        cy.task('readExcelJS', filePath).then((rows) =>
        {
            // rows[0] is the first row (hello, world)
            // rows[1] is the second row (npm, cypress)

            // Asserting Row 1
            expect(rows[0][1]).to.eq('hello');   // Column A
            expect(rows[0][2]).to.eq('world');   // Column B

            // Asserting Row 2
            expect(rows[1][1]).to.eq('npm');     // Column A
            expect(rows[1][2]).to.eq('cypress'); // Column B
        });
    });
});