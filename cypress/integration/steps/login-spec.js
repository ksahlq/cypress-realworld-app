context('Try to log in with a created user in database through UI', () => {
    // TODO add a beforeEach that seeds the database with a user. Perhaps as a custom command
    const user = Cypress.env('user')

    // if users have capital letter in their username
    // sets it to lowercase
    function setLowerCase(string) {
        return string.charAt(0).toLowerCase() + string.slice(1)
    }

    beforeEach(() => {
        cy.visit('/login')
    })

    it('Type in wrong credentials', () => {
        cy.get('[data-cy=email]').type('fails@login.com')
        cy.get('[data-cy=password]').type('fakepassword')
        cy.get('[data-cy=submit]').click()

        cy.contains('.error-messages li', 'email or password is invalid')
        cy.url().should('contain', '/login')
    })

    it('Login with a user', () => {                
        cy.get('[data-cy=email]').type(user.email)
        cy.get('[data-cy=password]').type(user.password)
        cy.get('[data-cy=submit]').click()

        cy.url().should('eq', Cypress.config().baseUrl + '/')
        
        cy.get('[data-cy=your-feed]').should('contain', 'Your Feed')        
        cy.get('[data-cy=current-user]').should('have.attr', 'href')
        .and('eq', '/@' + setLowerCase(user.username))

    })        
})