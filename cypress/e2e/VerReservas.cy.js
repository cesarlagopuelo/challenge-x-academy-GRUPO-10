describe('Admin - Bookings', () => {
  beforeEach(() => {
    cy.fixture('adminUser').then((admin) => {
      cy.visit('https://automationintesting.online/admin')
      cy.get('#username').type(admin.username)
      cy.get('#password').type(admin.password)
      cy.get('button[type="submit"]').click()
    })
  })

  it('Ver reservas en varias habitaciones', () => {
    // Entrar a la primera habitación
    cy.get(':nth-child(2) > [data-testid="roomlisting"] > :nth-child(1)').click()
    cy.get('.row').should('exist')
    // Volver a Rooms
    cy.contains('Rooms').click()
    // Entrar a la segunda habitación
    cy.get(':nth-child(3) > [data-testid="roomlisting"] > :nth-child(1)').click()
    cy.get('.row').should('exist')
    // Volver a Rooms
    cy.contains('Rooms').click()
    // Entrar a la tercera habitación
    cy.get(':nth-child(4) > [data-testid="roomlisting"] > :nth-child(1)').click()
  })
})
