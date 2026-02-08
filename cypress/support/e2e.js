// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands'
import 'cypress-mochawesome-reporter/register';

const app = window.top;

if (!app.document.head.querySelector('[data-hide-command-log-request]'))
{
  const style = app.document.createElement('style');
  style.innerHTML = `
    .command-name-request,
    .command-info-request-type {
      display: none !important;
    }
  `;
  style.setAttribute('data-hide-command-log-request', '');
  app.document.head.appendChild(style);
}

beforeEach(() =>
{
  cy.intercept('https://www.googleadservices.com/**', { statusCode: 200, body: {} });
  cy.intercept('https://www.googletagmanager.com/**', { statusCode: 200, body: {} });
  cy.intercept('**/pagead/conversion/**', { statusCode: 200, body: {} });
});