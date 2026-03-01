/// <reference types="cypress" />

beforeEach(() =>
{
    cy.log("Visiting the website");
});

afterEach(() =>
{
    cy.log("Test completed");
});

describe("My First Test Suite", () =>
{
    it("Hello Artem", () =>
    {
        cy.visit("https://playground.bondaracademy.com/pages/forms/layouts")
    });

    it("Hello Rahul", () =>
    {
        cy.visit("https://playground.bondaracademy.com/pages/forms/layouts")
    });
});

describe("My Second Test Suite", () =>
{
    it("Hello Artem", () =>
    {
        cy.visit("https://playground.bondaracademy.com/pages/forms/layouts")
    });

    it("Hello Rahul", () =>
    {
        cy.visit("https://playground.bondaracademy.com/pages/forms/layouts")
    });
});