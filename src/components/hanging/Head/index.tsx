import { Container } from './styles';

import headImg from '../../../assets/fgimage/s/body/sit_h1.png';
import frontHairImg from '../../../assets/fgimage/s/body/sit_fh1.png';

// import eyesClosed from '../../../assets/fgimage/s/face/R/e_close_p.png';
import eyeDefault from '../../../assets/fgimage/s/face/R/e_def.gif';
import eyeClose from '../../../assets/fgimage/hang/eye_close.png';
import eyeBig from '../../../assets/fgimage/hang/eye_big.png';
import eyeSmall from '../../../assets/fgimage/hang/eye_small.png';
import eyePass from '../../../assets/fgimage/hang/eye_pass.png';

import mouthImg from '../../../assets/fgimage/s/face/R/m_def.png';
import mouthOpen from '../../../assets/fgimage/hang/mouth_open.png';
import mouthTeeth from '../../../assets/fgimage/hang/mouth_teeth.png';
import mouthTongue from '../../../assets/fgimage/hang/mouth_tongue.png';

import eyebrowDefault from '../../../assets/fgimage/hang/y_def.png';
import eyebrowConf from '../../../assets/fgimage/hang/y_conf.png';
import { useEmotion } from '../../../hooks/useEmotion';

const mouthImages = [
  mouthImg,
  mouthOpen,
  mouthTeeth,
  mouthTongue,
];

const eyeImages = [
  eyeDefault,
  eyeClose,
  eyeBig,
  eyeSmall,
  eyePass,
];

const eyebrowImages = [
  eyebrowDefault,
  eyebrowConf,
];

const headImages = [
  headImg,

];
interface ILegsProps {
  position: number;
}

const Head = ({ position }:ILegsProps):JSX.Element => {
  const { expression } = useEmotion();
  return (
    <Container position={position}>

      <img src={headImages[0]} alt="" />
      <img src={eyeImages[expression.face.eyelip]} alt="" />
      <img src={eyebrowImages[expression.face.eyebrow]} alt="" />
      <img src={frontHairImg} alt="" />
      <img src={mouthImages[expression.face.mouth]} alt="" />

    </Container>
  );
};

export default Head;
