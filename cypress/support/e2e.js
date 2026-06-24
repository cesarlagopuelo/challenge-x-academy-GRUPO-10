import './commands'
import './reservationCommands'
import './commands/reservation.commands';

// Ignoramos un error conocido de la aplicación
// para que no haga fallar los casos de prueba.

Cypress.on('uncaught:exception', (err) => {

  if (err.message.includes('Minified React error #418')) {
    return false
  }

})
