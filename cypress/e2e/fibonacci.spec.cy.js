const { urlPath, screenViewport } = require("./utils/constants");

describe("Проверка", () => {
  const checkNum = 19;
  const fibonacciArr = [
    0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597,
    2584, 4181,
  ];
  beforeEach(() => {
    cy.viewport(screenViewport.width, screenViewport.height);
    cy.visit(urlPath.fibonacci);
  });
  it("недоступности кнопки при пустом инпуте", () => {
    if (cy.get("input").should("be.empty"))
      cy.contains("Рассчитать").should("be.disabled");
    cy.get("input").type(checkNum);
    if (cy.get("input").should("have.value", checkNum))
      cy.contains("Рассчитать").click();
  });

  it("недоступности кнопки вывода чисел при пустом инпуте", () => {
    cy.get("input").type(checkNum);

    //Кликаем на кнопку вызова функции разворота строки
    cy.contains("Рассчитать").click();

    //Проверка корректности вывода последовательности чисел фибоначчи
    for (let i = 0; i < fibonacciArr.length; i++) {
      cy.get("li").eq(i).contains(fibonacciArr[i]);
    }
  });
});
