const Save = (name:string, slaveData:any) => {
  console.log(`save:${name}`);
  localStorage.setItem(`@Slave:${name}`, JSON.stringify(slaveData));
};

const Clear = () => {
  localStorage.removeItem('@Slave:data');
};

const Load = (name:string) => {
  console.log(`load:${name}`);
  const slaveData = localStorage.getItem(`@Slave:${name}`);
  if (slaveData) {
    return JSON.parse(slaveData);
  }
  return undefined;
};

export default { Save, Load, Clear };
