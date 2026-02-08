describe('Upload-download test', () =>
{

    it("verify excel upload download", () =>
    {
        const replaceNum = 450;
        const searchTextFruit = "Mango";
        const FilePath = Cypress.config("fileServerFolder") + "/cypress/downloads/download.xlsx"
        cy.visit("https://rahulshettyacademy.com/upload-download-test/index.html");
        cy.get("#downloadButton").click();

        // Wait for the file to be downloaded
        cy.wait(2000);

        // Use updatePrice task instead of writeExcelTest
        // updatePrice expects { fruitName, newPrice, filePath }
        cy.task('updatePrice', { fruitName: searchTextFruit, newPrice: replaceNum, filePath: FilePath });

        cy.get("#fileinput").selectFile(FilePath);
        cy.contains(searchTextFruit).parent().parent().find("#cell-4-undefined").should('have.text', replaceNum);
    })
})