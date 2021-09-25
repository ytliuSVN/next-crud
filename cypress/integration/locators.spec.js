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
    // cy.get("[data-cy='signIn']");

    // create custom command
    cy.getByTestId('signIn');
  });

  it('locating elements with contain', () => {
    // Get element by text
    // .contains(content)
    cy.contains('Sign In');

    // With Selector
    // cy.contains(selector, content)
    // cy.contains("[type='submit']", 'Text');
    // cy.get("[type='submit']").contains('Text');
  });
});
