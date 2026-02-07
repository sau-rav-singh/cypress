class ConfirmationPage
{
    submitOrder()
    {
        cy.submitFormDetails();
    }

    getAlertMessage()
    {
        return cy.get(".alert-success");
    }
}
export default ConfirmationPage;