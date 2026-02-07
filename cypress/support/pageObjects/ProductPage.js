import CartPage from "./CartPage";

class ProductPage
{
    getShopName()
    {
        return cy.contains("Shop Name");
    }

    getCards()
    {
        return cy.get('app-card');
    }

    addProductToCart(productName)
    {
        cy.get("app-card")
            .filter(`:contains("${productName}")`)
            .then(($el) =>
            {
                cy.wrap($el).contains("button", "Add").click();
            });
    }

    addFirstProductToCart()
    {
        cy.get("app-card").eq(0).contains("button", "Add").click();
    }

    getCheckoutButton()
    {
        return cy.get(".nav-item.active a");
    }

    goToCart()
    {
        cy.contains("a", "Checkout").click();
        return new CartPage();
    }
}

export default ProductPage;