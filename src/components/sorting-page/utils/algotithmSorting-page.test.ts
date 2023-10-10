import { Direction } from "../../../types/direction";
import { ElementStates } from "../../../types/element-states";
import { TColumn } from "../sorting-page";
import { getBubbleSorting, getСhoiceSorting } from "./algotithmSorting-page";

describe("Сортировка выбором корректно сортирует", () => {
  const setState = jest.fn();
  const setLoader = jest.fn();
  it("пустой массив по возрастанию", async () => {
    const arr: TColumn[] = [];
    expect(
      await getСhoiceSorting(setState, setLoader, arr, Direction.Ascending),
    ).toEqual(arr);
  });
  it("пустой массив по убыванию", async () => {
    const arr: TColumn[] = [];
    expect(
      await getСhoiceSorting(setState, setLoader, arr, Direction.Descending),
    ).toEqual(arr);
  });
  it("массив из одного элемента по возрастанию", async () => {
    const arr: TColumn[] = [{ height: 10, state: ElementStates.Default }];
    const sortArr: TColumn[] = [{ height: 10, state: ElementStates.Modified }];
    expect(
      await getСhoiceSorting(setState, setLoader, arr, Direction.Ascending),
    ).toEqual(sortArr);
  });
  it("массив из одного элемента по убыванию", async () => {
    const arr: TColumn[] = [{ height: 10, state: ElementStates.Default }];
    const sortArr: TColumn[] = [{ height: 10, state: ElementStates.Modified }];
    expect(
      await getСhoiceSorting(setState, setLoader, arr, Direction.Descending),
    ).toEqual(sortArr);
  });
  it("массив из нескольких элементов по возрастанию", async () => {
    const arr: TColumn[] = [
      { height: 30, state: ElementStates.Default },
      { height: 20, state: ElementStates.Default },
      { height: 10, state: ElementStates.Default },
    ];
    const sortArr: TColumn[] = [
      { height: 10, state: ElementStates.Modified },
      { height: 20, state: ElementStates.Modified },
      { height: 30, state: ElementStates.Modified },
    ];
    expect(
      await getСhoiceSorting(setState, setLoader, arr, Direction.Ascending),
    ).toEqual(sortArr);
  });
  it("массив из нескольких элементов по убыванию", async () => {
    const arr: TColumn[] = [
      { height: 10, state: ElementStates.Default },
      { height: 20, state: ElementStates.Default },
      { height: 30, state: ElementStates.Default },
    ];
    const sortArr: TColumn[] = [
      { height: 30, state: ElementStates.Modified },
      { height: 20, state: ElementStates.Modified },
      { height: 10, state: ElementStates.Modified },
    ];
    expect(
      await getСhoiceSorting(setState, setLoader, arr, Direction.Descending),
    ).toEqual(sortArr);
  });
});

describe("Сортировка пузырьком корректно сортирует", () => {
  const setState = jest.fn();
  const setLoader = jest.fn();
  it("пустой массив по возрастанию", async () => {
    const arr: TColumn[] = [];
    expect(
      await getBubbleSorting(setState, setLoader, arr, Direction.Ascending),
    ).toEqual(arr);
  });
  it("пустой массив по убыванию", async () => {
    const arr: TColumn[] = [];
    expect(
      await getBubbleSorting(setState, setLoader, arr, Direction.Ascending),
    ).toEqual(arr);
  });
  it("массив из одного элемента по возрастанию", async () => {
    const arr: TColumn[] = [{ height: 10, state: ElementStates.Default }];
    const sortArr: TColumn[] = [{ height: 10, state: ElementStates.Modified }];
    expect(
      await getBubbleSorting(setState, setLoader, arr, Direction.Ascending),
    ).toEqual(sortArr);
  });
  it("массив из одного элемента по убыванию", async () => {
    const arr: TColumn[] = [{ height: 10, state: ElementStates.Default }];
    const sortArr: TColumn[] = [{ height: 10, state: ElementStates.Modified }];
    expect(
      await getBubbleSorting(setState, setLoader, arr, Direction.Ascending),
    ).toEqual(sortArr);
  });
  it("массив из нескольких элементов по возрастанию", async () => {
    const arr: TColumn[] = [
      { height: 30, state: ElementStates.Default },
      { height: 20, state: ElementStates.Default },
      { height: 10, state: ElementStates.Default },
    ];
    const sortArr: TColumn[] = [
      { height: 10, state: ElementStates.Modified },
      { height: 20, state: ElementStates.Modified },
      { height: 30, state: ElementStates.Modified },
    ];
    expect(
      await getBubbleSorting(setState, setLoader, arr, Direction.Ascending),
    ).toEqual(sortArr);
  });
  it("массив из нескольких элементов по убыванию", async () => {
    const arr: TColumn[] = [
      { height: 10, state: ElementStates.Default },
      { height: 20, state: ElementStates.Default },
      { height: 30, state: ElementStates.Default },
    ];
    const sortArr: TColumn[] = [
      { height: 30, state: ElementStates.Modified },
      { height: 20, state: ElementStates.Modified },
      { height: 10, state: ElementStates.Modified },
    ];
    expect(
      await getBubbleSorting(setState, setLoader, arr, Direction.Descending),
    ).toEqual(sortArr);
  });
});
