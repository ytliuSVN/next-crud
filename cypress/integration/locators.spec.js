/// <reference types="cypress" />

describe('Locators', () => {
  beforeEach(() => {
    cy.visit('/create');
  });

  it('locating elements with get', () => {
    // Get all elements by tag name
    cy.get('button');
    cy.get('h2');

    // Get all elements by className
    cy.get('.chakra-button');

    // Get all elements by id
    cy.get('#signIn');
  });
});
