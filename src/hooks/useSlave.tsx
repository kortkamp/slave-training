/* eslint-disable no-unused-vars */
import React, {
  createContext, useState, ReactNode, useContext, useEffect,
} from 'react';
import clone from 'clone-deep';
import useInterval from './useInterval';
import ISlaveStatus from '../interfaces';

import { useEmotion } from './useEmotion';

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
  // eslint-disable-next-line no-unused-vars
  penetrateAss: (penetration:{ depth: number, stretch: number }) => void
}

export const SlaveContext = createContext<ISlaveContextData>(
  {} as ISlaveContextData,
);

// ms
const updateInterval = 50;
const updateBodyInterval = 1000;

export function SlaveProvider({ children }:ISlaveProviderProps) {
  // ====== those should be persistent ============
  const [status, setStatus] = useState({
    lust: 0,
    pain: 0,
    fear: 0,
    energy: 100,
    oxygen: 100,
    health: 100,
    ass: {
      stretch: 0,
      depth: 0,
    },

  });

  const [resistence, setResistence] = useState({
    lust: 0.1,
    pain: 0.1,
    fear: 0,
    energy: 0,
    oxygen: 0,
    health: 0,
    ass: {
      stretch: 1,
      depth: 0,
    },
  });

  const [minimum, setMinimum] = useState({
    lust: 0,
    pain: 0,
    fear: 0,
    energy: 0,
    oxygen: 0,
    health: 0,
    ass: {
      stretch: 0,
      depth: 0,
    },
  });

  // eslint-disable-next-line no-unused-vars
  const [preference, setPreference] = useState({
    lust: 0,
    pain: 0,
    fear: 0,
    energy: 0,
    oxygen: 0.05,
    health: 0,
    ass: {
      stretch: 0.05,
      depth: 0.05,
    },
  });

  // eslint-disable-next-line no-unused-vars
  const [fear, setFear] = useState({
    lust: 0,
    pain: 0.03,
    fear: 0,
    energy: 0,
    oxygen: 0,
    health: 0,
    ass: {
      stretch: 0.05,
      depth: 0.05,
    },
  });

  // =========== those should be reseted after load or sleep ===========

  const [chokingLevel, setChokingLevel] = useState(0);

  const [squirtingLevel, setSquirtingLevel] = useState(0);

  const [orgasmLevel, setOrgasmLevel] = useState(0);

  const [orgasmProgress, setOrgasmProgress] = useState(0);

  const { buildExpression } = useEmotion();

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
        const newultranewStatus = clone(value);
        newultranewStatus.lust = 20;
        return newultranewStatus;
      });
    }, newOrgasmLevel * 2000);
  }

  function updateStatus() {
    const drift = {
      lust: -0.2,
      pain: -1,
      fear: -0.02,
      energy: 0.1,
      oxygen: 0.5,
      health: 0,
    };

    if (status.health <= 0) { return; }

    const newStatus = { ...status };
    let newOrgasmProgress = orgasmProgress;

    setOrgasmProgress((value) => { newOrgasmProgress = value; return value; });

    // update pain
    const minimunPaint = 100 - newStatus.health;
    if (newStatus.pain > minimunPaint) {
      newStatus.pain += drift.pain;
    }
    if (newStatus.pain < minimunPaint) {
      newStatus.pain = minimunPaint;
    }

    // update fear
    if (newStatus.pain === 0 && newStatus.fear > 0) {
      newStatus.fear += drift.fear;
    }
    if (newStatus.fear <= 100) {
      newStatus.fear += chokingLevel * fear.oxygen;
      newStatus.fear += newStatus.pain * fear.pain;
    }

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

    newStatus.lust += newStatus.pain * preference.pain;
    newStatus.lust += 10 * chokingLevel * preference.oxygen;

    if (newStatus.lust >= 0 && orgasmLevel === 0) {
      newStatus.lust -= 0.01 * (0.1 * newStatus.lust + newStatus.fear);
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

    // ============= UPDATE BODY ==============
    // change to updateBody

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

    buildExpression(newStatus);
  }

  function updateBody() {
    let newStatus = clone(status);
    setStatus((mostRecentStatus) => {
      newStatus = clone(mostRecentStatus);
      return mostRecentStatus;
    });
    // update stretch
    if (newStatus.ass.stretch > minimum.ass.stretch) {
      newStatus.ass.stretch -= 20 * resistence.ass.stretch;
      if (newStatus.ass.stretch < minimum.ass.stretch) {
        newStatus.ass.stretch = minimum.ass.stretch;
      }
    }

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

  function updateResistence() {
    const updatedResistence = { ...resistence };
    if (status.ass.stretch > 0) {
      updatedResistence.ass.stretch /= (1 + status.ass.stretch / 100000);
    }
    setResistence(updatedResistence);
  }

  function updateMinimum() {}

  function hurt(value:number) {
    setStatus((currentStatus) => {
      const newValue = clone(currentStatus);
      newValue.pain += value;
      return newValue;
    });
  }

  function penetrateAss({ depth, stretch }:{depth: number, stretch: number }) {
    let lust = 0;
    let pain = 0;

    let updatedStatus = { ...status };
    const updatedMinimum = { ...minimum };

    // here we need to use this trick to get access to the last state of status.
    setStatus((currentStatus) => {
      updatedStatus = { ...currentStatus };
      return currentStatus;
    });

    if (stretch > updatedStatus.ass.stretch) {
      pain += (stretch - updatedStatus.ass.stretch) ** 2;
      lust += Math.abs(stretch - updatedStatus.ass.stretch) * preference.ass.stretch;
      updatedStatus.ass.stretch = stretch;
    }
    if (depth > 0) {
      lust += Math.abs(depth - updatedStatus.ass.depth) * preference.ass.depth;
    }

    updatedStatus.ass.depth = depth;
    updatedMinimum.ass.stretch = stretch;
    updatedStatus.lust += lust;
    updatedStatus.pain += pain;

    setOrgasmProgress((lastValue) => lastValue + lust);
    setStatus(updatedStatus);
    setMinimum(updatedMinimum);
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
      penetrateAss,
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
