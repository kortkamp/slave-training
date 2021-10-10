import React, {
  createContext, useState, ReactNode, useContext,
} from 'react';
// import useInterval from './useInterval';

interface IEmotionProviderProps {
  children: ReactNode;
}

export interface IExpression {
  name:string;
  head: {
    eyebrow:number;
    eyelip:number;
    pupilPosition:number;
    pupilRadius:number;
    tear:number;
    mouth:number;
  }
}

interface IEmotionContextData {
  expression: IExpression;
  // eslint-disable-next-line no-unused-vars
  setExpression: (newExpression:IExpression) => void;
}

export const EmotionContext = createContext<IEmotionContextData>(
  {} as IEmotionContextData,
);

export function EmotionProvider({ children }:IEmotionProviderProps) {
  const [expression, setExpression] = useState<IExpression>({
    name: 'default',
    head: {
      eyebrow: 0,
      eyelip: 0,
      pupilPosition: 0,
      pupilRadius: 0,
      tear: 0,
      mouth: 0,
    },
  });

  // function updateStatus() {

  // }

  // useInterval(() => { updateStatus(); }, 50);

  return (
    <EmotionContext.Provider value={{
      expression, setExpression,
    }}
    >
      {children}
    </EmotionContext.Provider>
  );
}
export function useEmotion() {
  const context = useContext(EmotionContext);

  return context;
}
