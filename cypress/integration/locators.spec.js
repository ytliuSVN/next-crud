/// <reference types="cypress" />

describe('Locators', () => {
  beforeEach(() => {
    cy.visit('/create');
  });

  it('locating elements with get', () => {
    // Get all elements by tag name AND class
    cy.get('button.chakra-button');

    // Get all elements by tag name AND class and id
    cy.get('button.chakra-button#reviews');

    // Get all elements with specific data test id
    cy.get("[data-cy='signIn']");
  });
});
