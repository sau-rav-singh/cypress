/// <reference types="cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe';

describe.skip('My First Test', () =>
{

  it("Sabji Purchase", () =>
  {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    cy.get('.search-keyword').type('ca');
    cy.wait(2000); // Wait for the results to load
    cy.get('.products').as('productLocator');
    cy.get('@productLocator').find('.product:visible').should('have.length', 4);

    cy.get('.product:visible').should('have.length', 4);

    cy.get('.products').find('.product:visible').eq(1).contains('ADD TO CART').click().then(() =>
    {
      console.log('Added Cashews to cart');
    });

    cy.get('.products').find('.product:visible').each(($el, index, $list) =>
    {
      if ($el.find('h4.product-name').text().includes('Cashews'))
      {
        cy.wrap($el).find('button').click();
      }
    });

    cy.get('.brand').should('have.text', 'GREENKART');

    cy.get('.brand').then((el) =>
    {
      cy.log(el.text());
    });

    cy.get('.cart-icon > img').click();
    cy.get('.cart-preview > .action-block > button').click();
  });

  it("Checkbox Test", () =>
  {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1');
    cy.get('#checkBoxOption1').uncheck().should('not.be.checked');
    cy.get('input[type="checkbox"]').check(['option2', 'option3']);
    cy.get('select').select('option2').should('have.value', 'option2');
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

  it("Magic Test", () =>
  {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    cy.get('#displayed-text').should('be.visible');
    cy.get('#hide-textbox').click();
    cy.get('#displayed-text').should('not.be.visible');

    cy.get('[value="radio2"]').check().should('be.checked');
  });

  it("Popup Test", () =>
  {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    cy.get('#alertbtn').click();
    cy.on('window:alert', (str) =>
    {
      expect(str).to.equal('Hello , share this practice page and share your knowledge');
    });

    // Handling the Child Window/Tab
    cy.get("#opentab").invoke('removeAttr', 'target').click();

    // Handling Cross-Origin navigation
    cy.origin("https://www.qaclickacademy.com", () =>
    {
      cy.get("#navbarSupportedContent a[href*='about']").click();
      cy.get(".mt-50 h2").should('contain', 'QAClick Academy');
    });
  });

  it("Webtable case", function()
  {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    cy.get('tr td:nth-child(2)').each(($el, index, $list) =>
    {
      const text = $el.text();
      if (text.includes("Python"))
      {
        cy.get("tr td:nth-child(2)").eq(index).next().then(function(price)
        {
          const priceText = price.text();
          expect(priceText).to.equal('25');
        });
      }
    });
  });

  it("Popup Test2", () =>
  {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    cy.get('#opentab').then((el) =>
    {
      const url = el.prop('href');
      cy.log(url);
      cy.visit(url);
      cy.origin(url, () =>
      {
        cy.get("div.sub-menu-bar a[href*='about']").click();
      });
    });
  });

  it('Frame Test', () =>
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

  it('Verify date selection', () =>
  {

    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber, date, year];

    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    cy.wait(5000)
    cy.get(".react-date-picker__inputGroup").click();

    cy.get(".react-calendar__navigation__label").click();
    cy.get(".react-calendar__navigation__label").click();
    cy.contains("button", year).click();
    cy.get(".react-calendar__year-view__months__month").eq(Number(monthNumber) - 1).click();
    cy.contains("abbr", date).click();

    //Assertion
    cy.get(".react-date-picker__inputGroup__input").each(($el, index) =>
    {
      cy.wrap($el).invoke('val').should('eq', expectedList[index]);
    })
  });

});