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
}

export const SlaveContext = createContext<ISlaveContextData>(
  {} as ISlaveContextData,
);

export function SlaveProvider({ children }:IAuthProviderProps) {
  const [status, setStatus] = useState({
    lust: 0,
    pain: 0,
    fear: 0,
    energy: 100,
    oxygen: 100,
    health: 100,
  });

  const [resistence, setResistence] = useState({
    lust: 0,
    pain: 0,
    fear: 0,
    energy: 0,
    oxygen: 0,
    health: 0,
  });

  function updateStatus() {
    const decay = {
      lust: -0.2,
      pain: -1,
      fear: -0.1,
      energy: 0.1,
      oxygen: 0.5,
      health: 0,
    };

    const newStatus = { ...status };
    // update pain
    if (newStatus.pain > 0) {
      newStatus.pain += decay.pain;
    }

    // update fear
    if (newStatus.pain === 0 && newStatus.fear > 0) {
      newStatus.fear += decay.fear;
    }

    if (newStatus.oxygen < 100) {
      newStatus.oxygen += decay.oxygen;
    }
    setStatus(newStatus);
  }

  useInterval(() => { updateStatus(); }, 50);

  function hurt(value:number) {
    const updatedResistence = { ...resistence };
    updatedResistence.fear += 0.1 * value;
    const updatedStatus = { ...status };
    updatedStatus.health -= value;
    updatedStatus.pain += 2 * value;
    setStatus(updatedStatus);
    setResistence(updatedResistence);
  }

  return (
    <SlaveContext.Provider value={{
      status, setStatus, hurt,
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
