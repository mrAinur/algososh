const { urlPath, screenViewport } = require("./utils/constants");

describe("Тестирование работы роутинга", () => {
  const checkUrl = endUrl => {
    cy.get(`#${endUrl.replace("/", "")}`).click();
    cy.url().then(url => {
      if (url.replace("http://localhost:3000", "") !== endUrl)
        throw new Error(`Ошибка маршрутизации на страницу ${endUrl}`);
      return null;
    });
  };

  beforeEach(() => {
    cy.viewport(screenViewport.width, screenViewport.height);
    cy.visit(urlPath.main);
  });

  it("на страницу разворота строки", () => {
    checkUrl(urlPath.string);
    cy.contains("Строка");
  });
  it("на страницу последовательности фибоначчи", () => {
    checkUrl(urlPath.fibonacci);
    cy.contains("Последовательность Фибоначчи");
  });
  it("на страницу сортировки массива", () => {
    checkUrl(urlPath.sorting);
    cy.contains("Сортировка массива");
  });
  it("на страницу стека", () => {
    checkUrl(urlPath.stack);
    cy.contains("Стек");
  });
  it("на страницу очереди", () => {
    checkUrl(urlPath.queue);
    cy.contains("Очередь");
  });
  it("на страницу связного списка", () => {
    checkUrl(urlPath.list);
    cy.contains("Связный список");
  });
});
