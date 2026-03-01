class NavigationPage {
  //Click only if the menu is not expanded by checking the aria-expanded attribute
  //not the visible state of the menu items because the menu items are visible
  //but not clickable when the menu is not expanded
  openMenu(groupMenuItemName) {
    cy.contains('a', groupMenuItemName)
      .invoke('attr', 'aria-expanded')
      .then(expanded => {
        if (expanded.includes('false')) {
          cy.contains('a', groupMenuItemName).click();
        }
      });
  }

  navigateToFormLayoutsPage() {
    this.openMenu('Forms');
    cy.contains('Form Layouts').click();
  }

  navigateToDatePickerPage() {
    this.openMenu('Forms');
    cy.contains('Datepicker').click();
  }

  navigateToToastrPage() {
    this.openMenu('Modal & Overlays');
    cy.contains('Toastr').click();
  }

  navigateToTooltipPage() {
    this.openMenu('Modal & Overlays');
    cy.contains('Tooltip').click();
  }
}

export const navigateTo = new NavigationPage();
