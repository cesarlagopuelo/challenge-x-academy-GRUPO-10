import './commands'
import './reservationCommands'
import './commands/reservation.commands';



// IGNORAR ERRORES DE REACT QUE ROMPEN LA UI (APP BUG)
Cypress.on('uncaught:exception', (err) => {

  
  if (err.message.includes('Minified React error #418')) {
    return false
  }

  return true
})
