import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./string.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { useForm } from "../hooks/useForm";
import { reverse } from "./utils/algorithmForString";
import { ElementStates } from "../../types/element-states";

export type CircleValues = {
  value: string;
  state: ElementStates;
};

export const StringComponent: React.FC = () => {
  const [state, setState] = useState<CircleValues[]>([]);
  const [loader, setLoader] = useState(false);

  const { values, handleChange } = useForm({ string: "" });

  const getCircleItems = (str: string) => {
    setLoader(true);
    const arr = str.split("").map(value => ({
      value,
      state: ElementStates.Default,
    }));

    reverse(arr, setState, setLoader);
  };

  return (
    <SolutionLayout title="Строка">
      <section className={style.main}>
        <article className={style.inputBox}>
          <Input
            maxLength={11}
            extraClass={style.input}
            value={values.string}
            name="string"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          />
          <Button
            type="button"
            text="Развернуть"
            extraClass={style.button}
            onClick={() => {
              getCircleItems(values.string);
            }}
            isLoader={loader}
            disabled={values.string.length ? false : true}
          />
          <p className={style.paragraph}>Максимум — 11 символов</p>
        </article>
        <article className={style.revertBox}>
          <ul className={style.letters}>
            {state?.map((item, index) => {
              return (
                <li className={style.letter} key={index}>
                  <Circle letter={item.value} state={item.state} />
                </li>
              );
            })}
          </ul>
        </article>
      </section>
    </SolutionLayout>
  );
};
