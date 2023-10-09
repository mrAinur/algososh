describe("Проверка", () => {
  const testingText = ["c", "h", "e", "c", "k"];
  const pathUrl = "http://localhost:3000/recursion";
  const checkCircleChanging = i => {
    cy.get("li")
      .eq(i)
      .contains(testingText[i])
      .parent("div")
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");
  };
  const checkCircleModified = (index, letter) => {
    cy.get("li")
      .eq(index)
      .contains(testingText[letter])
      .parent("div")
      .should("have.css", "border", "4px solid rgb(127, 224, 81)");
  };

  beforeEach(() => {
    cy.viewport(1450, 860);
    cy.visit(pathUrl);
  });

  it("недоступности кнопки обновления при пустом инпуте", () => {
    if (cy.get("input").should("be.empty"))
      cy.contains("Развернуть").should("be.disabled");
    cy.get("input").type(testingText.join(""));
    if (cy.get("input").should("have.value", testingText.join("")))
      cy.contains("Развернуть").click();
  });

  it("корректного разворота строки", () => {
    //Вводим в инпут текст из шаблона
    cy.get("input").type(testingText.join(""));

    //Кликаем на кнопку вызова функции разворота строки
    cy.contains("Развернуть").click();

    //Проверяем остальные элементы в начале алгоритма
    for (let i = 1; i < testingText.length; i++) {
      if (i === 0) checkCircleChanging(i);
      if (i === testingText.length - 1) checkCircleChanging(i);
      if (i !== 0 && i !== testingText.length - 1) {
        cy.get("li")
          .eq(i)
          .contains(testingText[i])
          .parent("div")
          .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      }
    }

    //Проверяем логику перестановки и изменения цвета
    for (let i = 0; i < testingText.length; i++) {
      const end = testingText.length - 1 - i;
      if (i >= end) {
        checkCircleModified(i, end);
        checkCircleModified(end, i);
        break;
      }
      checkCircleModified(i, end);
      checkCircleModified(end, i);
      checkCircleChanging(i + 1);
      checkCircleChanging(end - 1);
    }
  });
});
