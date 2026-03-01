class NavigationPage {

  navigateToFormLayoutsPage() {
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
  }

  navigateToDatePickerPage() {
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()
  }

  navigateToToastrPage() {
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()
  }

  navigateToTooltipPage() {
    cy.contains('Modal & Overlays').click()
    cy.contains('Tooltip').click()
  }

}

export const navigateTo = new NavigationPage();