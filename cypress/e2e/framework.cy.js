import HomePage from '../support/pageObjects/HomePage';
import ProductPage from '../support/pageObjects/ProductPage';

describe('Framework Test', () => {
  let testData;
  let homepage, productPage, cartPage, confirmationPage;

  beforeEach(() => {
    cy.fixture('example').then(data => {
      testData = data;
      homepage = new HomePage();
      productPage = new ProductPage();
    });
  });

  it('Login and Dashboard Verification', () => {
    homepage.goTo('/loginpagePractise/');
    homepage.login(testData.username, testData.passsword);
    productPage.getShopName().should('be.visible');
  });

  it('E-Commerce Product Selection, Cart Validation, and Checkout', () => {
    const productName = testData.productName;
    Cypress.config('defaultCommandTimeout', 10000);
    cy.visit('/angularpractice/shop');

    productPage.getShopName().should('be.visible');
    productPage.getCards().should('have.length', 4);

    productPage.addProductToCart(productName);
    productPage.getCheckoutButton().should('contain.text', 'Checkout ( 1 )');

    productPage.addFirstProductToCart();
    productPage.getCheckoutButton().should('contain.text', 'Checkout ( 2 )');

    cartPage = productPage.goToCart();
    cartPage.getCartTotal().then(function (sum) {
      expect(sum).to.be.lessThan(200000);
    });

    confirmationPage = cartPage.checkout();
    confirmationPage.submitOrder();
    confirmationPage.getAlertMessage().should('contain', 'Success');
  });
});
