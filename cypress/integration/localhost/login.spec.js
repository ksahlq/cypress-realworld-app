context('Try to log in with a user that is not in database', () => {
    it('Visit the login page', () => {
        cy.visit('/login')
        cy.url().should('eq', Cypress.config().baseUrl + '/login')
    })

    it('Try to login via UI with a user that does not exist ', () => {
        cy.visit('/login')
        .get('input[type="email"]')
        .type('ibrahim@login.login')
        .get('input[type="password"]')
        .type('1234{enter}')
        .get('ul[class="error-messages"]')
        .should('contain', 'invalid')
    })

    it('Try to login via API with user that does not exist', () => {                 
        cy.request({
            method: "POST",
            url: Cypress.env('apiUrl') + '/api/users/login',
            body: {
                "user": {
                    "email": "ibrahim@login.login",
                    "password": "1234"
                }
            }
        })
    })
})