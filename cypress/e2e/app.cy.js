describe("service is available", () => {
  it("should be available on localhost:3000", () => {
    cy.viewport(1480, 850);
    cy.visit("http://localhost:3000");
  });
});
