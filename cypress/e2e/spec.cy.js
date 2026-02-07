/// <reference types="cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe';

describe('Automation Practice Suite', () =>
{

  it("E-Commerce Product Selection and Cart Flow", () =>
  {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    cy.get('.search-keyword').type('ca');
    // Wait for products to appear and verify count
    cy.get('.products').find('.product:visible').should('have.length', 4);

    cy.get('.products').as('productLocator');

    // Add second product to cart
    cy.get('@productLocator').find('.product:visible').eq(1).contains('ADD TO CART').click().then(() =>
    {
      cy.log('Added second product to cart');
    });

    // Find and add Cashews dynamically
    cy.get('@productLocator').find('.product:visible').each(($el) =>
    {
      if ($el.find('h4.product-name').text().includes('Cashews'))
      {
        cy.wrap($el).find('button').click();
      }
    });

    cy.get('.brand').should('have.text', 'GREENKART');

    // Go to checkout
    cy.get('.cart-icon > img').click();
    cy.contains("button", "PROCEED TO CHECKOUT").click();
  });

  it("Form Inputs: Checkboxes, Dropdowns, and Autocomplete", () =>
  {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    // Checkboxes
    cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1');
    cy.get('#checkBoxOption1').uncheck().should('not.be.checked');
    cy.get('input[type="checkbox"]').check(['option2', 'option3']);

    // Dropdown
    cy.get('select').select('option2').should('have.value', 'option2');

    // Autocomplete
    cy.get('#autocomplete').type('ind');
    cy.get('.ui-menu-item div').each(($el) =>
    {
      if ($el.text() === 'India')
      {
        cy.wrap($el).click();
      }
    });
    cy.get("#autocomplete").should('have.value', 'India');
  });

  it("Element Visibility and Radio Button Interaction", () =>
  {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    // Visibility
    cy.get('#displayed-text').should('be.visible');
    cy.get('#hide-textbox').click();
    cy.get('#displayed-text').should('not.be.visible');

    // Radio Buttons
    cy.get('[value="radio2"]').check().should('be.checked');
  });

  it("Handling Alerts and New Tabs (Remove Attribute Strategy)", () =>
  {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    // Alert Handling
    cy.get('#alertbtn').click();
    cy.on('window:alert', (str) =>
    {
      expect(str).to.equal('Hello , share this practice page and share your knowledge');
    });

    // Child Tab Handling (Remove target attribute)
    cy.get("#opentab").invoke('removeAttr', 'target').click();

    // Cross-Origin Validation
    cy.origin("https://www.qaclickacademy.com", () =>
    {
      cy.get("#navbarSupportedContent a[href*='about']").click();
      cy.get(".mt-50 h2").should('contain', 'QAClick Academy');
    });
  });

  it("Web Table Dynamic Value Validation", () =>
  {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    cy.get('tr td:nth-child(2)').each(($el, index) =>
    {
      const text = $el.text();
      if (text.includes("Python"))
      {
        cy.get("tr td:nth-child(2)").eq(index).next().then((price) =>
        {
          const priceText = price.text();
          expect(priceText).to.equal('25');
        });
      }
    });
  });

  it("Handling New Tabs (Direct URL Visit Strategy)", () =>
  {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    cy.get('#opentab').then((el) =>
    {
      const url = el.prop('href');
      cy.visit(url);
      cy.origin(url, () =>
      {
        cy.get("div.sub-menu-bar a[href*='about']").click();
      });
    });
  });

  it('IFrame Interaction', () =>
  {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    cy.get("#courses-iframe").then($iframe =>
    {
      const url = $iframe.prop('src');
      cy.visit(url);
      cy.origin(url, () =>
      {
        cy.get("a[href*='mentorship']").eq(0).click();
        cy.get("h1[class*='pricing-title']").should('have.length', 2);
      })
    });
  });

  it('Date Picker Calendar Navigation', () =>
  {
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber, date, year];

    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    // Wait for calendar input to be visible instead of hard wait
    cy.get(".react-date-picker__inputGroup").should('be.visible').click();

    cy.get(".react-calendar__navigation__label").click();
    cy.get(".react-calendar__navigation__label").click();
    cy.contains("button", year).click();
    cy.get(".react-calendar__year-view__months__month").eq(Number(monthNumber) - 1).click();
    cy.contains("abbr", date).click();

    // Assertion
    cy.get(".react-date-picker__inputGroup__input").each(($el, index) =>
    {
      cy.wrap($el).invoke('val').should('eq', expectedList[index]);
    })
  });

});