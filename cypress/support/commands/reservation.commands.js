Cypress.Commands.add('completarReserva', (datos) => {
    cy.get('button').contains('Check Availability').click();
    cy.get('#rooms > .container > .row').contains('Book now').click();
    cy.get('#doReservation').contains('Reserve Now').click();
    cy.get('input[name="firstname"]').type(datos.firstname);
    cy.get('input[name="lastname"]').type(datos.lastname);
    cy.get('input[name="email"]').type(datos.email);
    cy.get('input[name="phone"]').type(datos.phone);
    cy.get('button').contains('Reserve Now').click();
});

// Cypress.Commands.add('seleccionarFecha', () => {
//     cy.get(':nth-child(1) > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control').click();
//     cy.get('.react-datepicker__navigation--next').click();
//     cy.get(':nth-child(1) > .react-datepicker__day--001').click()
//     cy.get(':nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control').click();
//     cy.get('.react-datepicker__navigation--next').click();
//     cy.get(':nth-child(1) > .react-datepicker__day--003').click()
// });

// Cypress.Commands.add('seleccionarFecha2', () => {
//     cy.get(':nth-child(1) > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control').click();
//     cy.get('.react-datepicker__navigation--next').click();
//     cy.get(':nth-child(1) > .react-datepicker__day--005').click()
//     cy.get(':nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control').click();
//     cy.get('.react-datepicker__navigation--next').click();
//     cy.get('.react-datepicker__day--010').click()
// });

// Cypress.Commands.add('seleccionarFecha', (diaInicio , diaFin ) => {
//     cy.get(':nth-child(1) > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control').click();
//     cy.get('.react-datepicker__navigation--next').click();
//     cy.get(`:nth-child(1) > .react-datepicker__day--${diaInicio}`).click();
//     cy.get(':nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control').click();
//     cy.get('.react-datepicker__navigation--next').click();
//     cy.get(`.react-datepicker__day--${diaFin}`).click();
// });

Cypress.Commands.add('seleccionarFecha', (diasDesdeHoyInicio = 1, diasDesdeHoyFin = 3) => {
    const hoy = new Date(); // Esta variable SIEMPRE parte de hoy

    const checkin = new Date(hoy);
    checkin.setDate(hoy.getDate() + diasDesdeHoyInicio); // Suma los días directamente

    const checkout = new Date(hoy);
    checkout.setDate(hoy.getDate() + diasDesdeHoyFin); // Suma los días directamente

    const checkinStr = checkin.toISOString().split('T')[0];
    const checkoutStr = checkout.toISOString().split('T')[0];

    cy.get(':nth-child(1) > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control')
      .clear().type(checkinStr);
    cy.get(':nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control')
      .clear().type(checkoutStr);
});