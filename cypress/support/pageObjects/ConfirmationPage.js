class ConfirmationPage
{

    submitOrder()
    {
        cy.submitFormDetails();
        cy.get(".alert-success").should("contain", "Success");
    }
}
export default ConfirmationPage;