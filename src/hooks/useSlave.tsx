import React, {
  createContext, useState, ReactNode, useContext,
} from 'react';
import useInterval from './useInterval';

export interface ISlaveStatus {
  lust:number;
  pain:number;
  fear:number;
  energy:number;
  oxygen:number;
  health: number;

    stretch: number,
    depth: number,

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

export function SlaveProvider({ children }:IAuthProviderProps) {
  const [status, setStatus] = useState({
    lust: 0,
    pain: 0,
    fear: 0,
    energy: 100,
    oxygen: 100,
    health: 100,

    stretch: 0,
    depth: 0,

  });

  const [resistence, setResistence] = useState({
    lust: 0,
    pain: 0,
    fear: 0,
    energy: 0,
    oxygen: 0,
    health: 0,
  });

  const [chokingLevel, setChokingLevel] = useState(0);

  function updateStatus() {
    const change = {
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
    if (newStatus.pain > 0) {
      newStatus.pain += change.pain;
    }

    // update fear
    if (newStatus.pain === 0 && newStatus.fear > 0) {
      newStatus.fear += change.fear;
    }
    if (newStatus.fear <= 100) {
      newStatus.fear += chokingLevel / 5;
    }

    // update oxygen
    if (newStatus.oxygen < 100) {
      newStatus.oxygen += change.oxygen;
    }
    if (newStatus.oxygen > 0) {
      newStatus.oxygen -= chokingLevel;
    }

    // update health
    if (newStatus.oxygen <= 0) {
      newStatus.health -= 0.15;
    }
    setStatus(newStatus);
  }

  useInterval(() => { updateStatus(); }, updateInterval);

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
    // here we need to use this trick to get access to the last state of status.
    setStatus((currentStatus) => {
      updatedStatus = { ...currentStatus };
      return currentStatus;
    });

    if (stretch > updatedStatus.stretch) {
      updatedStatus.pain += stretch - updatedStatus.stretch;
    }
    if (depth > 0) {
      updatedStatus.lust += Math.abs(depth - updatedStatus.depth) / 100;
    }
    updatedStatus.depth = depth;
    updatedStatus.stretch = stretch;
    setStatus(updatedStatus);
  }

  return (
    <SlaveContext.Provider value={{
      status, setStatus, hurt, setChokingLevel, penetrateAss,
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
