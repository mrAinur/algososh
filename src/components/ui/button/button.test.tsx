import renderer from "react-test-renderer";
import { Button } from "./button";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Тест компонента button", () => {
  it("с текстом", () => {
    const button = renderer
      .create(<Button text="Тест текста в кнопке" />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
  it("без текста", () => {
    const button = renderer.create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it("- заблокированной кнопки", () => {
    const button = renderer.create(<Button disabled={true} />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it("с индикацией загрузки", () => {
    const button = renderer.create(<Button isLoader={true} />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it("на корректность вызова функции", () => {
    const getCallFunction = jest.fn();
    render(<Button onClick={getCallFunction} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(getCallFunction).toBeCalledTimes(1);
  });
});
