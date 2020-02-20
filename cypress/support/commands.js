// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const apiUrl = Cypress.env('apiUrl')

Cypress.Commands.add('login', (user = Cypress.env('user')) => {
    cy.getLoginToken(user).then(token => {
        localStorage.setItem('jwt', token)
    })

    cy.visit('/')
    // TODO add cy-data attribute to "Your Feed". Then use that to assert if we are logged in
})

Cypress.Commands.add('getLoginToken', (user = Cypress.env('user')) => {
    return cy.request({
            method: "POST",
            url: `${apiUrl}/api/users/login`,
            body: {
                user: Cypress._.pick(user, ['email', 'password'])
            }            
        })
        .its('body.user.token')
        .should('exist')
})