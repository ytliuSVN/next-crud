/// <reference types="cypress" />
/// <reference types="cypress" />

describe('playground dashboard', () => {
  beforeEach(() => {
    cy.visit('/playground');
  });

  it('should display modal when add button is clicked', () => {
    cy.contains('button', 'Add').click();
    cy.contains('Create your account').should('be.visible'); // Assert that el is visible
  });
});
