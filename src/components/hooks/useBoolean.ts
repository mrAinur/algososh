import { useState, useCallback } from "react";

// кастомные хуки всегда должны начинаться с глагола `use`, чтобы реакт понял, что это хук. Он следит за их вызовами
export const useBoolean = () => {
  const [isBoolean, setBoolean] = useState(false);

  // `useCallback` нужен для того, чтобы зафиксировать ссылку на функцию. Таким образом уменьшится кол-во перерисовок компонента, куда будет передана эта функция
  const setTrueBoolean = useCallback(() => {
    setBoolean(true);
  }, []);

  const setFalseBoolean = useCallback(() => {
    setBoolean(false);
  }, []);

  return {
    isBoolean,
    setTrueBoolean,
    setFalseBoolean,
  };
};
