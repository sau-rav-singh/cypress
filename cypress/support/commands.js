// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('openHomePage', () => {
  cy.visit('https://playground.bondaracademy.com/');
})

Cypress.Commands.add('loginToApplication', () => {
  cy.visit('https://conduit.bondaracademy.com/')

  cy.contains('Sign in').click()

  cy.get('input[placeholder="Email"]').type('saurav@singh.com')
  cy.get('input[placeholder="Password"]').type('mech2704')

  cy.contains('button', 'Sign in').click()
})

Cypress.Commands.add('submitFormDetails', () => {
  cy.get('#country').type('India');
  //cy.pause();
  cy.get('.suggestions ul li a').click();
  cy.get('.btn-success').click();
});

Cypress.Commands.add('LoginApi', (email = 'anshika@gmail.com', password = 'Iamking@000') => {
  cy.session(email, () => {
    cy.request({
      method: 'POST',
      url: 'https://rahulshettyacademy.com/api/ecom/auth/login',
      body: { userEmail: email, userPassword: password }
    }).then(response => {
      expect(response.status).to.eq(200);
      window.localStorage.setItem('token', response.body.token);
    });
  });
});
