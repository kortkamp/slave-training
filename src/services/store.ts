const Save = (slaveData:any) => {
  localStorage.setItem('@Slave:data', JSON.stringify(slaveData));
};

const Load = () => {
  const slaveData = localStorage.getItem('@Slave:data');
  if (slaveData) {
    return JSON.parse(slaveData);
  }
  return undefined;
};

export { Save, Load };
