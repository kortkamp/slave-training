/* eslint-disable no-unused-vars */
import React, {
  createContext, useState, ReactNode, useContext, useReducer,
} from 'react';
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
  preference: ISlaveStatus;
  resistence: ISlaveStatus;
  // eslint-disable-next-line no-unused-vars
  dispatchStatus: ({ type, state }:IReducerStatusAction) => void;
  // eslint-disable-next-line no-unused-vars
  hurt: (value:number) => void;
  // eslint-disable-next-line no-unused-vars
  eat: (food:IFood) => void;
  squirtingLevel: number;
  orgasmLevel: number;
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

interface IReducerStatusAction {
  type:'set'|'add'|'clear'|'update';
  state: ISlaveStatus;
  resistence?:ISlaveStatus;
  preference?:ISlaveStatus;
}
function addStatus(status1:ISlaveStatus, status2:ISlaveStatus) {
  return {
    orgasm: status1.orgasm + status2.orgasm,
    lust: status1.lust + status2.lust,
    pain: status1.pain + status2.pain,
    fear: status1.fear + status2.fear,
    energy: status1.energy + status2.energy,
    nutrition: status1.nutrition + status2.nutrition,
    oxygen: status1.oxygen + status2.oxygen,
    health: status1.health + status2.health,
  };
}

function update(status:ISlaveStatus, preference:ISlaveStatus, resistence: ISlaveStatus) {
  // update drifts
  if (status.health <= 0) {
    return status;
  }
  const newStatus = addStatus(Default.drift, status);

  const drainFromPain = 0.001 * status.pain * (1 - resistence.pain);
  const drainFromLust = 0.001 * status.lust * (1 - resistence.lust);

  // update energy and nutrition
  if (status.health < status.energy) {
    newStatus.energy = newStatus.health;
  }
  newStatus.energy -= (drainFromLust + drainFromPain);
  newStatus.nutrition -= (drainFromLust + drainFromPain);

  if (newStatus.oxygen <= 0) {
    newStatus.health -= 0.15;
  }
  if (newStatus.nutrition <= 0) {
    newStatus.health += newStatus.nutrition;
    newStatus.nutrition = 0;
  }

  // must be concious to update lust orgasm fear or pain
  if (status.energy > 0 && status.oxygen > 0) {
    // update pain desire
    const painDesireInfluence = (newStatus.pain * preference?.pain) / updateFrequecy;
    newStatus.lust += painDesireInfluence;
    newStatus.fear -= painDesireInfluence;

    newStatus.lust -= 0.01 * (0.1 * newStatus.lust + newStatus.fear);

    newStatus.orgasm += (newStatus.lust - status.lust);
  } else {
    newStatus.lust = 0;
    newStatus.pain = 0;
    newStatus.fear = 0;
  }

  // check minimums
  if (newStatus.orgasm < 0) { newStatus.orgasm = 0; }
  if (newStatus.lust < 0) { newStatus.lust = 0; }
  if (newStatus.pain < 0) { newStatus.pain = 0; }
  if (newStatus.fear < 0) { newStatus.fear = 0; }
  if (newStatus.energy < 0) { newStatus.energy = 0; }
  if (newStatus.nutrition < 0) { newStatus.nutrition = 0; }
  if (newStatus.oxygen < 0) { newStatus.oxygen = 0; }
  if (newStatus.health < 0) { newStatus.health = 0; }

  // check maximums
  if (newStatus.lust > 200) { newStatus.lust = 200; }
  if (newStatus.pain > 200) { newStatus.pain = 200; }
  if (newStatus.fear > 200) { newStatus.fear = 200; }
  if (newStatus.energy > 100) { newStatus.energy = 100; }
  if (newStatus.nutrition > 100) { newStatus.nutrition = 100; }
  if (newStatus.oxygen > 100) { newStatus.oxygen = 100; }
  if (newStatus.health > 100) { newStatus.health = 100; }

  return newStatus;
}
function reducerStatus(state:ISlaveStatus, action:IReducerStatusAction) {
  switch (action.type) {
    case 'set':
      return action.state;
    case 'add':
      return addStatus(
        state,
        { ...action.state, orgasm: action.state.lust + action.state.orgasm },
      );
    case 'update':
      if (action.preference && action.resistence) {
        return update(state, action.preference, action.resistence);
      }
      throw new Error('lack of arguments');
    default:
      throw new Error();
  }
}

function initialState(name: 'status'|'resistence'|'preference') {
  // return (api.Load('status') as ISlaveStatus) || Default[name];
  return Default[name];
}

export function SlaveProvider({ children }:ISlaveProviderProps) {
  // TODO add conscious level state.
  // ====== those should be persistent ============

  const [status, dispatchStatus] = useReducer(reducerStatus, Default.status, () => initialState('status'));
  const [resistence, setResistence] = useState(() => initialState('resistence'));
  const [preference, setPreference] = useState(() => initialState('preference'));

  // =========== those should be reseted after load or sleep ===========

  const [conscious, setConcious] = useState<'awake'|'passedOut'|'chokedOut'|'sleep'>('awake');
  const [slaveValue, setSlaveValue] = useState(0);
  const [chokingLevel, setChokingLevel] = useState(0);
  const [squirtingLevel, setSquirtingLevel] = useState(0);
  const [orgasmLevel, setOrgasmLevel] = useState(0);
  const { buildExpression } = useEmotion();
  const ass = useAss();

  function doSquirt(level:number) {
    setSquirtingLevel(level);
    setTimeout(() => { setSquirtingLevel(0); }, 1000);
  }

  function endOrgasm() {
    setOrgasmLevel(0);
    dispatchStatus({ type: 'add', state: { ...Default.cleared, lust: -60, orgasm: -1000 } });
  }

  function doOrgasm() {
    let newOrgasmLevel = 1 + Math.round((status.lust - 100) / 20);
    if (newOrgasmLevel < 1) {
      newOrgasmLevel = 1;
    }
    setOrgasmLevel(newOrgasmLevel);
    setTimeout(() => {
      endOrgasm();
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

  function updateBodyReaction() {
    const newStatus = { ...status };

    // do squirt
    if (squirtingLevel === 0) {
      if (newStatus.pain > 100) {
        if (Math.random() < 0.01) {
          doSquirt(1 + Math.round((newStatus.pain - 100) / 20));
        }
      }
    }
    // do orgasm
    // console.log(`orgasmLevel ${orgasmLevel}`);
    if (orgasmLevel === 0 && status.orgasm > 100) {
      doOrgasm();
    }
  }

  function updateStatusFromBody(): ISlaveStatus {
    let fear = 0;
    let lust = ass.getLust();
    let pain = ass.getPain() / updateFrequecy;
    pain += chokingLevel * 1.5;

    const oxygen = -chokingLevel;

    const chokeDesireInfluence = ((100 * chokingLevel) * preference.oxygen) / updateFrequecy;
    if (chokeDesireInfluence > 0) {
      lust += chokeDesireInfluence;
    } else {
      fear -= chokeDesireInfluence;
    }

    return ({
      ...Default.cleared, lust, pain, oxygen, fear,
    });
  }

  function updateBody() {
    if (orgasmLevel > 0) {
      const lust = Math.random() > 0.5 ? 20 : -20;
      if (squirtingLevel === 0) {
        if (Math.random() < 0.99) {
          doSquirt(1 + Math.round((status.lust - 100) / 20));
        }
      }
      dispatchStatus({ type: 'add', state: { ...Default.cleared, lust } });
    }
  }

  function updateSlave() {
    dispatchStatus({
      type: 'update', state: status, preference, resistence,
    });
    dispatchStatus({ type: 'add', state: updateStatusFromBody() });

    updateBodyReaction();
    updatePreferences(status);
    buildExpression(status);
  }

  function hurt(value:number) {
    dispatchStatus({
      type: 'add',
      state: { ...Default.cleared, pain: value, health: -0.1 * value },
    });
  }

  function eat(food:IFood) {
    dispatchStatus({
      type: 'add',
      state: { ...Default.cleared, nutrition: food.nutrition, fear: -food.moral },
    });
  }
  // 8 hours of sleep must fill 100% energy and costs 30% nutrition
  function sleep() {
    const ammount = 2;
    const updatedStatus = { ...status };
    updatedStatus.lust = 0;
    updatedStatus.energy += ammount * 12.5;
    updatedStatus.nutrition -= 5 * ammount;
    api.Save('status', updatedStatus);
    api.Save('resistence', resistence);
    api.Save('preference', preference);
    api.Save('ass', ass.getStats());
    dispatchStatus({ type: 'set', state: updatedStatus });
    // save status
    // save preference
    // save resistence
  }
  function load() {
    dispatchStatus({ type: 'set', state: api.Load('status') });
    setPreference(api.Load('resistence'));
    setResistence(api.Load('preference'));
    ass.initialize(api.Load('ass'));
  }

  useInterval(() => { updateSlave(); }, updateInterval);
  useInterval(() => { updateBody(); }, updateBodyInterval);

  return (
    <SlaveContext.Provider value={{
      status,
      preference,
      resistence,
      dispatchStatus,
      hurt,
      eat,
      chokingLevel,
      orgasmLevel,
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
