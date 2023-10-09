describe("Тестирование работы роутинга", () => {
  const pathUrl = "http://localhost:3000";
  const checkUrl = endUrl => {
    cy.get(`#${endUrl}`).click();
    cy.url().then(url => {
      if (url !== `${pathUrl}/${endUrl}`)
        throw new Error(`Ошибка маршрутизации на страницу /${endUrl}`);
      return null;
    });
  };

  beforeEach(() => {
    cy.viewport(1480, 850);
    cy.visit(pathUrl);
  });

  it("на страницу разворота строки", () => {
    checkUrl("recursion");
    cy.contains("Строка");
  });
  it("на страницу последовательности фибоначчи", () => {
    checkUrl("fibonacci");
    cy.contains("Последовательность Фибоначчи");
  });
  it("на страницу сортировки массива", () => {
    checkUrl("sorting");
    cy.contains("Сортировка массива");
  });
  it("на страницу стека", () => {
    checkUrl("stack");
    cy.contains("Стек");
  });
  it("на страницу очереди", () => {
    checkUrl("queue");
    cy.contains("Очередь");
  });
  it("на страницу связного списка", () => {
    checkUrl("list");
    cy.contains("Связный список");
  });
});
