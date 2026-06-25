// reserva.cy.js
// Módulo de Reservas - Shady Meadows
// Challenge Final QA Automation - Grupo N° 10

Cypress.on('uncaught:exception', (err) => {

  if (
    err.message.includes("Cannot read properties of undefined") ||
    err.message.includes("Minified React error #418")
  ) {
    return false
  }

})

describe('Módulo de Reservas - Shady Meadows', () => {

  // TC-Res-01
  
  it('Reserva exitosa como usuario invitado', () => {

    cy.fixture('reservas').then((reservas) => {

      const datosReserva = reservas.invitadoValido;

    // 1. Navegar a la página principal (usa baseUrl de cypress.config.js)
    cy.visit('/');
    // 2. Seleccionamos fecha de reserva
    cy.seleccionarFecha('1', '3');
    // 3. Interceptar la llamada a la API ANTES de hacer la reserva
    cy.intercept('POST', '**/api/booking').as('crearReserva')
    // 4. Seleccionar la primera habitación y abrir el formulario
    cy.completarReserva(datosReserva);
    // 5. Verificación de API: el servidor respondió 201 (Created)
    cy.wait('@crearReserva').its('response.statusCode').should('eq', 201);
    // 6. Verificación de UI: el mensaje de éxito se ve
    cy.contains('Booking Confirmed').should('be.visible');
    });

  });

  // TC-Res-02

  it('Intento de reserva con formulario vacío', () => {
    cy.visit('/');
    cy.seleccionarFecha('4', '6');

    cy.intercept('POST', '**/api/booking').as('crearReserva');

    cy.get('.col-8 > .btn').click();
    cy.get(':nth-child(1) > .card > .card-footer > .btn').click();
    cy.get('.btn-primary').click();
    cy.get('.btn-primary').click();

    cy.contains('size must be between 3 and 18').should('be.visible');
    cy.contains('size must be between 3 and 30').should('be.visible');
    cy.contains('must not be empty').should('be.visible');
  });

  // TC-Res-03

  it('Validación de límites de caracteres (Nombre min: 3, Apellido max: 30)', () => {
    cy.fixture('reservas').then((reservas) => {
      const datosReserva = reservas.invitadoBorde;

      cy.visit('/');
      cy.seleccionarFecha('7', '9');

      cy.intercept('POST', '**/api/booking').as('crearReserva');

      cy.completarReserva(datosReserva);
      cy.wait('@crearReserva').its('response.statusCode').should('eq', 201);
      cy.contains('Booking Confirmed').should('be.visible');
    });

  });

  //TC-Res-04

  it('Validación de límite inferior en el campo teléfono (10 dígitos)', () => {
  
    cy.fixture('reservas').then((reservas) => {
      const datosReserva = reservas.invitadoTelefono10;

      cy.visit('/');
      cy.seleccionarFecha('016', '018');

      cy.intercept('POST', '**/api/booking').as('crearReserva');

      cy.completarReserva(datosReserva);

      cy.contains('size must be between 11 and 21').should('be.visible');
      cy.contains('Booking Confirmed').should('not.exist');
      cy.wait('@crearReserva').its('response.statusCode').should('eq', 400);

    });
  
  });

  // TC-Res-08

  it('Intento de reserva ingresando caracteres alfabéticos en el campo de teléfono', () => {
    cy.fixture('reservas').then((reservas) => {
      const datosReserva = reservas.invitadoTelefonoLetras;

      cy.visit('/');
      cy.seleccionarFecha('10', '12');

      cy.intercept('POST', '**/api/booking').as('crearReserva');

      cy.completarReserva(datosReserva);
      cy.wait('@crearReserva').its('response.statusCode').should('eq', 201);
      cy.contains('Booking Confirmed').should('be.visible');
    });
  });



  // TC-Res-07

  it('Intento de reserva con fechas invertidas (documenta bug 409)', () => {
  
    cy.visit('/');

    const checkoutInvalido = '2025-01-01';
    const checkinValido = '2025-01-05';

    cy.get(':nth-child(1) > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control')
      .clear().type(checkinValido);
    cy.get(':nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control')
      .clear().type(checkoutInvalido);

    cy.intercept('POST', '**/api/booking').as('reservaInvertida');

    cy.fixture('reservas').then((reservas) => {
      const datosReserva = reservas.invitadoValido;
      cy.completarReserva(datosReserva);
    });

    cy.wait('@reservaInvertida').its('response.statusCode').should('eq', 409);
    cy.screenshot('bug-fechas-invertidas-409');
    cy.contains('Booking Confirmed').should('not.exist');
  });

  

});


describe('Bug Pantalla Negra - Reserva Duplicada', () => {

  // TC-Res-09

  it('Debería mostrar un mensaje de error, pero muestra pantalla negra', () => {
    // 1. Primero, creamos una reserva exitosa para ocupar una fecha
    cy.fixture('reservas').then((reservas) => {
      const datosReserva = reservas.invitadoBugPantallaNegra;

      cy.visit('/');
      cy.seleccionarFecha('020', '022');
      cy.intercept('POST', '**/api/booking').as('crearReservaInicial');
      cy.completarReserva(datosReserva);
      cy.wait('@crearReservaInicial').its('response.statusCode').should('eq', 201);
      cy.contains('Booking Confirmed').should('be.visible');

      // 2. Ahora, intentamos reservar las MISMAS fechas para forzar el bug
      cy.visit('/');
      cy.seleccionarFecha('020', '022');
      cy.intercept('POST', '**/api/booking').as('reservaDuplicada');

      // Usamos el comando completarReserva pero con un invitado diferente
      const datosReservaBug = reservas.invitadoValido;
      cy.completarReserva(datosReservaBug);

      // 3. Verificamos que la API responde 409 (Conflict) y documentamos
      cy.wait('@reservaDuplicada').then((interception) => {
        expect(interception.response.statusCode).to.eq(409); // Documentamos el error
      });

      // 4. Tomamos captura de pantalla como evidencia para Trello
      cy.screenshot('bug-reserva-duplicada-pantalla-negra');
    });
  });
});