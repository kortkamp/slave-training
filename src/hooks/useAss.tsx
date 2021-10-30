import React, {
  createContext, useState, ReactNode, useContext, useReducer,
} from 'react';
import useInterval from './useInterval';

interface IAssProviderProps {
  children: ReactNode;
}

interface IEmotionContextData {
  depth: number;
  stretch: number;
  // eslint-disable-next-line no-unused-vars
  penetrateAss: (penetration:{ depth: number, stretch: number }) => void
  // eslint-disable-next-line no-unused-vars
  addEnema: (ammount:number) => void;
  isExpelingEnema: boolean;
  enemaLevel:number;
  getPain: ()=>number;
  getLust: ()=>number;
  // eslint-disable-next-line no-unused-vars
  initialize: (stats:{ maxStretch:number, enemaCapacity:number })=> void;
  getStats: () => {maxStretch:number, enemaCapacity:number };

}

const updateAssInterval = 1000;

// how many secondas need to enlarge ass
const assResistence = 30;

// how much lust increases on penetration
const lustFromPenetration = 0.0001;

const lustFromEnema = 0.1;

// how dificult is to belly stretch to enema new enema level
const enemaResistence = 20;

export const AssContext = createContext<IEmotionContextData>(
  {} as IEmotionContextData,
);

interface IReducerStateAction {
  type: 'set'|'add'|'get';
  state: number;
}

function reducerState(state:number, action:IReducerStateAction) {
  switch (action.type) {
    case 'set':
      return action.state;
    case 'add':
      return state + action.state;
    case 'get':
      return state - action.state;
    default:
      throw new Error();
  }
}

export function AssProvider({ children }:IAssProviderProps) {
  // =========== those should be reseted after load or sleep ===========

  // eslint-disable-next-line no-unused-vars
  // const [, setLust] = useState(0);

  const [lust, dispatchLust] = useReducer(reducerState, 0);

  const [depth, setDepth] = useState(0);

  const [stretch, setStretch] = useState(0);

  const [minStretch, setMinStretch] = useState(0);

  const [enemaLevel, setEnemaLevel] = useState(0);

  const [isExpelingEnema, setIsExpelingEnema] = useState(false);

  // =========== those should be saved after load or sleep ===========

  const [enemaCapacity, setEnemaCapacity] = useState(0);
  const [maxStretch, setMaxStretch] = useState(0);

  function initialize(stats:{ maxStretch:number, enemaCapacity:number }) {
    setMaxStretch(stats.maxStretch);
    setEnemaCapacity(stats.enemaCapacity);
  }
  function getStats() {
    return { maxStretch, enemaCapacity };
  }

  function tryExpelEnema(force?:boolean) {
    if (depth === 0 || force) {
      setEnemaLevel((enemaValue) => {
        const newValue = enemaValue - 1;
        setIsExpelingEnema(true);

        if (newValue > 0) {
          return newValue;
        }
        return 0;
      });
    }
    // setStretch(newStretch);
  }

  // must be updated every 1 second
  function updateAss() {
    // update stretch
    setStretch((value) => {
      let newStretch = value;
      if (newStretch > minStretch) {
        newStretch -= 10;
        if (newStretch < minStretch) {
          newStretch = minStretch;
        }
      }
      return newStretch;
    });
    // update maxStretch
    setMaxStretch((valueMaxStretch) => {
      const diff = stretch - valueMaxStretch;
      if (diff > 0) {
        return valueMaxStretch + diff / assResistence;
      }
      return valueMaxStretch;
    });
    // console.log(`stretch:${stretch} maxstretch:${maxStretch}`);

    // enema update

    if (isExpelingEnema) {
      setIsExpelingEnema(false);
    } else if (enemaLevel > enemaCapacity) {
      // newStatus.pain += 20;
      tryExpelEnema();
    }
    if (depth === 0 && stretch > 0 && enemaLevel > 0) {
      tryExpelEnema(true);
    }
    setEnemaCapacity((capacity) => {
      const overLimit = enemaLevel - capacity;
      if (overLimit > 0) {
        return capacity + overLimit / enemaResistence;
      }
      return (capacity);
    });
  }

  function penetrateAss(penetration:{depth: number, stretch: number }) {
    if (penetration.stretch > stretch) {
      setStretch(penetration.stretch);
    }
    if (penetration.depth > 0) {
      let lustIncrement = lustFromPenetration * Math.abs(penetration.depth - depth);
      lustIncrement *= (10 + penetration.stretch);
      // setLust((value) => value + lustIncrement);
      dispatchLust({ type: 'add', state: lustIncrement });
    }

    setDepth(penetration.depth);
    setMinStretch(penetration.stretch);
  }

  function addEnema(ammount:number) {
    setEnemaLevel((value) => value + ammount);
  }

  function getPain() {
    let painAss = 0;
    if (stretch - maxStretch > 0) {
      painAss = ((stretch - maxStretch) / 4) ** 2;
    }
    let painEnema = 0;
    if (enemaLevel > enemaCapacity) {
      painEnema = 10 * (enemaLevel - enemaCapacity);
    }
    return painAss + painEnema;
  }
  function getLust() {
    let gotLust = enemaLevel * lustFromEnema;
    // setLust((value) => {
    //   gotLust += value;
    //   return 0;
    // });
    if (lust > 0) {
      gotLust += lust;
      dispatchLust({ type: 'get', state: lust });
    }
    return gotLust;
  }

  useInterval(() => { updateAss(); }, updateAssInterval);
  return (
    <AssContext.Provider value={{
      depth,
      stretch,
      penetrateAss,
      addEnema,
      isExpelingEnema,
      enemaLevel,
      getPain,
      getLust,
      initialize,
      getStats,
    }}
    >
      {children}
    </AssContext.Provider>
  );
}
export function useAss() {
  const context = useContext(AssContext);

  return context;
}
