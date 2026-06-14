describe('Smoke Test - Shady Meadows', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('La página abre', () => {
    cy.url().should('include', 'automationintesting.online')
  })

})