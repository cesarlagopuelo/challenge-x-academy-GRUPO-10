describe ('Login Admin ', ()=>{

    beforeEach(()=>{
        cy.visit('https://automationintesting.online/admin')
    })

    it('Login exitoso', () => {
        cy.loginAdmin()
        cy.url().should('include', '/admin/rooms')
    })

    it('Login con contraseña vacia', () => {
        cy.fixture('adminUser').then((user) => {
            cy.get('#username').type(user.username)
            cy.get('#doLogin').click()
            cy.get('.alert').should('be.visible').and('contain','Invalid credentials')
        })
    })

     it('Login con datos vacios', () => {
            cy.get('#doLogin').click()
            cy.get('.alert').should('be.visible').and('contain','Invalid credentials')
        })

        it('Login con contraseña vacia', () => {
        cy.fixture('adminUser').then((user) => {
            cy.get('#username').type(user.username)
             cy.get('#password').type('123456')
            cy.get('#doLogin').click()
            cy.get('.alert').should('be.visible').and('contain','Invalid credentials')
        })
    })
    })