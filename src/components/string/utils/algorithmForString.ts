import { CircleValues } from "../string";
import { DELAY_IN_MS } from "../../../constants/delays";
import { ElementStates } from "../../../types/element-states";
import { timeout } from "../../../utils/setTimeput";

export const swap = (arr: CircleValues[], start: number, end: number) => {
  let check = arr[start];
  arr[start] = arr[end];
  arr[end] = check;
  return arr;
};

export const reverse = async (
  arr: CircleValues[],
  setState: React.Dispatch<React.SetStateAction<CircleValues[]>>,
  setLoader: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  let tail = arr.length - 1;
  for (let i = 0; i <= tail; i++) {
    arr[i].state = ElementStates.Changing;
    arr[tail].state = ElementStates.Changing;
    setState([...arr]);
    await timeout(DELAY_IN_MS);
    swap(arr, i, tail);
    arr[i].state = ElementStates.Modified;
    arr[tail].state = ElementStates.Modified;
    tail--;
    setState([...arr]);
  }
  setLoader(false);
  return arr;
};
