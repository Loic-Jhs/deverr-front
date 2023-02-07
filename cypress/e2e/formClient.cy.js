
describe("The register client form", () => {
  it("should submit the client form successfuly", () => {
    cy.visit('/registerclient')
    cy.get('input[name=lastname]').type("Doe")
    cy.get('input[name=firstname]').type("John")
    cy.get('input[name=email]').type("john.doe@email.com")
    cy.get('input[name=password]').type("pa$$word!")
    cy.get('input[name=confirmedPassword]').type("pa$$word!")
    cy.get('button[type=submit]').click()
    cy.get('p#success').should('contain', 'Votre compte a bien été créé, merci de le vérifier grâce au lien envoyé dans votre boîte mail.')
  })
})
