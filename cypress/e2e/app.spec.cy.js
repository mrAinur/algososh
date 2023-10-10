const { urlPath, screenViewport } = require("./utils/constants");

describe("service is available", () => {
  it("should be available on localhost:3000", () => {
    cy.viewport(screenViewport.width, screenViewport.height);
    cy.visit(urlPath.main);
  });
});
