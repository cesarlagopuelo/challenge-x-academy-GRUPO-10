// Contact Form - Automatización del módulo Contact

describe('Contact Form', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('TC-CONT-01 - Envio exitoso del formulario', ()=>{
    // API ASSERTION:
    cy.intercept('POST', '/api/message').as('sendMessage')

    // Completar formulario usando fixture + custom command
    cy.fixture('contactData').then((data) =>{
      cy.fillContactForm(data.validContact)
    })

    cy.get('.d-grid > .btn').click()

    // Validacion backend
    cy.wait('@sendMessage').its('response.statusCode').should('eq', 200)

    // Validacion UI
    cy.contains('Thanks for getting in touch Juan Perez').should('be.visible')

  })

  it('TC-CONT-02 - Formulario vacío', () => {

    // ASSERTIONS UI:
    // Validamos que el sistema muestre errores al enviar vacío

    cy.get('.d-grid > .btn').click()

    cy.get('.alert.alert-danger')
      .should('exist')

    cy.contains('Name may not be blank').should('be.visible')
    cy.contains('Email may not be blank').should('be.visible')
    cy.contains('Phone may not be blank').should('be.visible')
    cy.contains('Subject may not be blank').should('be.visible')
    cy.contains('Message may not be blank').should('be.visible')

    cy.contains('Phone must be between 11 and 21 characters.').should('be.visible')
    cy.contains('Message must be between 20 and 2000 characters.').should('be.visible')
    cy.contains('Subject must be between 5 and 100 characters.').should('be.visible')

  })

  it('TC-CONT-03 - Campo Phone con exactamente 11 caracteres', ()=> {
    // API ASSERTION:
    cy.intercept('POST', '/api/message').as('sendMessage')

    // Completar formulario usando fixture + custom command
    // Se envia un numero de telefono distinto al del fixture con exactamente 11 digitos
    cy.fixture('contactData').then((data) =>{

      const contact11Digits = {
        ...data.validContact, phone: '12345678901'
      }

      cy.fillContactForm(contact11Digits)
    })

    cy.get('.d-grid > .btn').click()

    // Validacion backend
    cy.wait('@sendMessage').its('response.statusCode').should('eq', 200)

    // Validacion UI
    cy.contains('Thanks for getting in touch Juan Perez').should('be.visible')
  })

  it('TC-CONT-04 - Envío de formulario como admin', () => {

    // FIXTURE + CUSTOM COMMAND:
    // Login reutilizable con datos centralizados

    cy.loginAdmin()

    // Navegación al front page
    cy.get('#frontPageLink').click()

    cy.url().should('eq', 'https://automationintesting.online/')

    // API ASSERTION:
    // Validamos que el backend procese el mensaje correctamente

    cy.intercept('POST', '/api/message')
      .as('sendMessage')

    // FIXTURE + CUSTOM COMMAND:
    // Cargamos datos del formulario desde fixture

    cy.fixture('contactData').then((data) => {

      cy.fillContactForm(data.validContact)

    })

    cy.get('.d-grid > .btn').click()

    cy.wait('@sendMessage')
      .its('response.statusCode')
      .should('eq', 200)

    // ASSERTION UI:
    // Validamos mensaje de confirmación en pantalla

    cy.contains('Thanks for getting in touch Juan Perez')
      .should('be.visible')

  })

})