/* eslint-disable no-unused-vars */
import React, {
  createContext, useState, ReactNode, useContext, useEffect,
} from 'react';
import clone from 'clone-deep';
import useInterval from './useInterval';
import ISlaveStatus from '../interfaces';

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
  squirtingLevel: number;
  orgasmLevel: number;
  orgasmProgress: number;
  chokingLevel: number;

  // eslint-disable-next-line no-unused-vars
  setChokingLevel: (value:number) => void;

}

export const SlaveContext = createContext<ISlaveContextData>(
  {} as ISlaveContextData,
);

// ms
const updateInterval = 50;
const updateFrequecy = 1000 / updateInterval;
const updateBodyInterval = 1000;

export function SlaveProvider({ children }:ISlaveProviderProps) {
  // ====== those should be persistent ============
  const [status, setStatus] = useState(Default.stats);
  const [resistence, setResistence] = useState(Default.resistence);
  // eslint-disable-next-line no-unused-vars
  const [preference, setPreference] = useState(Default.preference);

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

  function updateStatus() {
    const { drift } = Default;

    if (status.health <= 0) { return; }

    const newStatus = { ...status };
    let newOrgasmProgress = orgasmProgress;

    // get the most recent orgasm progress value
    setOrgasmProgress((value) => { newOrgasmProgress = value; return value; });

    const isPassedOut = newStatus.energy <= 0 || newStatus.oxygen <= 0;

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

    // update fear
    if (newStatus.fear > 0) {
      newStatus.fear += drift.fear;
    }

    const chokeDesireInfluence = ((10 * chokingLevel) * preference.oxygen)
    / updateFrequecy;
    const painDesireInfluence = (newStatus.pain * preference.pain) / updateFrequecy;

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

    // if lust continuously increase => do orgasm

    // update energy
    newStatus.energy -= 0.001 * newStatus.pain * (1 - resistence.pain);
    newStatus.energy -= 0.001 * newStatus.lust * (1 - resistence.lust);

    if (newStatus.health < newStatus.energy) {
      newStatus.energy = newStatus.health;
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

    setOrgasmProgress(newOrgasmProgress);
    setStatus(newStatus);

    if (isPassedOut) {
      newStatus.lust = 0;
      newStatus.pain = 0;
      newStatus.fear = 0;
      setOrgasmLevel(0);
      setOrgasmProgress(0);
    } else {
      buildExpression(newStatus);
    }
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

  useInterval(() => { updateStatus(); updateResistence(); updateMinimum(); }, updateInterval);
  useInterval(() => { updateBody(); }, updateBodyInterval);

  return (
    <SlaveContext.Provider value={{
      status,
      setStatus,
      hurt,
      chokingLevel,
      orgasmLevel,
      orgasmProgress,
      setChokingLevel,
      squirtingLevel,
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
