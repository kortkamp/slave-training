import { Container } from './styles';

import legsDown from '../../../assets/fgimage/hang/hang_legs_down.png';
import legsMiddle from '../../../assets/fgimage/hang/hang_legs_middle.png';
import legsUp from '../../../assets/fgimage/hang/hang_legs_up.png';
import { useEmotion } from '../../../hooks/useEmotion';

const legsImages = [
  legsDown,
  legsMiddle,
  legsUp,
];

const Legs = ():JSX.Element => {
  const { expression } = useEmotion();
  return (
    <Container>
      <img src={legsImages[expression.face.legs || 0]} alt="" />
    </Container>
  );
};

export default Legs;
