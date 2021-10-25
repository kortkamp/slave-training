/* eslint-disable no-unused-vars */
import { Container } from './styles';

import StatusBox from '../../components/StatusBox';

import backgroundImg from '../../assets/bgimage/bg/bed.jpg';

import chairImg from '../../assets/fgimage/o/food/chair.png';
import tableImg from '../../assets/fgimage/o/food/tbl_a.png';
import foodImg from '../../assets/fgimage/o/food/food-a.png';

import bodyImg from '../../assets/fgimage/s/body/din_b.png';
import headImg from '../../assets/fgimage/s/body/din_h1.png';
import eyesImg from '../../assets/fgimage/s/face/S/e_def.gif';
import mouthImg from '../../assets/fgimage/s/face/S/m_def.gif';
import frontHairImg from '../../assets/fgimage/s/body/din_fh.png';
import rightArm from '../../assets/fgimage/s/body/din_a1b.png';
import lefttArm from '../../assets/fgimage/s/body/din_a2.png';
import dressImg from '../../assets/fgimage/s/dress/S/a1.png';

const Kitchen = ():JSX.Element => (
  <Container>

    <img className="background" src={backgroundImg} alt="" />
    <img src={chairImg} alt="" />
    <img src={lefttArm} alt="" />
    <img src={bodyImg} alt="" />
    <img src={dressImg} alt="" />
    <img src={rightArm} alt="" />
    <img src={headImg} alt="" />
    <img src={eyesImg} alt="" />
    <img src={mouthImg} alt="" />
    <img src={frontHairImg} alt="" />
    <img src={tableImg} alt="" />
    <img src={foodImg} alt="" />
    <StatusBox />
  </Container>
);
export default Kitchen;
