import React, {
  createContext, useState, ReactNode, useContext,
} from 'react';

// import clone from 'clone-deep';
import Expression from '../data/Expression.json';
import ISlaveStatus from '../interfaces';
// import ReactionList from '../data/Reaction.json';

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
    legs?:number;
    arms?:number;
  }
}

// export interface IReaction {
//   name:string;
//   priority:number;
//   expression:{
//     name: string;
//     time:number;
//   }[]
//   speech?:[];
// }

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
      legs: 0,
      arms: 0,
    },
  });

  // const [activeReaction, setActiveReaction] = useState<IReaction>();

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

    setExpression(newExpression);
  }

  // function stepReaction() {
  //   const updatedReaction = clone(activeReaction);
  //   const reactionStep = updatedReaction?.expression.shift();
  //   if (reactionStep) {
  //     loadExpressionFromData(reactionStep.name);
  //     setTimeout(() => setActiveReaction(updatedReaction), 1000 * reactionStep.time);
  //   } else {
  //     setActiveReaction(undefined);
  //     getDefaultExpression();
  //   }
  // }

  // function playReaction(reaction:IReaction) {
  //   // ignore less prioritable reaction
  //   if (activeReaction && activeReaction.priority >= reaction.priority) { return; }
  //   setActiveReaction(clone(reaction));
  // }
  // useEffect(() => {
  //   if (activeReaction?.expression) {
  //     stepReaction();
  //   }
  // }, [activeReaction]);

  // useEffect(() => {
  //   if (!activeReaction) {
  //     getDefaultExpression();
  //   }
  // }, [status]);

  // useEffect(() => {
  //   if (orgasmLevel > 0) {
  //     playReaction({ name: 'orgasm', ...ReactionList.orgasm1 });
  //   }
  // }, [orgasmLevel]);

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
