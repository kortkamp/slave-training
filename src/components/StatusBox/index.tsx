import Slider from '../Slider';
import { Container } from './styles';
import { useSlave } from '../../hooks/useSlave';

const StatusBox = ():JSX.Element => {
  const { status, orgasmProgress, dispatchStatus } = useSlave();

  function setLust(value:number) {
    const updatedStatus = { ...status };
    updatedStatus.lust = value;

    dispatchStatus({ type: 'set', state: updatedStatus });
  }
  function setPain(value:number) {
    const updatedStatus = { ...status };
    updatedStatus.pain = value;
    dispatchStatus({ type: 'set', state: updatedStatus });
  }
  function setFear(value:number) {
    const updatedStatus = { ...status };
    updatedStatus.fear = value;
    dispatchStatus({ type: 'set', state: updatedStatus });
  }

  function setEnergy(value:number) {
    const updatedStatus = { ...status };
    updatedStatus.energy = value;
    dispatchStatus({ type: 'set', state: updatedStatus });
  }

  function setNutrition(value:number) {
    const updatedStatus = { ...status };
    updatedStatus.nutrition = value;
    dispatchStatus({ type: 'set', state: updatedStatus });
  }

  function setOxygen(value:number) {
    const updatedStatus = { ...status };
    updatedStatus.oxygen = value;
    dispatchStatus({ type: 'set', state: updatedStatus });
  }

  function setHealth(value:number) {
    const updatedStatus = { ...status };
    updatedStatus.health = value;
    dispatchStatus({ type: 'set', state: updatedStatus });
  }

  return (
    <Container>
      <span>Status</span>
      <div>
        <Slider name="Orgasm" value={orgasmProgress} setValue={() => {}} />
        <Slider name="Lust" value={status.lust} setValue={(value) => setLust(value)} />
        <Slider name="Pain" value={status.pain} setValue={(value) => setPain(value)} />
        <Slider name="Fear" value={status.fear} setValue={(value) => setFear(value)} />
        <Slider name="Energy" value={status.energy} setValue={(value) => setEnergy(value)} />
        <Slider name="Nutrition" value={status.nutrition} setValue={(value) => setNutrition(value)} />
        <Slider name="Oxygen" value={status.oxygen} setValue={(value) => setOxygen(value)} />
        <Slider name="Health" value={status.health} setValue={(value) => setHealth(value)} />
      </div>
    </Container>
  );
};

export default StatusBox;
