describe("Проверка", () => {
  const pathUrl = "http://localhost:3000/queue";
  const testingText = ["A", "B", "C", "D"];
  const TAIL = "tail";
  const HEAD = "head";
  const checkAddCircleAnimation = i => {
    cy.get("li")
      .eq(i)
      .find("[class^=circle_circle__]")
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.get("li").eq(i).contains(TAIL);
    cy.get("li")
      .eq(i)
      .contains(testingText[i])
      .parent("div")
      .should("have.css", "border", "4px solid rgb(0, 50, 255)");
  };
  const checkRemoveCircleAnimation = i => {
    cy.get("li")
      .eq(i)
      .contains(testingText[i])
      .parent("div")
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.get("li").eq(i).contains(HEAD);
    cy.get("li")
      .eq(i)
      .find("[class^=circle_circle__]")
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

  it("Правильности добавления элемента в очередь", () => {
    for (let i = 0; i < testingText.length; i++) {
      cy.get("input").type(testingText[i]);
      cy.contains("Добавить").click();
      checkAddCircleAnimation(i);
      if (i === 0) cy.get("li").eq(0).contains(HEAD);
    }
  });

  it("Правильности удаления элемента из очереди", () => {
    for (let i = 0; i < testingText.length; i++) {
      cy.get("input").type(testingText[i]);
      cy.contains("Добавить").click();
      checkAddCircleAnimation(i);
      if (i === 0) cy.get("li").eq(0).contains(HEAD);
    }

    for (let i = 0; i < testingText.length; i++) {
      cy.get("input").type(testingText[i]);
      cy.contains("Удалить").click();
      checkRemoveCircleAnimation(i);
      if (i !== testingText.length - 1)
        cy.get("li")
          .eq(i + 1)
          .contains(HEAD);
    }
  });

  it("Правильности очистки очереди", () => {
    for (let i = 0; i < testingText.length; i++) {
      cy.get("input").type(testingText[i]);
      cy.contains("Добавить").click();
      checkAddCircleAnimation(i);
      if (i === 0) cy.get("li").eq(0).contains(HEAD);
    }

    cy.contains("Очистить").click();
    cy.get("ul>li").each(li => {
      cy.get(li).as("circle");
      cy.get("@circle")
        .find("[class^=circle_circle__]")
        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      cy.get("@circle")
        .find("[class^=circle_circle__]")
        .find(".text_type_circle")
        .should("be.empty");
    });
  });
});
