import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { useForm } from "../hooks/useForm";
import { Button } from "../ui/button/button";
import style from "./stack-page.module.css";
import { Stack } from "./utils/algotithmStack-page";
import { ElementStates } from "../../types/element-states";
import { timeout } from "../../utils/setTimeput";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

type TCircleStack = {
  state: ElementStates;
  value: string;
};

const stack = new Stack<TCircleStack>();

export const StackPage: React.FC = () => {
  const [state, setState] = useState<TCircleStack[]>([]);

  const { values, handleChange, setValues } = useForm({ string: "" });

  const getNewTask = async () => {
    const newTask: TCircleStack = {
      state: ElementStates.Changing,
      value: values.string,
    };

    stack.push(newTask);
    setValues({ string: "" });
    const arr: TCircleStack[] = stack.getContainer();
    setState([...arr]);
    await timeout(SHORT_DELAY_IN_MS);
    arr[arr.length - 1].state = ElementStates.Default;
    setState([...arr]);
  };

  const removeTask = async () => {
    const arr: TCircleStack[] = stack.getContainer();
    arr[arr.length - 1].state = ElementStates.Changing;
    setState([...arr]);
    await timeout(SHORT_DELAY_IN_MS);
    stack.pop();
    setState([...arr]);
  };

  const removeStack = () => {
    const arr: TCircleStack[] = stack.clearContainer();
    setState([...arr]);
  };

  return (
    <SolutionLayout title="Стек">
      <section className={style.main}>
        <article className={style.algorithmBox}>
          <div className={style.inputBox}>
            <Input
              maxLength={4}
              extraClass={style.input}
              value={values.string}
              name="string"
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
              type="text"
              placeholder="Введите текст"
            />
            <p className={style.paragraph}>Максимум — 4 символа</p>
          </div>
          <div className={style.buttonsBox}>
            <Button
              type="button"
              text="Добавить"
              onClick={getNewTask}
              isLoader={false}
              disabled={values.string.length ? false : true}
            />
            <Button
              type="button"
              text="Удалить"
              onClick={removeTask}
              isLoader={false}
              disabled={state.length ? false : true}
            />
          </div>
          <Button
            type="button"
            text="Очистить"
            extraClass={style.newArrButton}
            onClick={removeStack}
            isLoader={false}
            disabled={state.length ? false : true}
          />
        </article>
        <article className={style.circlesBox}>
          <ul className={style.circles}>
            {state?.map((item, index, arr) => {
              return (
                <li className={style.circle} key={index}>
                  <Circle
                    letter={item.value}
                    state={item.state}
                    index={index}
                    head={index === arr.length - 1 ? "top" : ""}
                  />
                </li>
              );
            })}
          </ul>
        </article>
      </section>
    </SolutionLayout>
  );
};
