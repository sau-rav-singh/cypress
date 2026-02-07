import ProductPage from "./ProductPage";

class HomePage {
    goTo(url) {
        cy.visit(url);
    }

    getUsernameField() {
        return cy.get("#username");
    }

    getPasswordField() {
        return cy.get("#password");
    }

    getSignInButton() {
        return cy.contains("Sign In");
    }
    
    login(username, password) {
        this.getUsernameField().type(username);
        this.getPasswordField().type(password);
        this.getSignInButton().click();
        return new ProductPage();
    }
}

export default HomePage;