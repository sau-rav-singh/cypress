/// <reference types="cypress" />
import { navigateTo } from "./page-objects/navigationPage";

beforeEach(() => {
    cy.visit("/");
});

it("should navigate to the form layouts page", () => {
    navigateTo.navigateToFormLayoutsPage();
    navigateTo.navigateToDatePickerPage();
    navigateTo.navigateToToastrPage();
    navigateTo.navigateToTooltipPage();
});