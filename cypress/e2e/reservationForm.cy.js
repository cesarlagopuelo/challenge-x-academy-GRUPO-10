describe('Reservation Form', () => {
  beforeEach(() => {
    cy.navegateToReservationForm()
  })
  
  it("TC-RES-01 - Reserva exitosa con datos válidos", () => {
    cy.intercept('POST', '**/booking').as('crearReserva')
    cy.fixture('reservationData').then((datos) => {
       const valid = datos.validReservation
       cy.get('[name="firstname"]').type(valid.nombre)
       cy.get('[name="lastname"]').type(valid.apellido)
       cy.get('[name="email"]').type(valid.email)
       cy.get('[name="phone"]').type(valid.telefono)
     })
    cy.get('.btn-primary').click()
    cy.wait('@crearReserva').its('response.statusCode').should('eq', 201)
    // Validación de reserva exitosa
    cy.contains('Booking Confirmed').should('be.visible')

  })
  it("TC-RES-02 - Reserva con campos vacíos", () => {
    cy.get('.btn-primary').click()
    // Validación de errores por campos vacíos
    cy.contains('Firstname should not be blank').should('be.visible')
    cy.contains('Lastname should not be blank').should('be.visible')
    cy.contains('must not be empty').should('be.visible')
    })
})