/// <reference types="cypress" />

// Différentes pages que le visiteur ne dois pas avoir accès
const protectedPages = ['/planning', '/matches', '/results', '/profile', '/change-password', '/admin']

describe('Parcours visiteur', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
  })

  it("peut consulter la page d'accueil", () => {
    cy.visit('/')
    // verification que le visteur voit bien la page d'acceuil
    cy.contains('h1', 'Corpo Padel').should('be.visible')
    cy.get('[data-cy="home-login"]').should('be.visible')
    cy.get('[data-cy="nav-login"]').should('be.visible')
    cy.contains('Connectez-vous pour accéder au planning, aux matchs et au classement.').should('be.visible')

    // verification que le visiteur ne vois pas les bouttons/liens planning, matchs, resultats
    cy.get('[data-cy="nav-admin"]').should('not.exist')

    cy.get('nav a[href="/planning"]').should('not.exist')
    cy.get('nav a[href="/matches"]').should('not.exist')
    cy.get('nav a[href="/results"]').should('not.exist')
    cy.get('[data-cy="nav-admin"]').should('not.exist')
  })

  protectedPages.forEach(protectedPage => {
    it(`est redirigé vers la connexion lorsqu'il ouvre la page ${protectedPage}`, () => {
        cy.visit(protectedPage)

        cy.url().should('include', '/login')
        cy.get('[data-cy="email"]').should('be.visible')
        cy.get('[data-cy="password"]').should('be.visible')
    })
  });
})
