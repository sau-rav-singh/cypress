import CartPage from "./CartPage";

class ProductPage
{
    pageValidations()
    {
        cy.contains("Shop Name").should("be.visible");
    }

    getCardCount(){
        return cy.get('app-card')
    }

    selectProduct(productName)
    {
        cy.get("app-card")
            .filter(`:contains("${productName}")`)
            .then(($el) =>
            {
                cy.wrap($el).contains("button", "Add").click();
            });
        cy.get(".nav-item.active a").should("contain.text", "Checkout ( 1 )");
    }

    selectSecondProduct()
    {
        cy.get("app-card").eq(0).contains("button", "Add").click();
        cy.get(".nav-item.active a").should("contain.text", "Checkout ( 2 )");
    }

    goToCart(){
        cy.contains("a", "Checkout").click();
        return new CartPage();
    }
}

export default ProductPage;