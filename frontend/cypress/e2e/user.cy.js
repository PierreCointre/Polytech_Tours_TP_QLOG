/// <reference types="cypress" />

describe('Parcours utilisateur', () =>{
    beforeEach(( )=> {
        //connexion en tant que user
        cy.visit('/login')
        cy.get('[data-cy="email"]').type('joueur@padel.com')
        cy.get('[data-cy="password"]').type('Joueur@2025!')
        cy.get('[data-cy="submit"]').click()

        ///verifie que la connexion a marché
        cy.url().should('not.include', '/login')
        cy.get('[data-cy="logout"]').should('be.visible')
    })

    it("peut consulter la page d'acceuil", ()=>{
        cy.visit('/')

        cy.contains('h1', 'Corpo Padel').should('be.visible')
        cy.get('[data-cy="home-login"]').should('not.exist')
        cy.get('[data-cy="nav-login"]').should('not.exist')

        //verification que le user peut voir les boutons de nav
        cy.get('nav a[href="/planning"]').should('exist')
        cy.get('nav a[href="/matches"]').should('exist')
        cy.get('nav a[href="/results"]').should('exist')

        // verification que le visiteur ne vois pas la nav admin
        cy.get('[data-cy="nav-admin"]').should('not.exist')
    })


    it("redirection vers l'acceuil si tent d'aller sur l'admin", () => {
        cy.visit('/admin')
        cy.url().should('not.include', '/admin')
    })

    
    // Just la verification des titres suffits pour l'instant (phase 4)
    it("peut consulter la page planning", () => {
        cy.visit('/planning')
        cy.contains('h1', 'Planning').should('be.visible')
    })

    it("peut consulter la page matches", () => {
        cy.visit('/matches')
        cy.contains('h1', 'Matchs').should('be.visible')
    })

    it("peut consulter la page resultats", () => {
        cy.visit('/results')
        cy.contains('h1', 'Résultats').should('be.visible')
    })

    it("peut consulter la page profile", () => {
        cy.visit('/profile')
        cy.contains('h1', 'Mon profil').should('be.visible')
    })

    it("peut consulter la page change-password", () => {
        cy.visit('/change-password')
        cy.contains('h1', 'Changer mon mot de passe').should('be.visible')
    })


})