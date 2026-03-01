describe('Mocking API responses', () => {

    beforeEach(() => {
        cy.intercept('GET', '**/api/tags', { fixture: 'tags.json' });
        cy.intercept('GET', '**/api/articles*', { fixture: 'articles.json' });
        cy.loginToApplication();
    });

    it('shows mocked articles and tags', () => {
        cy.contains('First Mock Article').should('be.visible');
        cy.contains('Second Mock Article').should('be.visible');
        cy.contains('cypress').should('be.visible');
        cy.contains('automation').should('be.visible');
        cy.contains('testing').should('be.visible');
    });
});