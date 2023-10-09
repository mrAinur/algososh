describe("Проверка", () => {
  const testingText = ["A", "B", "C"];
  const pathUrl = "http://localhost:3000/stack";
  const checkCircleAnimation = i => {
    cy.get("li")
      .eq(i)
      .contains(testingText[i])
      .parent("div")
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.get("li").eq(i).contains("top");
    cy.get("li")
      .eq(i)
      .contains(testingText[i])
      .parent("div")
      .should("have.css", "border", "4px solid rgb(0, 50, 255)");
  };

  beforeEach(() => {
    cy.viewport(1450, 860);
    cy.visit(pathUrl);
  });

  it("Недоступности кнопки добавления при пустом  инпуте", () => {
    if (cy.get("input").should("be.empty"))
      cy.contains("Добавить").should("be.disabled");
  });

  it("Правильности добавления элемента с стек", () => {
    for (let i = 0; i < testingText.length; i++) {
      cy.get("input").type(testingText[i]);
      cy.contains("Добавить").click();
      checkCircleAnimation(i);
    }
  });

  it("Правильности удаления элемента из стека", () => {
    for (let i = 0; i < testingText.length; i++) {
      cy.get("input").type(testingText[i]);
      cy.contains("Добавить").click();
      checkCircleAnimation(i);
    }
    for (let i = 0; i < testingText.length; i++) {
      const end = testingText.length - 1 - i;
      cy.contains("Удалить").click();
      cy.get("li")
        .eq(end)
        .contains(testingText[end])
        .parent("div")
        .should("have.css", "border", "4px solid rgb(210, 82, 225)");
      if (end === 0) {
        cy.get("ul").should("be.empty");
        break;
      }
      cy.get("li").eq(end).should("not.exist");
    }
  });

  it("Правильности удаления всех элементов из стека", () => {
    for (let i = 0; i < testingText.length; i++) {
      cy.get("input").type(testingText[i]);
      cy.contains("Добавить").click();
      checkCircleAnimation(i);
    }
    cy.contains("Очистить").click();
    cy.get("ul").should("be.empty");
  });
});
