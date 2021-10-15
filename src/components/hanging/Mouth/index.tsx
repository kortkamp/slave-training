import { Container } from './styles';

import mouthImg from '../../../assets/fgimage/s/face/R/m_def.png';
import mouthOpen from '../../../assets/fgimage/hang/mouth_open.png';
import mouthTeeth from '../../../assets/fgimage/hang/mouth_teeth.png';
import mouthTongue from '../../../assets/fgimage/hang/mouth_tongue.png';
import { useSlave } from '../../../hooks/useSlave';
import { useEmotion } from '../../../hooks/useEmotion';

const mouthImages = [
  mouthImg,
  mouthOpen,
  mouthTeeth,
  mouthTongue,
];
interface IMouthProps {
  hanging: boolean;
}
const Mouth = ({ hanging }:IMouthProps):JSX.Element => {
  const { status } = useSlave();
  const { expression } = useEmotion();
  return (
    <Container>
      {status.oxygen > 0 && !hanging
        ? status.fear < 50
          ? <img src={mouthImages[expression.face.mouth]} alt="" />
          : <img src={mouthImages[1]} alt="" />
        : <img src={mouthTeeth} alt="" />}
    </Container>
  );
};

export default Mouth;
