// its mandatory that all fields are pŕimitives

const cleared = {
  orgasm: 0,
  lust: 0,
  pain: 0,
  fear: 0,
  energy: 0,
  nutrition: 0,
  oxygen: 0,
  health: 0,
};

const status = {
  orgasm: 0,
  lust: 0,
  pain: 0,
  fear: 0,
  energy: 100,
  nutrition: 100,
  oxygen: 100,
  health: 100,
};

const resistence = {
  orgasm: 0,
  lust: 0.1,
  pain: 0.1,
  fear: 0,
  energy: 0,
  nutrition: 0,
  oxygen: 0,
  health: 0,

};

// values should change between -1 and 1
const preference = {
  orgasm: 0,
  lust: 1,
  pain: -0.1,
  fear: -1,
  energy: 0,
  nutrition: 0,
  oxygen: -0.3,
  health: 0,
};

// the natural drift of status values
const drift = {
  orgasm: -0.1,
  lust: -0.2,
  pain: -1,
  fear: -0.02,
  energy: -0.01,
  nutrition: -0.01,
  oxygen: 0.5,
  health: 0,
};

const ass = {
  maxStretch: 0,
  enemaCapacity: 0,
};

export default {
  cleared, status, resistence, preference, drift, ass,
};
