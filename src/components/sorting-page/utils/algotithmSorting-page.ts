import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../../constants/delays";
import { Direction } from "../../../types/direction";
import { ElementStates } from "../../../types/element-states";
import { timeout } from "../../../utils/setTimeput";
import { TColumn } from "../sorting-page";

export const swap = (arr: TColumn[], first: number, second: number) => {
  const check = arr[first];
  arr[first] = arr[second];
  arr[second] = check;
};

export const randomArr = (
  setState: React.Dispatch<React.SetStateAction<TColumn[]>>,
) => {
  const getRandomNum = () => {
    return Math.floor(Math.random() * (100 - 0 + 1)) + 0;
  };
  const minLen = 3;
  const maxLen = 17;
  const arr: TColumn[] = new Array(
    Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen,
  );
  for (let i = 0; i < arr.length; i++) {
    arr[i] = {
      height: getRandomNum(),
      state: ElementStates.Default,
    };
  }
  setState([...arr]);
};

export const getСhoiceSorting = async (
  setState: React.Dispatch<React.SetStateAction<TColumn[]>>,
  setLoader: React.Dispatch<
    React.SetStateAction<{
      ascending: boolean;
      descending: boolean;
    }>
  >,
  arr: TColumn[],
  direction: Direction,
) => {
  switch (direction) {
    case Direction.Ascending:
      for (let i = 0; i < arr.length; i++) {
        arr[i].state = ElementStates.Changing;
        let saveItem = { item: arr[i], index: i };
        setState([...arr]);
        for (let j = i + 1; j < arr.length; j++) {
          arr[j].state = ElementStates.Changing;
          setState([...arr]);
          await timeout(DELAY_IN_MS);
          if (
            arr[i].height > arr[j].height &&
            arr[j].height < saveItem.item.height
          ) {
            saveItem.item = arr[j];
            saveItem.index = j;
          }
          if (j === arr.length - 1) {
            swap(arr, i, saveItem.index);
            arr[saveItem.index].state = ElementStates.Default;
          }
          arr[j].state = ElementStates.Default;
          setState([...arr]);
        }
        arr[i].state = ElementStates.Modified;
        setState([...arr]);
      }
      setLoader({ ascending: false, descending: false });
      break;
    case Direction.Descending:
      for (let i = 0; i < arr.length; i++) {
        arr[i].state = ElementStates.Changing;
        let saveItem = { item: arr[i], index: i };
        setState([...arr]);
        for (let j = i + 1; j < arr.length; j++) {
          arr[j].state = ElementStates.Changing;
          setState([...arr]);
          await timeout(DELAY_IN_MS);
          if (
            arr[i].height < arr[j].height &&
            arr[j].height > saveItem.item.height
          ) {
            saveItem.item = arr[j];
            saveItem.index = j;
          }
          if (j === arr.length - 1) {
            swap(arr, saveItem.index, i);
            arr[saveItem.index].state = ElementStates.Default;
          }
          arr[j].state = ElementStates.Default;
          setState([...arr]);
        }
        arr[i].state = ElementStates.Modified;
        setState([...arr]);
      }
      setLoader({ ascending: false, descending: false });
      break;
  }
};

export const getBubbleSorting = async (
  setState: React.Dispatch<React.SetStateAction<TColumn[]>>,
  setLoader: React.Dispatch<
    React.SetStateAction<{
      ascending: boolean;
      descending: boolean;
    }>
  >,
  arr: TColumn[],
  direction: Direction,
) => {
  switch (direction) {
    case Direction.Ascending:
      for (let i = 0; i < arr.length; i++) {
        setState([...arr]);
        for (let j = 0; j < arr.length - i; j++) {
          if (j !== arr.length - i - 1) {
            arr[j].state = ElementStates.Changing;
            arr[j + 1].state = ElementStates.Changing;
            setState([...arr]);
            await timeout(DELAY_IN_MS);
            if (arr[j].height > arr[j + 1].height) {
              swap(arr, j, j + 1);
            }
            if (j !== arr.length - 1) {
              arr[j].state = ElementStates.Default;
              arr[j + 1].state = ElementStates.Default;
            }
          } else {
            arr[j].state = ElementStates.Modified;
          }
          setState([...arr]);
        }
        setState([...arr]);
      }
      setLoader({ ascending: false, descending: false });
      break;

    case Direction.Descending:
      for (let i = 0; i < arr.length; i++) {
        setState([...arr]);
        for (let j = 0; j < arr.length - i; j++) {
          if (j !== arr.length - i - 1) {
            arr[j].state = ElementStates.Changing;
            arr[j + 1].state = ElementStates.Changing;
            setState([...arr]);
            await timeout(DELAY_IN_MS);
            if (arr[j].height < arr[j + 1].height) {
              swap(arr, j + 1, j);
            }
            if (j !== arr.length - 1) {
              arr[j].state = ElementStates.Default;
              arr[j + 1].state = ElementStates.Default;
            }
          } else {
            arr[j].state = ElementStates.Modified;
          }
          setState([...arr]);
        }
        setState([...arr]);
      }
      setLoader({ ascending: false, descending: false });
      break;
  }
};
