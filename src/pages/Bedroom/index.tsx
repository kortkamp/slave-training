import { Container } from './styles';

import StatusBox from '../../components/StatusBox';

import backgroundImg from '../../assets/bgimage/bg/bed.jpg';

import bodyImg from '../../assets/fgimage/s/body/stn_b.png';
import headImg from '../../assets/fgimage/s/body/stn_h1.png';
import dressImg from '../../assets/fgimage/s/dress/F/a1.png';
import armsImg from '../../assets/fgimage/s/body/stn_a.png';

import eyeImg from '../../assets/fgimage/s/face/F/e_def.gif';
import mouthImg from '../../assets/fgimage/s/face/F/m_def.png';

import hairImg from '../../assets/fgimage/s/body/stn_fh.png';

const Bedroom = ():JSX.Element => (
  <Container>

    <img className="background" src={backgroundImg} alt="" />
    <img src={bodyImg} alt="" />
    <img src={headImg} alt="" />
    <img src={eyeImg} alt="" />
    <img src={mouthImg} alt="" />
    <img src={hairImg} alt="" />
    <img src={dressImg} alt="" />
    <img src={armsImg} alt="" />

    <StatusBox />
  </Container>
);
export default Bedroom;
