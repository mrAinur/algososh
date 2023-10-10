const {
  borderColorCheck,
  urlPath,
  screenViewport,
  circleDefaultSize,
} = require("./utils/constants");

describe("Проверка", () => {
  const testingText = ["A", "B", "C", "D"];
  const TAIL = "tail";
  const HEAD = "head";
  const checkAddCircleAnimation = i => {
    cy.get("li")
      .eq(i)
      .find(circleDefaultSize)
      .should(
        borderColorCheck.haveCss,
        borderColorCheck.border,
        borderColorCheck.pinkBorder,
      );
    cy.get("li").eq(i).contains(TAIL);
    cy.get("li")
      .eq(i)
      .contains(testingText[i])
      .parent("div")
      .should(
        borderColorCheck.haveCss,
        borderColorCheck.border,
        borderColorCheck.blueBorder,
      );
  };
  const checkRemoveCircleAnimation = i => {
    cy.get("li")
      .eq(i)
      .contains(testingText[i])
      .parent("div")
      .should(
        borderColorCheck.haveCss,
        borderColorCheck.border,
        borderColorCheck.pinkBorder,
      );
    cy.get("li").eq(i).contains(HEAD);
    cy.get("li")
      .eq(i)
      .find(circleDefaultSize)
      .should(
        borderColorCheck.haveCss,
        borderColorCheck.border,
        borderColorCheck.blueBorder,
      );
  };

  beforeEach(() => {
    cy.viewport(screenViewport.width, screenViewport.height);
    cy.visit(urlPath.queue);
  });

  it("Недоступности кнопки добавления при пустом инпуте", () => {
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
        .find(circleDefaultSize)
        .should(
          borderColorCheck.haveCss,
          borderColorCheck.border,
          borderColorCheck.blueBorder,
        );
      cy.get("@circle")
        .find(circleDefaultSize)
        .find(".text_type_circle")
        .should("be.empty");
    });
  });
});
