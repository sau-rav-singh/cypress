describe("Pre-Framework Raw Test Suite", () =>
{
    it("Login and Dashboard Verification", () =>
    {
        cy.visit("/loginpagePractise/");
        cy.get("#username").type("rahulshettyacademy");
        cy.get("#password").type("Learning@830$3mK2");
        cy.contains("Sign In").click();
        cy.contains("Shop Name").should("be.visible");
    });

    it("E-Commerce Product Selection, Cart Validation, and Checkout", () =>
    {
        const productName = "Nokia Edge";
        Cypress.config('defaultCommandTimeout', 10000);

        cy.visit("/angularpractice/shop");

        // Verify Shop Page
        cy.contains("Shop Name").should("be.visible");
        cy.get("app-card").should("have.length", 4);

        // Add specific product by name
        cy.get("app-card")
            .filter(`:contains("${productName}")`)
            .then(($el) =>
            {
                cy.wrap($el).contains("button", "Add").click();
            });
        cy.get(".nav-item.active a").should("contain.text", "Checkout ( 1 )");

        // Add first product
        cy.get("app-card").eq(0).contains("button", "Add").click();
        cy.get(".nav-item.active a").should("contain.text", "Checkout ( 2 )");

        // Go to Cart
        cy.contains("a", "Checkout").click();

        // Validate Cart Total
        let sum = 0;
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

        // Checkout Process
        cy.contains('button', 'Checkout').click();
        cy.get("#country").type("India");

        // Wait for suggestions and click
        cy.get(".suggestions > ul > li > a").click();

        cy.get("#checkbox2").click({ force: true });
        cy.get(".btn-success").click();

        // Verify Success Message
        cy.get(".alert-success").should('contain', 'Success');
    });
});