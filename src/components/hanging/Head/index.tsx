import { Container } from './styles';

import head0 from '../../../assets/fgimage/s/body/sit_h1.png';
import head1 from '../../../assets/fgimage/hang/head_choke1.png';
import head2 from '../../../assets/fgimage/hang/head_choke2.png';
import head3 from '../../../assets/fgimage/hang/head_choke3.png';
import head4 from '../../../assets/fgimage/hang/head_choke4.png';

import frontHairImg from '../../../assets/fgimage/s/body/sit_fh1.png';

import eyebrowDefault from '../../../assets/fgimage/hang/y_def.png';
import eyebrowConf from '../../../assets/fgimage/hang/y_conf.png';

import cry1 from '../../../assets/fgimage/hang/cry1.png';
import cry2 from '../../../assets/fgimage/hang/cry2.png';
import cry3 from '../../../assets/fgimage/hang/cry3.png';

import { useEmotion } from '../../../hooks/useEmotion';
import { useSlave } from '../../../hooks/useSlave';
import Mouth from '../Mouth';
import Eyes from '../Eyes';

const headImages = [
  head0,
  head1,
  head2,
  head3,
  head4,
];

const eyebrowImages = [
  eyebrowDefault,
  eyebrowConf,
];

const cryImages = [
  '',
  cry1,
  cry2,
  cry3,
];

interface ILegsProps {
  liftHeight:number;
}

const Head = ({ liftHeight }:ILegsProps):JSX.Element => {
  const { expression } = useEmotion();
  const { status } = useSlave();
  let chokeLevel = 0;
  if (status.oxygen < 20) {
    chokeLevel = 4;
  } else if (status.oxygen < 40) {
    chokeLevel = 3;
  } else if (status.oxygen < 60) {
    chokeLevel = 2;
  } else if (status.oxygen < 80) {
    chokeLevel = 1;
  }

  let cryLevel = 0;
  if (status.fear > 75) {
    cryLevel = 3;
  } else if (status.fear > 50) {
    cryLevel = 2;
  } else if (status.fear > 25) {
    cryLevel = 1;
  }

  return (
    <Container skewAngle={liftHeight > 0 || status.oxygen <= 10 ? 32 : 0}>

      <img src={headImages[chokeLevel]} alt="" />
      <Eyes />
      <img src={eyebrowImages[expression.face.eyebrow]} alt="" />
      <Mouth hanging={liftHeight > 0} />
      <img src={cryImages[cryLevel]} alt="" />
      <img src={frontHairImg} alt="" />
    </Container>
  );
};

export default Head;
