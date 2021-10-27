/* eslint-disable no-unused-vars */
import React, {
  createContext, useState, ReactNode, useContext, useEffect,
} from 'react';
import clone from 'clone-deep';
import api from '../services/api';
import useInterval from './useInterval';
import { IFood, ISlaveStatus } from '../interfaces';

import { useEmotion } from './useEmotion';
import { useAss } from './useAss';

import Default from '../data/DefaultStats';

interface ISlaveProviderProps {
  children: ReactNode;
}

interface ISlaveContextData {
  status: ISlaveStatus;
  // eslint-disable-next-line no-unused-vars
  setStatus: (newStatus:ISlaveStatus) => void;
  // eslint-disable-next-line no-unused-vars
  hurt: (value:number) => void;
  // eslint-disable-next-line no-unused-vars
  eat: (food:IFood) => void;
  squirtingLevel: number;
  orgasmLevel: number;
  orgasmProgress: number;
  chokingLevel: number;
  // eslint-disable-next-line no-unused-vars
  setChokingLevel: (value:number) => void;
  sleep: ()=>void;
  load: ()=>void;
}

export const SlaveContext = createContext<ISlaveContextData>(
  {} as ISlaveContextData,
);

// ms
const updateInterval = 50;
const updateBodyInterval = 1000;
// updates per second
const updateFrequecy = 1000 / updateInterval;

export function SlaveProvider({ children }:ISlaveProviderProps) {
  // ====== those should be persistent ============

  const [status, setStatus] = useState(() => api.Load('status') as ISlaveStatus || Default.stats);
  const [resistence, setResistence] = useState(() => api.Load('resistence') as ISlaveStatus || Default.resistence);
  const [preference, setPreference] = useState(() => api.Load('preference') as ISlaveStatus || Default.preference);

  // =========== those should be reseted after load or sleep ===========

  const [chokingLevel, setChokingLevel] = useState(0);
  const [squirtingLevel, setSquirtingLevel] = useState(0);
  const [orgasmLevel, setOrgasmLevel] = useState(0);
  const [orgasmProgress, setOrgasmProgress] = useState(0);
  const { buildExpression } = useEmotion();
  const ass = useAss();

  function doSquirt(level:number) {
    setSquirtingLevel(level);
    setTimeout(() => { setSquirtingLevel(0); }, 1000);
  }

  function doOrgasm() {
    const newOrgasmLevel = 1 + Math.round((status.lust - 100) / 20);
    setOrgasmLevel(newOrgasmLevel);
    setOrgasmProgress(0);
    console.log('start orgasm');
    setTimeout(() => {
      setOrgasmLevel(0);
      setOrgasmProgress(0);
      console.log('end orgasm');
      setStatus((value) => {
        const newValue = clone(value);
        newValue.lust = 20;
        return newValue;
      });
    }, newOrgasmLevel * 2000);
  }

  const updatePreferences = (newStatus: ISlaveStatus) => {
    const influenceRate = 0.0001;
    const painWithinLust = newStatus.pain < newStatus.lust
      ? newStatus.pain
      : 0;
    const painOverLust = newStatus.pain > newStatus.lust
      ? newStatus.pain - newStatus.lust
      : 0;
    preference.pain += influenceRate * (painWithinLust / updateFrequecy);
    preference.pain -= influenceRate * (painOverLust / updateFrequecy);
    const choke = 100 - newStatus.oxygen;
    const chokeWithinLust = choke < newStatus.lust
      ? choke
      : 0;
    const chokeOverLust = choke > newStatus.lust
      ? choke - newStatus.lust
      : 0;
    preference.oxygen += influenceRate * (chokeWithinLust / updateFrequecy);
    preference.oxygen -= influenceRate * (chokeOverLust / updateFrequecy);

    setPreference(preference);
  };

  function updateStatus() {
    const { drift } = Default;

    if (status.health <= 0) { return; }

    const newStatus = { ...status };
    const isPassedOut = newStatus.energy <= 0 || newStatus.oxygen <= 0;

    let newOrgasmProgress = orgasmProgress;
    // get the most recent orgasm progress value
    setOrgasmProgress((value) => { newOrgasmProgress = value; return value; });

    // update pain
    const minimunPain = 100 - newStatus.health;
    newStatus.pain += ass.getPain() / updateFrequecy;
    newStatus.pain += chokingLevel * 1.5;
    if (newStatus.pain > minimunPain) {
      newStatus.pain += drift.pain;
    }
    if (newStatus.pain < minimunPain && !isPassedOut) {
      newStatus.pain = minimunPain;
    }

    const chokeDesireInfluence = ((10 * chokingLevel) * preference.oxygen)
    / updateFrequecy;
    const painDesireInfluence = (newStatus.pain * preference.pain) / updateFrequecy;

    // update fear
    if (newStatus.fear > 0) {
      newStatus.fear += drift.fear;
    }
    newStatus.fear -= (chokeDesireInfluence + painDesireInfluence);

    if (newStatus.fear < 0) { newStatus.fear = 0; }

    // update oxygen
    if (newStatus.oxygen < 100) {
      newStatus.oxygen += drift.oxygen;
    }
    if (newStatus.oxygen > 0) {
      newStatus.oxygen -= chokingLevel;
    }

    // update health
    if (newStatus.oxygen <= 0) {
      newStatus.health -= 0.15;
    }

    // update lust

    newStatus.lust += chokeDesireInfluence + painDesireInfluence;

    newStatus.lust += ass.getLust();

    if (newStatus.lust >= 0 && orgasmLevel === 0) {
      newStatus.lust -= 0.01 * (0.1 * newStatus.lust + newStatus.fear);
    }

    if (newStatus.lust < 0) {
      newStatus.lust = 0;
    }

    // console.log(`${newStatus.lust >= 0} ${newStatus.lust} ${status.lust}`);

    newOrgasmProgress += (newStatus.lust - status.lust - 0.01 * newOrgasmProgress);
    if (newOrgasmProgress < 0) {
      newOrgasmProgress = 0;
    }

    const drainFromPain = 0.001 * newStatus.pain * (1 - resistence.pain);
    const drainFromLust = 0.001 * newStatus.lust * (1 - resistence.lust);

    // update energy and nutrition
    if (newStatus.health < newStatus.energy) {
      newStatus.energy = newStatus.health;
    }
    newStatus.energy -= (drainFromLust + drainFromPain);
    newStatus.energy += drift.energy;

    if (newStatus.nutrition > 0) {
      newStatus.nutrition -= (drainFromLust + drainFromPain);
      newStatus.nutrition += drift.nutrition;
    } else {
      newStatus.health -= (drainFromLust + drainFromPain);
      newStatus.health += drift.nutrition;
    }

    // do squirt
    if (squirtingLevel === 0) {
      if (newStatus.pain > 100) {
        if (Math.random() < 0.01) {
          doSquirt(1 + Math.round((newStatus.pain - 100) / 20));
        }
      }
    }
    // do orgasm
    if (orgasmLevel === 0 && orgasmProgress > 100) {
      doOrgasm();
    }

    // check limits
    if (newStatus.lust > 200) {
      newStatus.lust = 200;
    }
    if (newStatus.fear > 200) {
      newStatus.fear = 200;
    }

    setOrgasmProgress(newOrgasmProgress);
    setStatus(newStatus);

    if (isPassedOut) {
      newStatus.lust = 0;
      newStatus.pain = 0;
      newStatus.fear = 0;
      setOrgasmLevel(0);
      setOrgasmProgress(0);
    } else {
      updatePreferences(newStatus);
      buildExpression(newStatus);
    }

    console.log(preference.pain);
  }

  function updateBody() {
    let newStatus = clone(status);
    setStatus((mostRecentStatus) => {
      newStatus = clone(mostRecentStatus);
      return mostRecentStatus;
    });

    if (orgasmLevel > 0) {
      newStatus.lust += Math.random() > 0.5 ? 20 : -20;
      if (squirtingLevel === 0) {
        if (Math.random() < 0.99) {
          doSquirt(1 + Math.round((status.lust - 100) / 20));
        }
      }
    }

    setStatus(newStatus);
  }

  function updateResistence() {}

  function updateMinimum() {}

  function hurt(value:number) {
    setStatus((currentStatus) => {
      const newValue = clone(currentStatus);
      newValue.pain += value;
      newValue.health -= 0.1 * value;
      return newValue;
    });
  }

  function eat(food:IFood) {
    setStatus((currentStatus) => {
      const newValue = clone(currentStatus);
      newValue.nutrition += food.nutrition;
      newValue.fear -= food.moral;
      // update moral
      return newValue;
    });
  }
  function sleep() {
    const storedData = {
      status,
      preference,
      resistence,
    };
    api.Save('status', status);
    api.Save('resistence', resistence);
    api.Save('preference', preference);
    // save status
    // save preference
    // save resistence
  }
  function load() {
    setStatus(api.Load('status'));
    setPreference(api.Load('resistence'));
    setResistence(api.Load('preference'));
  }

  useInterval(() => { updateStatus(); updateResistence(); updateMinimum(); }, updateInterval);
  useInterval(() => { updateBody(); }, updateBodyInterval);

  return (
    <SlaveContext.Provider value={{
      status,
      setStatus,
      hurt,
      eat,
      chokingLevel,
      orgasmLevel,
      orgasmProgress,
      setChokingLevel,
      squirtingLevel,
      sleep,
      load,
    }}
    >
      {children}
    </SlaveContext.Provider>
  );
}
export function useSlave() {
  const context = useContext(SlaveContext);

  return context;
}
