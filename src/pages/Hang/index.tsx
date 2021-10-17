import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from './styles';

import StatusBox from '../../components/StatusBox';

import Body from '../../components/hanging/Body';
import { EmotionProvider } from '../../hooks/useEmotion';
import ExpressionMaker from '../../components/ExpressionMaker';

import backgroundImg from '../../assets/bgimage/bg/room.jpg';
import LiftControl from '../../components/hanging/LiftControl';
import { useSlave } from '../../hooks/useSlave';

// import bodyImg from '../../assets/fgimage/s/body/sit_b.png';
// import headImg from '../../assets/fgimage/s/body/sit_h1.png';
// import dressImg from '../../assets/fgimage/s/dress/R/a1.png';
// import leftArmImg from '../../assets/fgimage/s/body/sit_a1.png';
// import rightArmImg from '../../assets/fgimage/s/body/sit_a2.png';

// import eyeImg from '../../assets/fgimage/s/face/R/e_def.gif';
// import mouthImg from '../../assets/fgimage/s/face/R/m_def.png';

// import hairImg from '../../assets/fgimage/s/body/sit_fh.png';

const HangRoom = ():JSX.Element => {
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const [hangStep, setHangStep] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [liftHeight, setLiftHeight] = useState(0);

  const [handsTied, setHandsTied] = useState(false);

  const [neckTied, setNeckTied] = useState(true);

  const { setChokingLevel } = useSlave();

  function changeLiftValue(value:number) {
    const updatedValue = liftHeight + value;
    if (neckTied) {
      if (updatedValue >= 0 && updatedValue <= 300) { setLiftHeight(updatedValue); }
      if (updatedValue > 0) { setChokingLevel(0.7); } else { setChokingLevel(0); }
    }
  }
  return (
    <Container>
      <EmotionProvider>
        <Body
          hands={handsTied ? 'tied' : 'released'}
          neck={neckTied ? 'tied' : 'released'}
          liftHeight={liftHeight}
        />
        <img className="background" src={backgroundImg} alt="" />

        {/* <img src={rightArmImg} alt="" />
        <img src={bodyImg} alt="" />
        <img src={headImg} alt="" />
        <img src={eyeImg} alt="" />
        <img src={mouthImg} alt="" />
        <img src={hairImg} alt="" />
        <img src={dressImg} alt="" />
        <img src={leftArmImg} alt="" /> */}
        <div className="hangController">
          <button type="button" onClick={() => { setHandsTied(!handsTied); }}> (un)tie hands </button>
          <button type="button" onClick={() => { setNeckTied(!neckTied); }}> tie neck</button>

          <LiftControl setValue={(value) => changeLiftValue(value)} />
        </div>
        <StatusBox />
        <ExpressionMaker />
      </EmotionProvider>
      <button type="button" onClick={() => history.push('/')}>Goto Hang</button>
    </Container>
  );
};
export default HangRoom;
