context('Login to page and store token', () => {
    it('Visit the login page', () => {
        cy.visit('/login')
        cy.url().should('eq', Cypress.config().baseUrl + '/login')
    })

    it('Login via UI', () => {
        cy.visit('/login')
        .get('input[type="email"]')
        .type('ibrahim@login.login')
        .get('input[type="password"]')
        .type('1234{enter}')
        .get('ul[class="error-messages"]')
        .should('contain', 'invalid')
    })

    it('Login using API', () => {                 
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