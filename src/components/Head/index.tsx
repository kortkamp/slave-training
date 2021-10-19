/* eslint-disable no-unused-vars */
import { useIntervalWhen } from 'rooks';
import { Container } from './styles';

import head0 from '../../assets/fgimage/Hx1/body/head0.png';
import headChoke1 from '../../assets/fgimage/Hx1/body/head0_choke1.png';
import headChoke2 from '../../assets/fgimage/Hx1/body/head0_choke2.png';
import headChoke3 from '../../assets/fgimage/Hx1/body/head0_choke3.png';
import headChoke4 from '../../assets/fgimage/Hx1/body/head0_choke4.png';

// import eyesClosed from '../../assets/fgimage/Hx1/body/e_def.png';
// import eyesClosed from '../../assets/fgimage/Hx1/body/e_a_def.png';
// import eyesClosed from '../../assets/fgimage/Hx1/body/e_a_half.png';
// import eyesClosed from '../../assets/fgimage/Hx1/body/e_half.png';
// import eyesClosed from '../../assets/fgimage/Hx1/body/e_a_half_s.png';
// import eyesClosed from '../../assets/fgimage/Hx1/body/e_half_s.png';
// import eyesClosed from '../../assets/fgimage/Hx1/body/e_a_def_s.png';
// import eyesClosed from '../../assets/fgimage/Hx1/body/e_def_s.png';

// import eyesClosed from '../../assets/fgimage/Hx1/body/e_a_def_nh.png';
// import eyesClosed from '../../assets/fgimage/Hx1/body/e_a_half_nh.png';
// import eyesClosed from '../../assets/fgimage/Hx1/body/e_def_nh.png';

// import eyesClosed from '../../assets/fgimage/Hx1/body/e_half_nh.png';

// import eyesClosed from '../../assets/fgimage/Hx1/body/e_a_half_s_nh.png';
// import eyesClosed from '../../assets/fgimage/Hx1/body/e_a_half_s_nh_pass.png';
// import eyesClosed from '../../assets/fgimage/Hx1/body/e_a_half_s_nh_pass2.png';
// import eyesClosed from '../../assets/fgimage/Hx1/body/e_half_s_nh.png';
// import eyesClosed from '../../assets/fgimage/Hx1/body/e_def_s_nh.png';
// import eyesClosed from '../../assets/fgimage/Hx1/body/e_a_def_s_nh.png';
// import eyesClosed from '../../assets/fgimage/Hx1/body/e_pass1.png';
// import eyesClosed from '../../assets/fgimage/Hx1/body/e_pass2.png';

// hair
import foreheadHair from '../../assets/fgimage/Hx1/body/fh1.png';

import chokeHand from '../../assets/fgimage/Hx1/hands/b_l.png';

import Eyes from '../Eyes';
import Eyebrow from '../Eyebrow';
import Mouth from '../Mouth';
import ExpressionMaker from '../ExpressionMaker';
import { useSlave } from '../../hooks/useSlave';

const headImages = [
  head0,
  headChoke1,
  headChoke2,
  headChoke3,
  headChoke4,
];

const Head = ():JSX.Element => {
  const { status, chokingLevel } = useSlave();

  let headColor = Math.round((100 - status.oxygen) / 20);
  if (headColor >= headImages.length) {
    headColor = headImages.length - 1;
  }
  return (
    <Container>
      {chokingLevel > 0
      && <img src={chokeHand} alt="" />}
      <img src={headImages[headColor]} alt="" />

      <Eyes />
      <Mouth />
      <Eyebrow />
      <img src={foreheadHair} alt="" />

      <ExpressionMaker />
    </Container>
  );
};

export default Head;
