import { useState } from 'react';
import { Container } from './styles';

import StatusBox from '../../components/StatusBox';

import Body from '../../components/hanging/Body';
import { EmotionProvider } from '../../hooks/useEmotion';
import ExpressionMaker from '../../components/ExpressionMaker';

// import backgroundImg from '../../assets/bgimage/bg/room.jpg';

// import bodyImg from '../../assets/fgimage/s/body/sit_b.png';
// import headImg from '../../assets/fgimage/s/body/sit_h1.png';
// import dressImg from '../../assets/fgimage/s/dress/R/a1.png';
// import leftArmImg from '../../assets/fgimage/s/body/sit_a1.png';
// import rightArmImg from '../../assets/fgimage/s/body/sit_a2.png';

// import eyeImg from '../../assets/fgimage/s/face/R/e_def.gif';
// import mouthImg from '../../assets/fgimage/s/face/R/m_def.png';

// import hairImg from '../../assets/fgimage/s/body/sit_fh.png';

const HangRoom = ():JSX.Element => {
  // eslint-disable-next-line no-unused-vars
  const [hangStep, setHangStep] = useState(0);
  return (
    <Container>
      <EmotionProvider>
        <Body state="swing" />

        {/* <img className="background" src={backgroundImg} alt="" /> */}

        {/* <img src={rightArmImg} alt="" />
    <img src={bodyImg} alt="" />
    <img src={headImg} alt="" />
    <img src={eyeImg} alt="" />
    <img src={mouthImg} alt="" />
    <img src={hairImg} alt="" />
    <img src={dressImg} alt="" />
    <img src={leftArmImg} alt="" /> */}

        <StatusBox />
        <ExpressionMaker />
      </EmotionProvider>
    </Container>
  );
};
export default HangRoom;
