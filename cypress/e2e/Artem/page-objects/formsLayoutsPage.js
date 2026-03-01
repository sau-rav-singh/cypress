class FormLayoutsPage {
  submitUsingTheGridForm(email, password, optionIndex) {
    /* prettier-ignore */
    cy.contains('nb-card', 'Using the Grid').find('form').within(() => {
        cy.get('[placeholder="Email"]').type(email);
        cy.get('[placeholder="Password"]').type(password);
        cy.get('[type="radio"]').eq(optionIndex).check({ force: true });
        cy.contains('button', 'Sign in').click();
      });
  }

  submitBasicForm(email, password, shouldCheckCheckbox) {
    /* prettier-ignore */
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
