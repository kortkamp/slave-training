/* eslint-disable no-unused-vars */
import { EyelipOpen, EyelipHalf, Container } from './styles';

// pupil
import pupil from '../../assets/fgimage/Hx1/body/pupil.png';
// eyelip
import eyesOpen from '../../assets/fgimage/Hx1/body/eyelidOpen.png';
import eyesHalf from '../../assets/fgimage/Hx1/body/eyelipHalf.png';
import eyesClosed from '../../assets/fgimage/Hx1/body/e_close.png';
import { useEmotion } from '../../hooks/useEmotion';

import tear0 from '../../assets/fgimage/Hx1/tear/tear0.png';
import tear1 from '../../assets/fgimage/Hx1/tear/tear1.png';
import tear2 from '../../assets/fgimage/Hx1/tear/tear2.png';
import tear3 from '../../assets/fgimage/Hx1/tear/tear3.png';
import { useSlave } from '../../hooks/useSlave';

const eyelipImages = [
  eyesOpen,
  eyesHalf,
  eyesClosed,
];

const tearImages = [
  tear0, tear1, tear2, tear3,
];

const Eyes = ():JSX.Element => {
  const { expression } = useEmotion();

  const pupilPosition = expression.face.pupilPosition * 5;

  const pupilRadius = (1 + expression.face.pupilRadius) / 5;

  const tearLevel = expression.face.tear < tearImages.length
    ? expression.face.tear
    : tearImages.length - 1;

  return (
    <>
      <img src={eyelipImages[expression.face.eyelip]} alt="" />
      {expression.face.eyelip !== 2
        && (
        <Container pos={pupilPosition} radius={pupilRadius} eyelip={expression.face.eyelip}>
          <div className="right">
            <img src={pupil} alt="" srcSet="" />
          </div>
          <div className="left">
            <img src={pupil} alt="" srcSet="" />
          </div>
        </Container>
        )}
      <img src={tearImages[tearLevel]} alt="" />
    </>
  );
};

export default Eyes;
