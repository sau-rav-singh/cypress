const config = Cypress.expose('PLUGIN_CONFIG');

describe('Pre-Framework Raw Test Suite', () => {
  it('Verify Login Functionality', () => {
    cy.visit('/loginpagePractise/');
    cy.env(['username', 'password']).then(({ username, password }) => {
      cy.get('#username').type(username);
      cy.get('#password').type(password);
    });
    cy.contains('Sign In').click();
    cy.contains('Shop Name').should('be.visible');
    cy.log('Exposed Value: ' + config);
  });

  it('E-Commerce Product Selection, Cart Validation, and Checkout', () => {
    const productName = 'Nokia Edge';
    // Increase timeout for this specific test
    Cypress.config('defaultCommandTimeout', 10000);

    cy.visit('/angularpractice/shop');

    // Verify Shop Page
    cy.contains('Shop Name').should('be.visible');
    cy.get('app-card').should('have.length', 4);

    // Add specific product by name
    cy.get('app-card')
      .filter(`:contains("${productName}")`)
      .then($el => {
        cy.wrap($el).contains('button', 'Add').click();
      });

    // Verify Cart count updates
    cy.get('.nav-item.active a').should('contain.text', 'Checkout ( 1 )');

    // Add another product (first one in the list)
    cy.get('app-card').eq(0).contains('button', 'Add').click();
    cy.get('.nav-item.active a').should('contain.text', 'Checkout ( 2 )');

    // Navigate to Cart
    cy.contains('a', 'Checkout').click();

    // Validate Cart Total
    let sum = 0;
    cy.get('tr td:nth-child(4) strong')
      .each($el => {
        const amount = Number($el.text().split(' ')[1].trim());
        sum += amount;
      })
      .then(() => {
        cy.log('The total sum is: ' + sum);
        expect(sum).to.be.lessThan(200000);
      });

    // Proceed to Checkout
    cy.contains('button', 'Checkout').click();
    cy.get('#country').type('India');

    // Select Country from suggestions
    cy.get('.suggestions > ul > li > a').click();

    // Agree to Terms and Purchase
    cy.get('#checkbox2').click({ force: true });
    cy.get('.btn-success').click();

    // Verify Success Message
    cy.get('.alert-success').should('contain', 'Success');
  });
});
