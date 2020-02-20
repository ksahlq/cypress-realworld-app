context('Try to log in with a created user in database', () => {
    // TODO add a beforeEach that seeds the database with a user. Perhaps as a custom command

    it('Visit the login page', () => {
        cy.visit('/login')
        cy.url()
        .should('eq', Cypress.config().baseUrl + '/login')
    })

    it('Try to login via UI', () => {
        const user = Cypress.env('user')
        cy.visit('/login')
        .get('input[type="email"]').type(user.email)
        .get('input[type="password"]').type(user.password)
        .get('button[type=submit]').click()
        cy.url()
        .should('eq', Cypress.config().baseUrl + '/')
    })        

    it('Try to login via API', () => {                 
        cy.login()
    })
})