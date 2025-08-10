describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html")
  })

  it("verifica o título da aplicação", () => {
    cy.title("Central de Atendimento ao Cliente TAT").should(
      "be.equal",
      "Central de Atendimento ao Cliente TAT"
    )
  })

  it("preenche os campos obrigatórios e envia o formulário", () => {
    const LongText = Cypress._.repeat("abcdefghijlopqrstuvxz", 10)

    cy.get("#firstName").type("Ricardo")
    cy.get("#lastName").type("Silva")
    cy.get("#email").type("ric@exemplo.com")
    cy.get("#open-text-area").type(LongText, { delay: 0 })
    cy.get('button[type="submit"]').click()
    cy.get(".success").should("be.visible")
  })

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#firstName").type("Ricardo")
    cy.get("#lastName").type("Silva")
    cy.get("#email").type("ric@ric,com")
    cy.get("#open-text-area").type("Teste")
    cy.get('button[type="submit"]').click()
    cy.get(".error").should("be.visible")
  })

  it("campo telefone continua vazio quando preechido com um valor não-númerico", () => {
    cy.get("#phone").type("abcde").should("have.value", "")
  })

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("Ricardo")
    cy.get("#lastName").type("Silva")
    cy.get("#email").type("ric@ric.com")
    cy.get("#phone-checkbox").check()
    cy.get("#open-text-area").type("Teste")
    cy.get('button[type="submit"]').click()
    cy.get(".error").should("be.visible")
  })

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("Ricardo")
      .should("have.value", "Ricardo")
      .clear()
      .should("have.value", "")
    cy.get("#lastName")
      .type("Silva")
      .should("have.value", "Silva")
      .clear()
      .should("have.value", "")
    cy.get("#email")
      .type("ric@ric.com")
      .should("have.value", "ric@ric.com")
      .clear()
      .should("have.value", "")
    cy.get("#phone")
      .type("83999442275")
      .should("have.value", "83999442275")
      .clear()
      .should("have.value", "")
  })

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.get('button[type="submit"]').click()
    cy.get(".error").should("be.visible")
  })

  it("envia o formuário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit()
  })
})
