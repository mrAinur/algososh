const {
  borderColorCheck,
  urlPath,
  screenViewport,
} = require("./utils/constants");

describe("Проверка", () => {
  const testingText = ["A", "B", "C", "D"];
  const defaultComponentListText = [0, 34, 8, 1];
  const TAIL = "tail";
  const HEAD = "head";
  const testNum = 2;
  const addInHead = "Добавить в head";
  const addInTail = "Добавить в tail";
  const removeFromHead = "Удалить из head";
  const removeFromTail = "Удалить из tail";
  const addByIndex = "Добавить по индексу";
  const removeByIndex = "Удалить по индексу";
  const checkAvailable = (text, disabled) => {
    cy.contains(text).should(disabled ? "be.disabled" : "not.be.disabled");
  };
  const checkDefaultCircle = (li, index) => {
    cy.get(li)
      .contains(defaultComponentListText[index])
      .parent("div")
      .should(
        borderColorCheck.haveCss,
        borderColorCheck.border,
        borderColorCheck.blueBorder,
      );
  };

  beforeEach(() => {
    cy.viewport(screenViewport.width, screenViewport.height);
    cy.visit(urlPath.list);
    cy.get("ul>li").as("circlesArr");
  });

  it("Корректной работы кнопок при вводе значений в поля ввода", () => {
    cy.get('input[placeholder="Введите значение"]').as("valueInput");
    cy.get('input[placeholder="Введите индекс"]').as("indexInput");
    if (cy.get("@valueInput").should("be.empty")) {
      checkAvailable(addInHead, true);
      checkAvailable(addInTail, true);
      checkAvailable(removeFromHead, false);
      checkAvailable(removeFromTail, false);
      checkAvailable(addByIndex, true);
      checkAvailable(removeByIndex, true);
    }
    cy.get("@valueInput").type(testingText[0]);
    if (
      cy.get("@valueInput").should("have.value", testingText[0]) &&
      cy.get("@indexInput").should("be.empty")
    ) {
      checkAvailable(addInHead, false);
      checkAvailable(addInTail, false);
      checkAvailable(removeFromHead, false);
      checkAvailable(removeFromTail, false);
      checkAvailable(addByIndex, true);
      checkAvailable(removeByIndex, true);
    }
    cy.get("@indexInput").type(testNum);
    if (
      cy.get("@valueInput").should("have.value", testingText[0]) &&
      cy.get("@indexInput").should("have.value", testNum)
    ) {
      checkAvailable(addInHead, false);
      checkAvailable(addInTail, false);
      checkAvailable(removeFromHead, false);
      checkAvailable(removeFromTail, false);
      checkAvailable(addByIndex, false);
      checkAvailable(removeByIndex, false);
    }
  });

  it("Отрисовки дефолтного списка", () => {
    cy.get("@circlesArr").each((li, index, arr) => {
      if (index === 0) cy.get(li).contains(HEAD);
      if (index === arr.length - 1) cy.get(li).contains(TAIL);
      cy.get(li)
        .contains(defaultComponentListText[index])
        .parent("div")
        .should(
          borderColorCheck.haveCss,
          borderColorCheck.border,
          borderColorCheck.blueBorder,
        );
    });
  });

  it("Добавления элемента в head", () => {
    cy.get('input[placeholder="Введите значение"]').type(testingText[0]);
    cy.contains("Добавить в head").click();
    cy.get("@circlesArr").each((li, index) => {
      if (index === 0) {
        cy.get(li)
          .contains(testingText[0])
          .parent("div")
          .should(
            borderColorCheck.haveCss,
            borderColorCheck.border,
            borderColorCheck.pinkBorder,
          );
        cy.get(li).should("not.contain", HEAD);
      }
      checkDefaultCircle(li, index);
    });

    cy.get("@circlesArr").each((li, index, arr) => {
      if (index === 0) {
        cy.get(li)
          .contains(testingText[0])
          .parent("div")
          .should(
            borderColorCheck.haveCss,
            borderColorCheck.border,
            borderColorCheck.greenBorder,
          );
        cy.get(li).contains(HEAD);
      }
      if (index === arr.length) cy.get(li).contains(TAIL);
      if (index !== 0) checkDefaultCircle(li, index - 1);
    });

    cy.get("@circlesArr").each((li, index, arr) => {
      if (index === 0) {
        cy.get(li)
          .contains(testingText[0])
          .parent("div")
          .should(
            borderColorCheck.haveCss,
            borderColorCheck.border,
            borderColorCheck.blueBorder,
          );
        cy.get(li).contains(HEAD);
      }
      if (index === arr.length - 1) cy.get(li).contains(TAIL);
      if (index !== 0) checkDefaultCircle(li, index - 1);
    });
  });

  it("Добавления элемента в tail", () => {
    cy.get('input[placeholder="Введите значение"]').type(testingText[0]);
    cy.contains("Добавить в tail").click();
    cy.get("@circlesArr").each((li, index, arr) => {
      if (index === arr.length - 1) {
        cy.get(li)
          .contains(testingText[0])
          .parent("div")
          .should(
            borderColorCheck.haveCss,
            borderColorCheck.border,
            borderColorCheck.pinkBorder,
          );
      }
      checkDefaultCircle(li, index);
    });

    for (let index = 0; index <= defaultComponentListText.length; index++) {
      if (index === 0) cy.get("li").eq(index).contains(HEAD);
      if (index === 0 && index !== defaultComponentListText.length)
        cy.get("li")
          .eq(index)
          .contains(defaultComponentListText[index])
          .parent("div")
          .should(
            borderColorCheck.haveCss,
            borderColorCheck.border,
            borderColorCheck.blueBorder,
          );
      if (index === defaultComponentListText.length) {
        cy.get("li")
          .eq(index)
          .contains(testingText[0])
          .parent("div")
          .should(
            borderColorCheck.haveCss,
            borderColorCheck.border,
            borderColorCheck.greenBorder,
          );
        cy.get("li").eq(index).contains(TAIL);
      }
    }

    for (let index = 0; index <= defaultComponentListText.length; index++) {
      if (index === 0) cy.get("li").eq(index).contains(HEAD);
      if (index === 0 && index !== defaultComponentListText.length)
        cy.get("li")
          .eq(index)
          .contains(defaultComponentListText[index])
          .parent("div")
          .should(
            borderColorCheck.haveCss,
            borderColorCheck.border,
            borderColorCheck.blueBorder,
          );
      if (index === defaultComponentListText.length) {
        cy.get("li")
          .eq(index)
          .contains(testingText[0])
          .parent("div")
          .should(
            borderColorCheck.haveCss,
            borderColorCheck.border,
            borderColorCheck.blueBorder,
          );
        cy.get("li").eq(index).contains(TAIL);
      }
    }
  });

  it("добавления элемента по индексу", () => {
    cy.get('input[placeholder="Введите значение"]').type(testingText[0]);
    cy.get('input[placeholder="Введите индекс"]').type(testNum);
    cy.contains("Добавить по индексу").click();

    for (let i = 0; i < defaultComponentListText.length; i++) {
      if (i <= testNum) {
        cy.get("li")
          .eq(i)
          .contains(testingText[0])
          .parent("div")
          .should(
            borderColorCheck.haveCss,
            borderColorCheck.border,
            borderColorCheck.pinkBorder,
          );
        cy.get("li")
          .eq(i)
          .contains(defaultComponentListText[i])
          .parent("div")
          .should(
            borderColorCheck.haveCss,
            borderColorCheck.border,
            borderColorCheck.pinkBorder,
          );
      }
      if (i === testNum)
        cy.get("li")
          .eq(i)
          .contains(testingText[0])
          .parent("div")
          .should(
            borderColorCheck.haveCss,
            borderColorCheck.border,
            borderColorCheck.greenBorder,
          );
      if (i > testNum)
        cy.get("li")
          .eq(i)
          .contains(defaultComponentListText[i - 1])
          .parent("div")
          .should(
            borderColorCheck.haveCss,
            borderColorCheck.border,
            borderColorCheck.blueBorder,
          );
    }

    for (let i = 0; i <= defaultComponentListText.length; i++) {
      if (i < testNum)
        cy.get("li")
          .eq(i)
          .contains(defaultComponentListText[i])
          .parent("div")
          .should(
            borderColorCheck.haveCss,
            borderColorCheck.border,
            borderColorCheck.blueBorder,
          );

      if (i === testNum)
        cy.get("li")
          .eq(i)
          .contains(testingText[0])
          .parent("div")
          .should(
            borderColorCheck.haveCss,
            borderColorCheck.border,
            borderColorCheck.blueBorder,
          );
      if (i > testNum)
        cy.get("li")
          .eq(i)
          .contains(defaultComponentListText[i - 1])
          .parent("div")
          .should(
            borderColorCheck.haveCss,
            borderColorCheck.border,
            borderColorCheck.blueBorder,
          );
    }
  });

  it("Удаления элемента из head", () => {
    cy.contains("Удалить из head").click();
    cy.get("@circlesArr").each((li, index) => {
      if (index === 0) {
        cy.get(li)
          .find("[class*=circle_small__]")
          .contains(defaultComponentListText[index])
          .parent("div")
          .should(
            borderColorCheck.haveCss,
            borderColorCheck.border,
            borderColorCheck.pinkBorder,
          );
        cy.get(li).contains(HEAD);
      }
      if (index !== 0) checkDefaultCircle(li, index);
    });

    for (let i = 0; i < defaultComponentListText.length - 1; i++) {
      if (i === 0) {
        cy.get("ul>li").should("have.length", 3);
        cy.get("li").eq(i).should("contain", HEAD);
      }
      if (i === defaultComponentListText.length - 1)
        cy.get("li")
          .eq(i - 1)
          .contains(TAIL);
      cy.get("li")
        .eq(i)
        .contains(defaultComponentListText[i + 1])
        .parent("div")
        .should(
          borderColorCheck.haveCss,
          borderColorCheck.border,
          borderColorCheck.blueBorder,
        );
    }
  });

  it("удаления элемента из tail", () => {
    cy.contains("Удалить из tail").click();
    cy.get("@circlesArr").each((li, index, arr) => {
      if (index === arr.length - 1) {
        cy.get(li)
          .find("[class*=circle_small__]")
          .contains(defaultComponentListText[index])
          .parent("div")
          .should(
            borderColorCheck.haveCss,
            borderColorCheck.border,
            borderColorCheck.pinkBorder,
          );
        cy.get(li)
          .find(".text_type_circle")
          .parent("div")
          .should(
            borderColorCheck.haveCss,
            borderColorCheck.border,
            borderColorCheck.blueBorder,
          );
        cy.get(li).should("not.contain", TAIL);
      }
      if (index !== arr.length - 1) checkDefaultCircle(li, index);
    });

    for (let i = 0; i < defaultComponentListText.length - 1; i++) {
      if (i === 0) {
        cy.get("ul>li").should("have.length", 3);
        cy.get("li").eq(i).should("contain", HEAD);
      }
      if (i === defaultComponentListText.length - 2)
        cy.get("li").eq(i).contains(TAIL);
      cy.get("li")
        .eq(i)
        .contains(defaultComponentListText[i])
        .parent("div")
        .should(
          borderColorCheck.haveCss,
          borderColorCheck.border,
          borderColorCheck.blueBorder,
        );
    }
  });

  it("Удаления элемента по индексу", () => {
    cy.get('input[placeholder="Введите индекс"]').type(testNum);
    cy.contains("Удалить по индексу").click();

    for (let i = 0; i < defaultComponentListText.length - 1; i++) {
      if (i === 0) cy.get("li").eq(i).should("contain", HEAD);
      if (i < testNum)
        cy.get("li")
          .eq(i)
          .contains(defaultComponentListText[i])
          .parent("div")
          .should(
            borderColorCheck.haveCss,
            borderColorCheck.border,
            borderColorCheck.pinkBorder,
          );
      if (i === testNum) {
        cy.get("li")
          .eq(i)
          .find("[class*=circle_small__]")
          .contains(defaultComponentListText[i])
          .parent("div")
          .should(
            borderColorCheck.haveCss,
            borderColorCheck.border,
            borderColorCheck.pinkBorder,
          );
        cy.get("li")
          .eq(i)
          .find("[class*=list-page_bigCircle__]")
          .find(".text_type_circle")
          .should("have.value", "")
          .parent("div")
          .should(
            borderColorCheck.haveCss,
            borderColorCheck.border,
            borderColorCheck.blueBorder,
          );
        cy.get("ul>li").should("have.length", 3);
      }
      if (i >= testNum) {
        cy.get("li")
          .eq(i)
          .contains(defaultComponentListText[i + 1])
          .parent("div")
          .should(
            borderColorCheck.haveCss,
            borderColorCheck.border,
            borderColorCheck.blueBorder,
          );
      }
      if (i === defaultComponentListText.length - 2)
        cy.get("li").eq(i).should("contain", TAIL);
    }
  });
});
