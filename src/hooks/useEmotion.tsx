import React, {
  createContext, useState, ReactNode, useContext,
} from 'react';

import deepEqual from 'deep-equal';

import Expression from '../data/Expression.json';
import ISlaveStatus from '../interfaces';

interface IEmotionProviderProps {
  children: ReactNode;
}

export interface IExpression {
  name:string;
  time:number;
  face: {
    eyebrow:number;
    eyelip:number;
    pupilPosition:number;
    pupilRadius:number;
    tear:number;
    mouth:number;
    color?:number;
    legs?:number;
    arms?:number;
  }
}

interface IEmotionContextData {
  expression: IExpression;
  // eslint-disable-next-line no-unused-vars
  setExpression: (newExpression:IExpression) => void;

  // playReaction: (reaction:IReaction) => void;

  // eslint-disable-next-line no-unused-vars
  loadExpressionFromData: (name:string)=>void;

  // eslint-disable-next-line no-unused-vars
  buildExpression: (status:ISlaveStatus) => void
}

export const EmotionContext = createContext<IEmotionContextData>(
  {} as IEmotionContextData,
);

export function EmotionProvider({ children }:IEmotionProviderProps) {
  const [expression, setExpression] = useState<IExpression>({
    name: 'default',
    time: 0,
    face: {
      eyebrow: 0,
      eyelip: 0,
      pupilPosition: 0,
      pupilRadius: 3,
      tear: 0,
      mouth: 0,
      color: 0,
      legs: 0,
      arms: 0,
    },
  });

  // Here is a very tricky function to load expression from JSON
  // I've made this mess bcuz restriction of typescript.
  function loadExpressionFromData(name:string) {
    interface IIndexable {
      [key: string]: any;
    }
    const loadedExpression = { name, ...(Expression as IIndexable)[name] } as IExpression;
    return loadedExpression;
  }

  function buildExpression(status:ISlaveStatus) {
    let requestExpressionUpdate = false;
    let newExpression = loadExpressionFromData('default');

    // fear expression
    let fearLevel = Math.round(status.fear / 20);
    if (fearLevel > 5) {
      fearLevel = 5;
    }

    // pain expression
    let painLevel = Math.round(status.pain / 20);
    if (painLevel > 6) {
      painLevel = 6;
    }

    let lustLevel = Math.round(status.lust / 20);
    if (lustLevel > 10) {
      lustLevel = 10;
    }

    if (fearLevel > 0 && fearLevel <= 5) {
      newExpression = loadExpressionFromData(`fear${fearLevel}`);
    }

    if (lustLevel > 0 && lustLevel <= 10) {
      newExpression = loadExpressionFromData(`lust${lustLevel}`);
    }

    painLevel -= lustLevel;
    if (painLevel > 0 && painLevel <= 6) {
      newExpression = loadExpressionFromData(`pain${painLevel}`);
    }

    newExpression.face.tear = fearLevel;

    requestExpressionUpdate = !deepEqual(newExpression, expression);

    // here I have a issue. deepEqual seems to be ignoring optional fields
    // so we need to manually force requestExpressionUpdate for face.color
    const headColor = Math.round((100 - status.oxygen) / 20);
    if (headColor !== newExpression.face.color) {
      newExpression.face.color = headColor;
      requestExpressionUpdate = true;
    }

    // update state just in case of expression really changed
    if (requestExpressionUpdate) {
      setExpression(newExpression);
    }
  }

  console.log('render emotion');

  return (
    <EmotionContext.Provider value={{
      expression, setExpression, loadExpressionFromData, buildExpression,
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
