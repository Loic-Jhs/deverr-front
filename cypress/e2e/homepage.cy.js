describe('The Home Page', () => {
  it('Successfully loads', () => {
    cy.visit('/')
    cy.get('[data-cy=cardList]').should('be.visible')
  });
})