import HomePage from '../support/pageObjects/HomePage';
import ProductPage from '../support/pageObjects/ProductPage';

describe("E2E Test", () =>
{
    let testData;
    let homepage, productPage, cartPage, confirmationPage;

    beforeEach(() =>
    {
        cy.fixture("example").then((data) =>
        {
            testData = data;
            homepage = new HomePage();
            productPage = new ProductPage();
        });
    });

    it("First Test", () =>
    {
        homepage.goto("https://rahulshettyacademy.com/loginpagePractise/")
        homepage.login(testData.username, testData.passsword);
        cy.contains("Shop Name").should("be.visible");
    });

    it.only("Second Test", () =>
    {
        const productName = testData.productName;
        Cypress.config('defaultCommandTimeout', 10000)
        cy.visit("https://rahulshettyacademy.com/angularpractice/shop");
        productPage.pageValidations();
        productPage.getCardCount().should('have.length',4);
        productPage.selectProduct(productName);
        productPage.selectSecondProduct();
        cartPage = productPage.goToCart();
        cartPage.validateCartTotal().then(function(sum)
        {
            expect(sum).to.be.lessThan(200000);
        });

        confirmationPage = cartPage.checkout();
        confirmationPage.submitOrder();
    });
});