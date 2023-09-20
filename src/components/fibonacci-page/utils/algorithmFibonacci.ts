import { SHORT_DELAY_IN_MS } from "../../../constants/delays";
import { timeout } from "../../../utils/setTimeput";

export let cacheFibonacci: Record<number, number> = {};

export const getNumbers = (index: number) => {
  if (index === 0) return 0;
  if (index === 1) return 1;
  if (cacheFibonacci[index]) return cacheFibonacci[index];

  const num1: number = getNumbers(index - 1);
  const num2: number = getNumbers(index - 2);

  cacheFibonacci[index - 1] = num1;
  cacheFibonacci[index - 2] = num2;

  return num1 + num2;
};

export const getFibonnacci = async (
  index: number,
  setState: React.Dispatch<React.SetStateAction<number[]>>,
  setLoader: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const arr: number[] = [];
  getNumbers(index + 1);
  for (let key in cacheFibonacci) {
    await timeout(SHORT_DELAY_IN_MS);
    arr.push(cacheFibonacci[key]);
    setState([...arr]);
  }
  cacheFibonacci = {};
  setLoader(false);
  return arr;
};
