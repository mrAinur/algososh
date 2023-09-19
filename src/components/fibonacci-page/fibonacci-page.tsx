import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useForm } from "../hooks/useForm";
import style from "./fibonacci-page.module.css";
import { Circle } from "../ui/circle/circle";
import { getFibonnacci } from "./utils/algorithmFibonacci";

export const FibonacciPage: React.FC = () => {
  const [state, setState] = useState<number[]>([]);
  const [loader, setLoader] = useState(false);

  const { values, handleChange } = useForm({ string: "" });

  const getCircleItems = (index: number) => {
    setLoader(true);
    getFibonnacci(index, setState, setLoader);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <section className={style.main}>
        <article className={style.inputBox}>
          <Input
            max={19}
            maxLength={2}
            extraClass={style.input}
            value={values.string}
            name="string"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              Number(e.target.value) < 0
                ? (e.target.value = "0")
                : handleChange(e);
            }}
            type="number"
            placeholder="Введите число от 1 до 19"
          />
          <Button
            type="button"
            text="Развернуть"
            extraClass={style.button}
            onClick={() => {
              getCircleItems(Number(values.string));
            }}
            isLoader={loader}
            disabled={
              values.string.length &&
              Number(values.string) < 20 &&
              Number(values.string) !== 0
                ? false
                : true
            }
          />
          <p className={style.paragraph}>Максимальное число 19</p>
        </article>
        <article className={style.fibonacciBox}>
          <ul className={style.letters}>
            {state?.map((item, index) => {
              return (
                <li className={style.letter} key={index}>
                  <Circle letter={String(item)} />
                  <p className={style.letterNum}>{index}</p>
                </li>
              );
            })}
          </ul>
        </article>
      </section>
    </SolutionLayout>
  );
};
