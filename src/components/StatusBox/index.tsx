import Slider from '../Slider';
import { Container } from './styles';
import { useSlave } from '../../hooks/useSlave';

const StatusBox = ():JSX.Element => {
  const { status, setStatus } = useSlave();

  function setLust(value:number) {
    const updatedStatus = { ...status };
    updatedStatus.lust = value;
    setStatus(updatedStatus);
  }
  function setPain(value:number) {
    const updatedStatus = { ...status };
    updatedStatus.pain = value;
    setStatus(updatedStatus);
  }
  function setFear(value:number) {
    const updatedStatus = { ...status };
    updatedStatus.fear = value;
    setStatus(updatedStatus);
  }

  function setConsiciousness(value:number) {
    const updatedStatus = { ...status };
    updatedStatus.consciousness = value;
    setStatus(updatedStatus);
  }

  function setOxygen(value:number) {
    const updatedStatus = { ...status };
    updatedStatus.oxygen = value;
    setStatus(updatedStatus);
  }

  function setHealth(value:number) {
    const updatedStatus = { ...status };
    updatedStatus.health = value;
    setStatus(updatedStatus);
  }

  return (
    <Container>
      <span>Status</span>
      <div>
        <Slider name="Lust" value={status.lust} setValue={(value) => setLust(value)} />
        <Slider name="Pain" value={status.pain} setValue={(value) => setPain(value)} />
        <Slider name="Fear" value={status.fear} setValue={(value) => setFear(value)} />
        <Slider name="Consiciousness" value={status.consciousness} setValue={(value) => setConsiciousness(value)} />
        <Slider name="Oxygen" value={status.oxygen} setValue={(value) => setOxygen(value)} />
        <Slider name="Health" value={status.health} setValue={(value) => setHealth(value)} />
      </div>
    </Container>
  );
};

export default StatusBox;
