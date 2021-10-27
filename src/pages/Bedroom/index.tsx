/* eslint-disable no-unused-vars */
import { Container } from './styles';

import Head from '../../components/Head';

import StatusBox from '../../components/StatusBox';

import backgroundImg from '../../assets/bgimage/bg/bed.jpg';

import bodyImg from '../../assets/fgimage/s/body/stn_b.png';
import headImg from '../../assets/fgimage/s/body/stn_h1.png';
import dressImg from '../../assets/fgimage/s/dress/F/a1.png';
import armsImg from '../../assets/fgimage/s/body/stn_a.png';

import eyeImg from '../../assets/fgimage/s/face/F/e_def.gif';
import mouthImg from '../../assets/fgimage/s/face/F/m_def.png';

import hairImg from '../../assets/fgimage/s/body/stn_fh.png';
import { useSlave } from '../../hooks/useSlave';
import ToolsBox from '../../components/ToolsBox';

const Bedroom = ():JSX.Element => {
  const { sleep, load, status } = useSlave();
  return (
    <Container>

      <img className="background" src={backgroundImg} alt="" />
      <img src={bodyImg} alt="" />

      {/* <img src={headImg} alt="" />
      <img src={eyeImg} alt="" />
      <img src={mouthImg} alt="" /> */}
      <div className="headContainer">
        <Head />
      </div>

      <img src={hairImg} alt="" />
      <img src={dressImg} alt="" />
      <img src={armsImg} alt="" />

      <button type="button" onClick={() => sleep()}>SLEEP</button>
      <button type="button" onClick={() => load()}>LOAD</button>
      <StatusBox />
      <ToolsBox />
    </Container>
  );
};
export default Bedroom;
