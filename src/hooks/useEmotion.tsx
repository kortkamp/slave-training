import React, {
  createContext, useState, ReactNode, useContext,
} from 'react';

import Expression from '../data/Expression.json';

// import clone from 'clone-deep';
// import useInterval from './useInterval';

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
  }
}

export interface IReaction {
  name:string;
  priority:number;
  expression:{
    name: string;
    time:number;
  }[]
}

export interface ITimedExpression {
  name:string;
  time:number;
  face: {
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

  // eslint-disable-next-line no-unused-vars
  playReaction: (reaction:IReaction) => void;

  // eslint-disable-next-line no-unused-vars
  loadExpressionFromData: (name:string)=>void;
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
    },
  });

  const [reactionTimeoutId, setReactionTimeoutId] = useState<number[]>([]);

  function getDefaultExpression() {
    return {
      name: 'default',
      time: 0,
      face: {
        eyebrow: 0,
        eyelip: 0,
        pupilPosition: 0,
        pupilRadius: 3,
        tear: 0,
        mouth: 0,
      },
    };
  }
  // Here is a very tricky function to load expression from JSON
  // I've made this mess bcuz restriction of typescript.
  function loadExpressionFromData(name:string) {
    interface IIndexable {
      [key: string]: any;
    }
    const loadedExpression = { name, ...(Expression as IIndexable)[name] } as IExpression;
    setExpression(loadedExpression);
  }

  function stopReaction() {
    reactionTimeoutId.forEach((id) => {
      window.clearTimeout(id);
    });
    setReactionTimeoutId([]);
  }

  async function playReaction(reaction:IReaction) {
    function reactionTimeout(ms:number) {
      return new Promise((resolve) => {
        const id = window.setTimeout(resolve, ms);
        setReactionTimeoutId([...reactionTimeoutId, id]);
      });
    }
    let accumulatedTime = 0;

    const timedExpressionList = reaction.expression.map((exp) => {
      accumulatedTime += exp.time;
      return ({ ...exp, time: accumulatedTime - exp.time });
    });

    stopReaction();

    timedExpressionList.forEach(async (timedExpression) => {
      await reactionTimeout(timedExpression.time * 1000);
      loadExpressionFromData(timedExpression.name);
      // console.log(`step ${0}`);
    });

    await reactionTimeout(accumulatedTime * 1000);
    setExpression(getDefaultExpression());
  }

  return (
    <EmotionContext.Provider value={{
      expression, setExpression, playReaction, loadExpressionFromData,
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
