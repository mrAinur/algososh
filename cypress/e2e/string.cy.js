describe("Проверка", () => {
  const testingText = ["c", "h", "e", "c", "k"];
  const path = "http://localhost:3000/recursion";
  beforeEach(() => {
    cy.viewport(1450, 860);
    cy.visit(path);
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
    //Останавливаем время внутри приложения
    cy.clock();
    //Кликаем на кнопку вызова функции разворота строки
    cy.contains("Развернуть").click();

    //Проверяем первый и последний элементы в начале алгоритма
    cy.get("li")
      .eq(0)
      .contains("c")
      .closest("div")
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.get("li")
      .eq(testingText.length - 1)
      .contains("k")
      .closest("div")
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");

    //Проверяем остальные элементы в начале алгоритма
    for (let i = 1; i < testingText.length - 1; i++) {
      cy.get("li")
        .eq(i)
        .contains(testingText[i])
        .closest("div")
        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
    }
    //Проверяем логику перестановки и изменения цвета
    for (let i = 0; i < testingText.length; i++) {
      const end = testingText.length - 1 - i;
      if (i >= end) break;
      cy.tick(1000);
      cy.get("li")
        .eq(i)
        .contains(testingText[end])
        .closest("div")
        .should("have.css", "border", "4px solid rgb(127, 224, 81)");
      cy.get("li")
        .eq(end)
        .contains(testingText[i])
        .closest("div")
        .should("have.css", "border", "4px solid rgb(127, 224, 81)");
      cy.get("li")
        .eq(i + 1)
        .contains(testingText[i + 1])
        .closest("div")
        .should("have.css", "border", "4px solid rgb(210, 82, 225)");
      cy.get("li")
        .eq(end - 1)
        .contains(testingText[end - 1])
        .closest("div")
        .should("have.css", "border", "4px solid rgb(210, 82, 225)");
      if (i + 1 >= end - 1) {
        cy.tick(1000);
        cy.get("li")
          .eq(i)
          .contains(testingText[end])
          .closest("div")
          .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        cy.get("li")
          .eq(end)
          .contains(testingText[i])
          .closest("div")
          .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        break;
      }
    }
    // cy.get(`ul>li`).each(item => {
    //   cy.get(item).contains("E").closest("div").should("have.css", "border", "4px solid rgb(210, 82, 225)");
    // });

    // .then(res => {
    //   cy.log(res);
    // });

    // .contains("T")
    // .closest("div")
    // .should("have.css", "border", "4px solid rgb(127, 224, 81)");

    // .then(res => {
    //   if (res) throw new Error(res.message);
    // });
  });
});
