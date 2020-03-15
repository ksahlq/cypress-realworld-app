context('Try to log in with a created user in database through UI', () => {
    // TODO add a beforeEach that seeds the database with a user. Perhaps as a custom command
    const user = Cypress.env('user')

    // lowercase first letter of a string
    function lowercase(string) {
        return string.charAt(0).toLowerCase() + string.slice(1)
    }

    beforeEach(() => {
        cy.visit('/login')
    })

    it('Type in wrong credentials', () => {
        cy.get('input[type="email"]').type('fails@login.com')
        cy.get('input[type="password"]').type('fakepassword')
        cy.get('button[type=submit]').click()
        cy.contains('.error-messages li', 'email or password is invalid')
        cy.url()
        .should('contain', '/login')
    })

    it('Login with a user', () => {                
        cy.get('input[type="email"]').type(user.email)
        cy.get('input[type="password"]').type(user.password)
        cy.get('button[type=submit]').click()
        cy.url()
        .should('eq', Cypress.config().baseUrl + '/')
        cy.get('.feed-toggle > .nav > :nth-child(1) > .nav-link')
        .should('contain', 'Your Feed')
        //cy.get('[data-layer="Content"]')
        cy.get(':nth-child(4) > .nav-link').should('have.attr', 'href')
        .and('eq', '/@' + lowercase(user.username))

    })        
})