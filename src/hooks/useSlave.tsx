import React, {
  createContext, useState, ReactNode, useContext,
} from 'react';

interface ISlaveStatus {
  lust:number;
  pain:number;
  fear:number;
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
    oxygen: 100,
    health: 100,
  });

  function hurt(value:number) {
    const updatedStatus = { ...status };
    updatedStatus.health -= value;
    setStatus(updatedStatus);
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
