class FormLayoutsPage {
  
  /**
 * Submits the "Using the Grid" form with valid user credentials.
 *
 * @param {string} email - Valid user email address
 * @param {string} password - Valid user password
 * @param {number} optionIndex - Index of radio option to select (starts from 0)
 */
  submitUsingTheGridForm(email, password, optionIndex) {
    cy.contains('nb-card', 'Using the Grid').find('form').within(() => {
      cy.get('[placeholder="Email"]').type(email);
      cy.get('[placeholder="Password"]').type(password);
      cy.get('[type="radio"]').eq(optionIndex).check({ force: true });
      cy.contains('button', 'Sign in').click();
    });
  }

  /**
 * Submits the "Basic form".
 *
 * @param {string} email - User email address
 * @param {string} password - User password
 * @param {boolean} shouldCheckCheckbox - Whether to check the "Remember me" checkbox
 */
  submitBasicForm(email, password, shouldCheckCheckbox) {
    cy.contains('nb-card', 'Basic form').find('form').within(() => {
      cy.get('[placeholder="Email"]').type(email);
      cy.get('[placeholder="Password"]').type(password);
      if (shouldCheckCheckbox) {
        cy.get('[type="checkbox"]').check({ force: true });
      }
      cy.contains('button', 'Submit').click();
    });
  }
}

export const onformLayoutsPage = new FormLayoutsPage();
