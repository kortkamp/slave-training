/* eslint-disable no-unused-vars */
import { Container } from './styles';

import headImg from '../../assets/fgimage/Hx1/body/head0.png';

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

import Eyes from '../Eyes';
import Eyebrow from '../Eyebrow';
import Mouth from '../Mouth';
import ExpressionMaker from '../ExpressionMaker';

const Head = ():JSX.Element => (
  <Container>
    <img src={headImg} alt="" />

    <Eyes />
    <Mouth />
    <Eyebrow />
    <img src={foreheadHair} alt="" />

    <ExpressionMaker />
  </Container>
);

export default Head;
