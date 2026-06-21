// Custom Commands reutilizables para evitar repetir lógica en los tests.

// LOGIN ADMIN
// Abre el login, carga credenciales desde fixture y valida navegación.

Cypress.Commands.add('loginAdmin', () => {

  cy.fixture('adminUser').then((user) => {

    cy.get(':nth-child(6) > .nav-link').click()

    cy.get('#username').type(user.username)
    cy.get('#password').type(user.password)

    cy.get('#doLogin').click()

    // Validamos que el login terminó correctamente
    cy.url().should('include', '/admin/rooms')

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