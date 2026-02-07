import ConfirmationPage from "./ConfirmationPage";

class CartPage
{

    validateCartTotal()
    {
        let sum = 0;
        return cy.get('tr td:nth-child(4) strong').each(($el) =>
        {
            const amount = $el.text().split(" ")[1].trim();
            sum = Number(sum) + Number(amount);
        }).then(() =>
        {
            return sum; // This wraps the sum so the test can access it
        });
    }

    checkout()
    {
        cy.contains("button", "Checkout").click();
        return new ConfirmationPage();
    }
}
export default CartPage;