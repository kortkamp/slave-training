import { useState } from 'react';
import { Container } from './styles';

import Head from '../../components/Head';

import StatusBox from '../../components/StatusBox';

import backgroundImg from '../../assets/bgimage/bg/bed.jpg';
import lyingImg from '../../assets/bgimage/bg/lying_bed.png';

import bodyImg from '../../assets/fgimage/s/body/stn_b.png';
import dressImg from '../../assets/fgimage/s/dress/F/a1.png';
import armsImg from '../../assets/fgimage/s/body/stn_a.png';

import hairImg from '../../assets/fgimage/s/body/stn_fh.png';
import { useSlave } from '../../hooks/useSlave';
import ToolsBox from '../../components/ToolsBox';
// import ExpressionMaker from '../../components/ExpressionMaker';

const Bedroom = ():JSX.Element => {
  const { sleep } = useSlave();
  const [isLiingOn, setIsLiingOn] = useState(true);
  return (
    <Container>

      <img className="background" src={backgroundImg} alt="" />

      {isLiingOn
        ? <img src={lyingImg} alt="" />
        : (
          <>
            <img src={bodyImg} alt="" />
            <div className="headContainer">
              <Head />
            </div>
            <img src={hairImg} alt="" />
            <img src={dressImg} alt="" />
            <img src={armsImg} alt="" />
          </>
        )}

      <button type="button" onClick={() => { if (isLiingOn) sleep(); }}>SLEEP</button>
      <button type="button" onClick={() => setIsLiingOn(!isLiingOn)}>LIE DOWN</button>
      <StatusBox />
      <ToolsBox />
      {/* <ExpressionMaker /> */}
    </Container>
  );
};
export default Bedroom;
