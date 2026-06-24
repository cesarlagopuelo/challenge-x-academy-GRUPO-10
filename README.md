# Challenge X Academy - Grupo 10

Proyecto final realizado para la Cohorte I - 2026 de X Academy utilizando Cypress para automatización de pruebas sobre la aplicación Shady Meadows.

## Aplicación bajo prueba

https://automationintesting.online/

Shady Meadows es una aplicación web de reservas para un Bed & Breakfast que permite realizar reservas de habitaciones, enviar consultas mediante formulario de contacto y administrar información desde un panel de administración.

---

## Objetivo del proyecto

Aplicar los conocimientos adquiridos durante el curso de  QA Automation realizando:

* Diseño y ejecución de casos de prueba.
* Reporte de bugs.
* Automatización de pruebas UI.
* Automatización y validación de APIs.
* Trabajo colaborativo utilizando Git y GitHub.

---

## Alcance de la automatización

Se automatizaron los siguientes módulos:

### Contact Form

* TC-CONT-01
* TC-CONT-02
* TC-CONT-03
* TC-CONT-04

Incluye validaciones de interfaz y validaciones de API utilizando interceptaciones de red.

### Reservations

* TC-RES-01
* TC-RES-02

Incluye validaciones funcionales del flujo de reserva y verificaciones sobre las respuestas de la API.

---

## Tecnologías utilizadas

* Cypress
* JavaScript
* Node.js
* Git
* GitHub

---

## Estructura del proyecto

```text
cypress/
│
├── e2e/
│   ├── contact-form.cy.js
│   ├── reservationForm.cy.js
│   └── smoke.cy.js
│
├── fixtures/
│
├── support/
│   ├── commands.js
│   ├── reservationCommands.js
│   └── e2e.js
│
└── screenshots/
```

## Manejo de error detectado en la aplicación

Durante el inicio del proyecto se detectó un error conocido de la aplicación que provocaba una excepción no controlada y generaba fallos en la ejecución de Cypress.

Para permitir la ejecución estable de los casos de prueba se implementó una excepción controlada dentro de Cypress, evitando que dicho error interrumpiera la automatización.

Esta configuración fue utilizada únicamente para aislar un defecto propio de la aplicación y no afecta las validaciones realizadas por los tests.

---

## Casos de prueba

Plan de pruebas:

https://docs.google.com/spreadsheets/d/1YMLNJtzOx7gT5zRUlPXvHeugUPzXEBAtB94W1IstnN0/edit?usp=sharing

---

## Reporte de Bugs

Tablero Trello:

https://trello.com/b/RlWmJdwu

---

## Integrantes

### Alexis Aragon Rodriguez

mail:alexisaragon79@gmail.com

### Cesar Alvarez

mail:testinglagopuelo@gmail.com

### Johana Castillo

mail:Johana_castillo.9@outlook.es

### Malena Bustamante

mail:bustamante.malena1@gmail.com

### Priscila Rodríguez

mail:rodriguezpris10@gmail.com

### Vanina Torres

mail:vaniitorres@gmail.com

---

## Estado del proyecto

Proyecto desarrollado como trabajo final de la Cohorte I - 2026 de X Academy.
Todos los casos automatizados incluidos en el alcance fueron ejecutados satisfactoriamente al momento de la entrega.
