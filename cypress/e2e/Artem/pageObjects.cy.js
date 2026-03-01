/// <reference types="cypress" />
import { navigateTo } from './page-objects/navigationPage';
import { onformLayoutsPage } from './page-objects/formsLayoutsPage';

beforeEach(() => {
  cy.visit('/');
});

it('should navigate to the form layouts page', () => {
  navigateTo.navigateToFormLayoutsPage();
  onformLayoutsPage.submitUsingTheGridForm('test@test.com', 'welcome', 0);
  onformLayoutsPage.submitUsingTheGridForm('admin@test.com', 'admin123', 1);
  onformLayoutsPage.submitBasicForm('basic@test.com', 'welcome', true);
  onformLayoutsPage.submitBasicForm('basic2@test.com', 'welcome', false);
});
