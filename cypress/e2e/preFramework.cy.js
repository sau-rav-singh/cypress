describe("E2E Test", () =>
{
    it("First Test", () =>
    {
        cy.visit("https://rahulshettyacademy.com/loginpagePractise/");
        cy.get("#username").type("rahulshettyacademy");
        cy.get("#password").type("Learning@830$3mK2");
        cy.contains("Sign In").click();
        cy.contains("Shop Name").should("be.visible");
        expect(3).to.be.equal(3);
    });

    it("Second Test", () =>
    {
        const productName = "Nokia Edge";
        Cypress.config('defaultCommandTimeout', 10000)
        cy.visit("https://rahulshettyacademy.com/angularpractice/shop");
        cy.contains("Shop Name").should("be.visible");
        cy.get("div.card-body").should("have.length", 4);
        cy.get("app-card")
            .filter(`:contains("${productName}")`)
            .then(($el) =>
            {
                cy.wrap($el).contains("button", "Add").click();
            });
        cy.get(".nav-item.active a").should("contain.text", "Checkout ( 1 )");
        cy.get("app-card").eq(0).contains("button", "Add").click();
        cy.get(".nav-item.active a").should("contain.text", "Checkout ( 2 )");
        cy.contains("a", "Checkout").click();
        let sum = 0; // Ensure sum is initialized outside

        cy.get("tr td:nth-child(4) strong")
            .each(($el) =>
            {
                const amount = Number($el.text().split(" ")[1].trim());
                sum += amount;
            })
            .then(() =>
            {
                cy.log("The total sum is: " + sum);
                expect(sum).to.be.lessThan(200000);
            });
        cy.contains('button', 'Checkout').click()
        cy.get("#country").type("India")
        cy.get(".suggestions ul li a").click()
        cy.get(".btn-success").click()
        cy.get(".alert-success").should('contain', 'Success')
    });
});
