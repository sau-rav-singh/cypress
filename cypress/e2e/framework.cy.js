describe.skip("E2E Test", () =>
{
    let testData;
    beforeEach(() =>
    {
        cy.fixture("example").then((data) =>
        {
            testData = data;
        });
    });

    it("First Test", () =>
    {
        cy.visit("https://rahulshettyacademy.com/loginpagePractise/");
        // Accessing data from fixture
        cy.get("#username").type(testData.username);
        cy.get("#password").type(testData.passsword); // Note: matches your JSON spelling
        cy.contains("Sign In").click();
        cy.contains("Shop Name").should("be.visible");
    });

    it("Second Test", () =>
    {
        // Using productName from fixture
        const productName = testData.productName;

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

        cy.contains("button", "Checkout").click();
        cy.get("#country").type("India");
        cy.get(".suggestions ul li a").click();
        cy.get(".btn-success").click();
        cy.get(".alert-success").should("contain", "Success");
    });
});