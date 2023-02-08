//On génère un nom aléatoire pour le test
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
function generateString(length) {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
let randomName = generateString(5);

const deleteUrl = `${Cypress.env("API_URL")}/delete-user-by-email/${randomName}@email.com`;

describe("The register client form", () => {
  it("should submit the client form successfully and delete the generated user", () => {
    cy.visit("/registerclient");
    cy.get("input[name=lastname]").type(randomName);
    cy.get("input[name=firstname]").type(randomName);
    cy.get("input[name=email]").type(randomName + "@email.com");
    cy.get("input[name=password]").type("pa$$word!");
    cy.get("input[name=confirmedPassword]").type("pa$$word!");
    cy.get("button[type=submit]").click();
    cy.get("p#success").should(
      "contain",
      "Votre compte a bien été créé, merci de le vérifier grâce au lien envoyé dans votre boîte mail."
    );
    cy.request( "DELETE", deleteUrl);
  });
});
