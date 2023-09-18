import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { useForm } from "../hooks/useForm";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from "./utils/algorithmList-page";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { timeout } from "../../utils/setTimeput";
import { DELAY_IN_MS } from "../../constants/delays";

type Cirlces = {
  value: string;
  state: ElementStates;
  add?: string;
  remove?: string;
};

export const ListPage: React.FC = () => {
  const [arr, setArr] = useState<Cirlces[]>();

  const [list, setList] = useState(new LinkedList<Cirlces>());

  const { values, handleChange, setValues } = useForm({ value: "", index: "" });

  const addHead = async () => {
    arr![0].add = values.value;
    setArr([...arr!]);
    await timeout(DELAY_IN_MS);
    list.prepend(values.value, ElementStates.Modified);
    setList(list);
    setArr([...list.toArray()]);
    await timeout(DELAY_IN_MS);
    const current = list.find(0);
    current!.state = ElementStates.Default;
    setArr([...list.toArray()]);
  };

  const removeHead = async () => {
    arr![0].remove = arr![0].value;
    arr![0].value = "";
    setArr([...arr!]);
    await timeout(DELAY_IN_MS);
    list.deleteHead();
    setList(list);
    setArr([...list.toArray()]);
  };

  const addTail = async () => {
    arr![arr!.length - 1].add = values.value;
    setArr([...arr!]);
    await timeout(DELAY_IN_MS);
    list.append(values.value, ElementStates.Modified);
    setList(list);
    setArr([...list.toArray()]);
    await timeout(DELAY_IN_MS);
    const current = list.find(arr!.length);
    current!.state = ElementStates.Default;
    setArr([...list.toArray()]);
  };

  const removeTail = async () => {
    arr![arr!.length - 1].remove = arr![arr!.length - 1].value;
    arr![arr!.length - 1].value = "";
    setArr([...arr!]);
    await timeout(DELAY_IN_MS);
    list.deleteTail();
    setList(list);
    setArr([...list.toArray()]);
  };

  //Не робит пока что!
  // Проблема в реализации добавления внутри метода list.add, он бесконечно много добавляет элементов, пока вопрос не решён
  const addForIndex = async () => {
    const index = Number(values.index);
    for (let i = 0; i <= index; i++) {
      arr![i].add = values.value;
      arr![i].state = ElementStates.Changing;
      setArr([...arr!]);
      await timeout(DELAY_IN_MS);
      if (i < index) {
        arr![i].add = "";
        setArr([...arr!]);
      } else {
        list.add(index, values.value, ElementStates.Modified);
        console.log(list);
        await timeout(100000);
        setList(list);
        setArr([...list.toArray()]);
        console.log(4);
        await timeout(DELAY_IN_MS);
        console.log(5);
        const current = list.find(index);
        console.log(6);
        current!.state = ElementStates.Default;
        console.log(7);
        setArr([...list.toArray()]);
        console.log(8);
      }
    }
  };

  const removeForIndex = async () => {
    const index = Number(values.index);
    for (let i = 0; i <= index; i++) {
      arr![i].state = ElementStates.Changing;
      setArr([...arr!]);
      await timeout(DELAY_IN_MS);
      if (i < index) {
        arr![i].remove = "";
        setArr([...arr!]);
      } else {
        arr![i].remove = arr![i].value;
        arr![i].value = "";
        arr![i].state = ElementStates.Default;
        setArr([...arr!]);
        await timeout(DELAY_IN_MS);
        list.delete(index);
        setList(list);
        setArr([...list.toArray()]);
      }
    }
  };

  useEffect(() => {
    const startArr = [
      { value: "0", state: ElementStates.Default },
      { value: "34", state: ElementStates.Default },
      { value: "8", state: ElementStates.Default },
      { value: "1", state: ElementStates.Default },
    ];
    startArr.forEach(item => list.append(item.value, item.state));
    setList(list);
    const cirlcesArr = list.toArray();
    setArr([...cirlcesArr]);
  }, []);

  return (
    <SolutionLayout title="Связный список">
      <section className={style.main}>
        <article className={style.buttonsBox}>
          <div className={style.topButtonsBox}>
            <div className={style.inputBox}>
              <Input
                placeholder="Введите значение"
                extraClass={style.input}
                maxLength={4}
                value={values.value}
                name="value"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                type="text"
              />
              <p className={style.paragraph}>Максимум — 4 символа</p>
            </div>
            <Button
              type="button"
              text="Добавить в head"
              onClick={addHead}
              isLoader={false}
              disabled={false}
              extraClass={style.topButtons}
            />
            <Button
              type="button"
              text="Добавить в tail"
              onClick={addTail}
              isLoader={false}
              disabled={false}
              extraClass={style.topButtons}
            />
            <Button
              type="button"
              text="Удалить из head"
              onClick={removeHead}
              isLoader={false}
              disabled={false}
              extraClass={style.topButtons}
            />
            <Button
              type="button"
              text="Удалить из tail"
              onClick={removeTail}
              isLoader={false}
              disabled={false}
              extraClass={style.topButtons}
            />
          </div>
          <div className={style.bottomButtonsBox}>
            <Input
              placeholder="Введите индекс"
              extraClass={style.input}
              maxLength={4}
              value={values.index}
              name="index"
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
              type="text"
            />
            <Button
              type="button"
              text="Добавить по индексу"
              onClick={addForIndex}
              isLoader={false}
              disabled={false}
              extraClass={style.bottomButtons}
            />
            <Button
              type="button"
              text="Удалить по индексу"
              onClick={removeForIndex}
              isLoader={false}
              disabled={false}
              extraClass={style.bottomButtons}
            />
          </div>
        </article>
        <article className={style.circlesBox}>
          <ul className={style.cirlces}>
            {arr?.map((item, index, arr) => {
              return (
                <li className={style.cirlce} key={index}>
                  {item.add ? (
                    <Circle
                      isSmall={true}
                      extraClass={style.smallCirlceTop}
                      letter={item.add}
                      state={ElementStates.Changing}
                    />
                  ) : (
                    <div className={style.emptyBoxTop} />
                  )}
                  <div className={style.bigCircle}>
                    <Circle
                      letter={item.value}
                      state={item.state}
                      head={index === 0 && !item.add ? "head" : ""}
                      tail={
                        index === arr.length - 1 && !item.remove ? "tail" : ""
                      }
                      index={index}
                    />
                    {index !== arr.length - 1 ? <ArrowIcon /> : null}
                  </div>
                  {item.remove ? (
                    <Circle
                      isSmall={true}
                      extraClass={style.smallCirlceBottom}
                      letter={item.remove}
                      state={ElementStates.Changing}
                    />
                  ) : (
                    <div className={style.emptyBoxBottom} />
                  )}
                </li>
              );
            })}
          </ul>
        </article>
      </section>
    </SolutionLayout>
  );
};
