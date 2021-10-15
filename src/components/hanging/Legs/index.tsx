import { Container } from './styles';
// import { useEmotion } from '../../../hooks/useEmotion';

import legsDown from '../../../assets/fgimage/hang/hang_legs_down.png';
import legsMiddle from '../../../assets/fgimage/hang/hang_legs_middle.png';
import legsUp from '../../../assets/fgimage/hang/hang_legs_up.png';
import legLeft from '../../../assets/fgimage/hang/left_leg.png';
import legRight from '../../../assets/fgimage/hang/right_leg.png';
import { useSlave } from '../../../hooks/useSlave';

const legsImages = [
  legsDown,
  legsMiddle,
  legsUp,
];

interface ILegsProps {
  liftHeight: number;
}

const Legs = ({ liftHeight }:ILegsProps):JSX.Element => {
  // const { expression } = useEmotion();
  const { status } = useSlave();
  // const force = 10 * Math.round((status.health / 10) / 10);
  let swingingSpeed = '';
  if (status.health > 50) {
    swingingSpeed = 'swinging3';
  } else if (status.health > 25) {
    swingingSpeed = 'swinging2';
  } else if (status.health > 0) {
    swingingSpeed = 'swinging1';
  }
  const legPosition = Math.round((status.oxygen / 10) % 2);
  return (
    <Container>
      {status.oxygen <= 0 && liftHeight > 0
        ? (
          <>
            <img className={`repositionedRightLeg ${swingingSpeed}`} src={legRight} alt="" />
            <img className={`repositionedLeftLeg ${swingingSpeed}`} src={legLeft} alt="" />
          </>
        )
        : <img src={legsImages[2 - legPosition]} alt="" />}
    </Container>
  );
};

export default Legs;
