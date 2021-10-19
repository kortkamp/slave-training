import React, {
  createContext, useState, ReactNode, useContext,
} from 'react';
import clone from 'clone-deep';
import useInterval from './useInterval';

export interface ISlaveStatus {
  lust:number;
  pain:number;
  fear:number;
  energy:number;
  oxygen:number;
  health: number;
  ass:{
    stretch: number,
    depth: number,
  }
}

interface IAuthProviderProps {
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

export function SlaveProvider({ children }:IAuthProviderProps) {
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
      stretch: 3,
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

  const [chokingLevel, setChokingLevel] = useState(0);

  const [squirtingLevel, setSquirtingLevel] = useState(0);

  const [orgasmLevel, setOrgasmLevel] = useState(0);

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

    newStatus.lust -= 0.01 * (0.1 * newStatus.lust + newStatus.fear);

    // if lust continuously increase => do orgasm

    // update energy
    newStatus.energy -= 0.002 * newStatus.pain * (1 - resistence.pain);
    newStatus.energy -= 0.002 * newStatus.lust * (1 - resistence.lust);

    // ============= UPDATE BODY ==============
    // change to updateBody
    // update stretch
    if (newStatus.ass.stretch > minimum.ass.stretch) {
      newStatus.ass.stretch -= resistence.ass.stretch;
    }

    // do squirt
    if (squirtingLevel === 0) {
      if (newStatus.lust > 100) {
        if (Math.random() < 0.01) {
          setSquirtingLevel(1 + Math.round((newStatus.lust - 100) / 20));
          setTimeout(() => { setSquirtingLevel(0); }, 1000);
        }
      }
      if (newStatus.pain > 100) {
        if (Math.random() < 0.01) {
          setSquirtingLevel(1 + Math.round((newStatus.pain - 100) / 20));
          setTimeout(() => { setSquirtingLevel(0); }, 1000);
        }
      }
    }
    // do orgasm
    const orgasmChance = 0.01;
    if (orgasmLevel === 0) {
      if (newStatus.lust > 100) {
        if (Math.random() < orgasmChance) {
          const newOrgasmLevel = 1 + Math.round((newStatus.lust - 100) / 20);
          console.log(`new orgasm: ${newOrgasmLevel}`);
          setOrgasmLevel(newOrgasmLevel);
          setTimeout(() => {
            setOrgasmLevel(0);
            console.log('orgasm finished');
            setStatus((ultranewStatus) => {
              const newultranewStatus = clone(ultranewStatus);
              newultranewStatus.lust -= 80;
              return newultranewStatus;
            });
          }, newOrgasmLevel * 2000);
        }
      }
    }

    setStatus(newStatus);
  }

  function updateBody() {
    const newStatus = clone(status);
    if (orgasmLevel > 0) {
      newStatus.lust += Math.random() > 0.5 ? 20 : -20;
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

  useInterval(() => { updateStatus(); updateResistence(); updateMinimum(); }, updateInterval);
  useInterval(() => { updateBody(); }, updateBodyInterval);

  function hurt(value:number) {
    const updatedResistence = { ...resistence };
    updatedResistence.fear += 0.1 * value;
    const updatedStatus = { ...status };
    updatedStatus.health -= value;
    updatedStatus.pain += 2 * value;
    setStatus(updatedStatus);
    setResistence(updatedResistence);
  }

  function penetrateAss({ depth, stretch }:{depth: number, stretch: number }) {
    let updatedStatus = { ...status };
    const updatedMinimum = { ...minimum };

    // here we need to use this trick to get access to the last state of status.
    setStatus((currentStatus) => {
      updatedStatus = { ...currentStatus };
      return currentStatus;
    });

    if (stretch > updatedStatus.ass.stretch) {
      updatedStatus.pain += stretch - updatedStatus.ass.stretch;
      updatedStatus.lust += Math.abs(stretch - updatedStatus.ass.stretch) * preference.ass.stretch;
      updatedStatus.ass.stretch = stretch;
    }
    if (depth > 0) {
      updatedStatus.lust += Math.abs(depth - updatedStatus.ass.depth) * preference.ass.depth;
    }

    updatedStatus.ass.depth = depth;
    updatedMinimum.ass.stretch = stretch;

    setStatus(updatedStatus);
    setMinimum(updatedMinimum);
  }

  return (
    <SlaveContext.Provider value={{
      status,
      setStatus,
      hurt,
      chokingLevel,
      orgasmLevel,
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
