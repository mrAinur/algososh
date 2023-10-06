import { ElementStates } from "../../../types/element-states";
import { CircleValues } from "../string";
import { reverse as reverseArr } from "./algorithmForString";

describe("Тестирование алгоритма разворота строки", () => {
  const setState = jest.fn();
  const setLoader = jest.fn();
  it("с чётным количеством символов", async () => {
    const arr: CircleValues[] = [
      { value: "a", state: ElementStates.Default },
      { value: "b", state: ElementStates.Default },
      { value: "c", state: ElementStates.Default },
      { value: "d", state: ElementStates.Default },
    ];
    expect(await reverseArr(arr, setState, setLoader)).toEqual(arr.reverse());
  });
  it("с нечетным количеством символов", async () => {
    const arr: CircleValues[] = [
      { value: "a", state: ElementStates.Default },
      { value: "b", state: ElementStates.Default },
      { value: "c", state: ElementStates.Default },
    ];
    expect(await reverseArr(arr, setState, setLoader)).toEqual(arr.reverse());
  });
  it("с одним символом", async () => {
    const arr: CircleValues[] = [{ value: "a", state: ElementStates.Default }];
    expect(await reverseArr(arr, setState, setLoader)).toEqual(arr.reverse());
  });
  it("пустую строку", async () => {
    const arr: CircleValues[] = [];
    expect(await reverseArr(arr, setState, setLoader)).toEqual(arr.reverse());
  });
});
