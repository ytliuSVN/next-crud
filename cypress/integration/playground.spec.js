/// <reference types="cypress" />

describe('User Card', () => {
  beforeEach(() => {
    cy.visit('/playground');
  });

  it('should display modal when add button is clicked', () => {
    cy.contains('button', 'Add').click();
    cy.contains('Create your account').should('be.visible'); // Assert that el is visible
  });

  it('should display user card when new user is added', () => {
    cy.contains('button', 'Add').click();
    cy.get(`input[placeholder='Username']`).type('Sebastien');
    cy.contains('Save Changes').click();
    cy.contains('Sebastien')
      .should('be.visible')
      .invoke('attr', 'class')
      .should('contain', 'UserCard__habit-container');
    // .and('have.class', 'UserCard__habit-container');
  });

  it('should toggle icon when user card is clicked', () => {
    cy.contains('button', 'Add').click();
    cy.get(`input[placeholder='Username']`).type('Sebastien');
    cy.contains('Save Changes').click();
    cy.contains('Sebastien').click();
    cy.getByTestId('ViewOffIcon').should('be.visible');
    cy.contains('Sebastien').click();
    cy.getByTestId('ViewIcon').should('be.visible');
  });
});
