describe('Admin - Rooms', () => {
  beforeEach(() => {
    cy.fixture('adminUser').then((admin) => {
      cy.visit('https://automationintesting.online/admin')
      cy.get('#username').type(admin.username)
      cy.get('#password').type(admin.password)
      cy.get('button[type="submit"]').click()
    })
  })

  it('Crear habitación con datos válidos', () => {
    cy.contains('Rooms').click()
    // Llenar formulario de nueva habitación
    cy.get('#roomName').type('01 Prueba')
    cy.get('#roomPrice').type('120')
    cy.get(':nth-child(1) > :nth-child(1) > .form-check > [name="featureCheck"]').click() // Wifi
    cy.get(':nth-child(1) > :nth-child(2) > .form-check > [name="featureCheck"]').click() // TV
    cy.get(':nth-child(2) > :nth-child(1) > .form-check > [name="featureCheck"]').click() // Refrescos
    cy.get('button[type="submit"]').click()

    // Validar que la habitación aparece en el listado
    cy.contains('01 Prueba').should('exist')
  })
})