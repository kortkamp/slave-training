import { Container } from './styles';

import StatusBox from '../../components/StatusBox';

import backgroundImg from '../../assets/bgimage/bg/room.jpg';

import bodyImg from '../../assets/fgimage/s/body/sit_b.png';
import headImg from '../../assets/fgimage/s/body/sit_h1.png';
import dressImg from '../../assets/fgimage/s/dress/R/a1.png';
import armsImg from '../../assets/fgimage/s/body/sit_a1.png';

import eyeImg from '../../assets/fgimage/s/face/R/e_def.gif';
import mouthImg from '../../assets/fgimage/s/face/R/m_def.png';

import hairImg from '../../assets/fgimage/s/body/sit_fh.png';
import ToolsBox from '../../components/ToolsBox';
import { useSlave } from '../../hooks/useSlave';

const RestRoom = ():JSX.Element => {
  const { isSleeping } = useSlave();
  return (
    <Container>

      <img className="background" src={backgroundImg} alt="" />

      { !isSleeping
    && (
    <>
      <img src={bodyImg} alt="" />
      <img src={headImg} alt="" />
      <img src={eyeImg} alt="" />
      <img src={mouthImg} alt="" />
      <img src={hairImg} alt="" />
      <img src={dressImg} alt="" />
      <img src={armsImg} alt="" />

    </>
    )}
      <ToolsBox />
      <StatusBox />
    </Container>
  );
};
export default RestRoom;
