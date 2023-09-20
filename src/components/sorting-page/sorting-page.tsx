import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { getBubbleSorting, randomArr } from "./utils/algotithmSorting-page";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { getСhoiceSorting } from "./utils/algotithmSorting-page";

export type TColumn = {
  height: number;
  state: ElementStates;
};

export const SortingPage: React.FC = () => {
  const typeOfSorting = {
    choise: "choise",
    bubble: "bubble",
  };
  const [radioState, setRadioState] = useState<Record<string, boolean>>({
    choise: true,
    bubble: false,
  });
  const [state, setState] = useState<TColumn[]>([]);
  const [loader, setLoader] = useState({ ascending: false, descending: false });

  const getSort = (direction: Direction, typeSorting: string) => {
    direction === Direction.Ascending
      ? setLoader({ ascending: true, descending: false })
      : setLoader({ ascending: false, descending: true });

    typeSorting === typeOfSorting.choise
      ? getСhoiceSorting(setState, setLoader, state, direction)
      : getBubbleSorting(setState, setLoader, state, direction);
  };

  useEffect(() => randomArr(setState), []);

  return (
    <SolutionLayout title="Сортировка массива">
      <section className={style.main}>
        <article className={style.inputBox}>
          <div className={style.radioButtonsBox}>
            <RadioInput
              label="Выбор"
              checked={radioState.choise}
              onChange={() => setRadioState({ choise: true, bubble: false })}
            />
            <RadioInput
              label="Пузырёк"
              checked={radioState.bubble}
              onChange={() => setRadioState({ choise: false, bubble: true })}
            />
          </div>
          <div className={style.buttonsBox}>
            <Button
              type="button"
              text="По возрастанию"
              sorting={Direction.Ascending}
              onClick={() => {
                radioState.choise
                  ? getSort(Direction.Ascending, typeOfSorting.choise)
                  : getSort(Direction.Ascending, typeOfSorting.bubble);
              }}
              isLoader={loader.ascending}
              disabled={loader.descending}
              extraClass={style.button}
            />
            <Button
              type="button"
              text="По убыванию"
              sorting={Direction.Descending}
              onClick={() => {
                radioState.choise
                  ? getSort(Direction.Descending, typeOfSorting.choise)
                  : getSort(Direction.Descending, typeOfSorting.bubble);
              }}
              isLoader={loader.descending}
              disabled={loader.ascending}
              extraClass={style.button}
            />
          </div>
          <Button
            type="button"
            text="Новый массив"
            extraClass={style.newArrButton}
            onClick={() => randomArr(setState)}
            isLoader={false}
            disabled={loader.ascending || loader.descending ? true : false}
          />
        </article>
        <article className={style.columnBox}>
          <ul className={style.columns}>
            {state?.map((item, index) => {
              return (
                <li className={style.column} key={index}>
                  <Column index={item.height} state={item.state} />
                </li>
              );
            })}
          </ul>
        </article>
      </section>
    </SolutionLayout>
  );
};
