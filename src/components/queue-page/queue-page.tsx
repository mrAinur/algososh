import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./queue-page.module.css";
import { useForm } from "../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Queue } from "./utils/algotithmQueue-page";
import { timeout } from "../../utils/setTimeput";

type TCircleQueue = {
  state: ElementStates;
  value: string;
};

export const QueuePage: React.FC = () => {
  const initialState: TCircleQueue[] = Array(7).fill({
    state: ElementStates.Default,
    value: "",
  });

  const [stateArr, setArrState] = useState<TCircleQueue[]>(initialState);

  const [queue, setQueue] = useState(new Queue<TCircleQueue>(7));

  const { values, handleChange, setValues } = useForm({ string: "" });

  const getNewTask = async () => {
    if (queue.checkEnd())
      return console.log("Clear the queue, you've reached the limit!");
    queue.enqueue({
      state: ElementStates.Changing,
      value: "",
    });
    setQueue(queue);
    setArrState([...(queue.getContainer() as TCircleQueue[])]);
    await timeout(SHORT_DELAY_IN_MS);
    queue.getTailTask()!.value = values.string;
    queue.getTailTask()!.state = ElementStates.Default;
    setValues({ string: "" });
    setQueue(queue);
    setArrState([...(queue.getContainer() as TCircleQueue[])]);
  };

  const removeTask = async () => {
    queue.getHeadTask()!.state = ElementStates.Changing;
    setQueue(queue);
    setArrState([...(queue.getContainer() as TCircleQueue[])]);
    await timeout(SHORT_DELAY_IN_MS);
    queue.dequeue();
    setQueue(queue);
    setArrState([...(queue.getContainer() as TCircleQueue[])]);
  };

  const removeStack = () => {
    queue.clearQueue();
    setQueue(queue);
    setArrState([...(queue.getContainer() as TCircleQueue[])]);
  };

  return (
    <SolutionLayout title="Очередь">
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
              disabled={queue.isEmpty() ? true : false}
            />
          </div>
          <Button
            type="button"
            text="Очистить"
            extraClass={style.newArrButton}
            onClick={removeStack}
            isLoader={false}
            disabled={!queue.isEmpty() || queue.checkEnd() ? false : true}
          />
        </article>
        <article className={style.circlesBox}>
          <ul className={style.circles}>
            {stateArr.map((item, index) => {
              return (
                <li className={style.circle} key={index}>
                  <Circle
                    letter={item ? item.value : undefined}
                    state={item ? item.state : undefined}
                    head={
                      !queue.isEmpty() && queue.getHeadTask() === item && item
                        ? "head"
                        : ""
                    }
                    tail={
                      !queue.isEmpty() && queue.getTailTask() === item && item
                        ? "tail"
                        : ""
                    }
                    index={index}
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
