describe('Acceso no autorizado', () => {
  it('Redirige al login si no hay sesión', () => {
    cy.visit('https://automationintesting.online/admin/rooms', { failOnStatusCode: false })
    cy.url().should('include', '/admin')
    cy.contains('Login').should('be.visible')
  })
})
