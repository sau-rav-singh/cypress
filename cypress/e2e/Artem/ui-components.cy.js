/// <reference types="cypress" />

it('Tests UI components', () => {
  cy.visit('/');
  cy.contains('Forms').click();
  cy.contains('Form Layouts').click();
  cy.get('#inputEmail1').type('test@example.com', { delay: 10 });
  cy.get('#inputEmail1').clear();
  cy.get('#inputEmail1').should('not.have.value', 'test@example.com');
  cy.contains('nb-card', 'Using the Grid').contains('Email').type('test@example2.com').press(Cypress.Keyboard.Keys.TAB);

  cy.contains('Auth').click();
  cy.contains('Login').click();
  cy.get('#input-email').type('test@example.com');
  cy.get('#input-password').type('test{enter}');
});

it('Tests UI components2', () => {
  cy.visit('/');
  cy.contains('Forms').click();
  cy.contains('Form Layouts').click();
  cy.get('#inputEmail1')
    .type('test@example.com')
    .invoke('prop', 'value')
    .then(value => {
      cy.log(value);
    });
  cy.get("input[type='radio']").first().check({ force: true });
});

it('Select', () => {
  cy.visit('/');
  cy.contains('Modal & Overlays').click();
  cy.contains('Toastr').click();
  cy.get('select').select('info');
  cy.get('nb-select.position-select button.select-button').click();
  cy.contains('top-end').click();
  cy.get('nb-select.position-select button.select-button').should('contain', 'top-end');

  cy.get('nb-select.position-select button.select-button').click();
  cy.get('.option-list nb-option').each((option, index, list) => {
    cy.wrap(option).click();

    if (index < list.length - 1) {
      cy.get('nb-select.position-select button.select-button').click();
    }
  });
});

it.only('selects a future date from the calendar', () => {
  cy.visit('pages/forms/datepicker');
  cy.get('input[placeholder="Form Picker"]').click();

  function selectDateFromCalendar(daysFromToday) {
    const date = new Date();
    date.setDate(date.getDate() + daysFromToday);

    const futureDay = date.getDate();
    const futureYear = date.getFullYear();

    const futureMonthLong = date.toLocaleString('en-US', { month: 'long' });
    const futureMonthShort = date.toLocaleString('en-US', { month: 'short' });

    function navigateToCorrectMonth() {
      cy.get('.calendar-navigation').invoke('text')
        .then(calendarText => {
          const correctMonthDisplayed = calendarText.includes(futureMonthLong) && calendarText.includes(futureYear);
          if (!correctMonthDisplayed) {
            cy.get('[data-name="chevron-right"]').click();
            navigateToCorrectMonth();
          } else {
            cy.get('.day-cell').not('.bounding-month').contains(futureDay).click();
          }
        });
    }
    navigateToCorrectMonth();
    return `${futureMonthShort} ${futureDay}, ${futureYear}`;
  }

  const expectedDate = selectDateFromCalendar(200);
  cy.get('input[placeholder="Form Picker"]').should('have.value', expectedDate);
});
