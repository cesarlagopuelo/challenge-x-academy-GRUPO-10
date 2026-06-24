// Custom Commands reutilizables para evitar repetir lógica en los tests.

// LOGIN ADMIN
// Abre el login, carga credenciales desde fixture y valida navegación.

Cypress.Commands.add('loginAdmin', () => {
  // 1. IGNORAR ERROR DE REACT PRIMERO (Escudo activado antes de entrar)
  cy.on('uncaught:exception', (err) => {
    if (err.message.includes('Minified React error #418')) {
      return false
    }
  })

  // 2. Ahora sí visitamos la página de manera segura
  cy.visit('/#/admin', {
    failOnStatusCode: false
  })

  // esperar render REAL de la app (no del input)
  cy.get('body', { timeout: 20000 }).should('exist')

  // FORZAR render del login (reintento real)
  cy.wait(2000)

  // validar existencia REAL del input
  cy.get('input', { timeout: 20000 }).should('exist')

  cy.fixture('adminUser').then((user) => {
    cy.get('#username', { timeout: 20000 }).type(user.username)
    cy.get('#password').type(user.password)
    cy.get('#doLogin').click()
  })
})



// FILL CONTACT FORM
// Completa el formulario usando datos desde fixture.

Cypress.Commands.add('fillContactForm', (contactData) => {

  cy.get('[data-testid="ContactName"]')
    .type(contactData.name)

  cy.get('[data-testid="ContactEmail"]')
    .type(contactData.email)

  cy.get('[data-testid="ContactPhone"]')
    .type(contactData.phone)

  cy.get('[data-testid="ContactSubject"]')
    .type(contactData.subject)

  cy.get('[data-testid="ContactDescription"]')
    .type(contactData.message)

})
