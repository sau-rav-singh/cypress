/// <reference types="cypress" />
import neatCSV from 'neat-csv';

describe('JWT Session', () => {
    it('is logged in through local storage', () => {
        let productName;

        cy.LoginApi();
        cy.visit("https://rahulshettyacademy.com/client");

        cy.get(".card-body b").eq(1).then((ele) => {
            productName = ele.text();
        });

        cy.get(".card-body button:last-of-type").eq(1).click();
        cy.get("[routerlink*='cart']").click();
        cy.contains("Checkout").click();
        cy.get("[placeholder*='Country']").type("ind");

        cy.get('.ta-results button').each(($e1) => {
            if ($e1.text() === " India") {
                cy.wrap($e1).click();
            }
        });

        cy.get(".action__submit").click();
        cy.wait(2000);
        cy.get(".order-summary button").click();

        cy.readFile(Cypress.config("fileServerFolder") + "/cypress/downloads/order-invoice_anshika.csv")
            .then(async (text) => {
                const csv = await neatCSV(text);
                console.log(csv);
                const actualProductCSV = csv[0]["Product Name"];
                expect(productName).to.equal(actualProductCSV);
            });
    });
});
