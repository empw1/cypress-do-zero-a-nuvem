Cypress.Commands.add("fillMandatoryFieldsAndSubmit", () => {
  cy.get("#firstName").type("João")
  cy.get("#lastName").type("Silva")
  cy.get("#email").type("joao.silva@exemplo.com")
  cy.get("#open-text-area").type(
    "Teste de preenchimento automático do formulário"
  )
  cy.contains("button", "Enviar").click()

  cy.get(".success").should("be.visible")
})
