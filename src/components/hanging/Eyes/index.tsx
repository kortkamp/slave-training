import { Container } from './styles';

// import eyesClosed from '../../../assets/fgimage/s/face/R/e_close_p.png';
import eyeDefault from '../../../assets/fgimage/s/face/R/e_def.gif';
import eyeClose from '../../../assets/fgimage/hang/eye_close.png';
// import eyeBig from '../../../assets/fgimage/hang/eye_big.png';
import eyeSmall from '../../../assets/fgimage/hang/eye_small.png';
import eyeSmallLooking from '../../../assets/fgimage/hang/eye_small_looking.png';
import eyePass from '../../../assets/fgimage/hang/eye_pass.png';
// import { useEmotion } from '../../../hooks/useEmotion';
import { useSlave } from '../../../hooks/useSlave';

// const eyeImages = [
//   eyeDefault,
//   eyeClose,
//   eyeBig,
//   eyeSmall,
//   eyePass,
// ];

const Eyes = ():JSX.Element => {
  const { status } = useSlave();
  // const { expression } = useEmotion();

  let fearEyesImage = eyeDefault;
  if (status.fear > 60) {
    fearEyesImage = eyeSmall;
  } else if (status.fear > 30) {
    fearEyesImage = eyeSmallLooking;
  } else if (status.fear > 10) {
    fearEyesImage = eyeClose;
  }
  return (
    <Container>
      {status.oxygen > 0
        ? <img src={fearEyesImage} alt="" />

        : <img src={eyePass} alt="" />}

    </Container>
  );
};

export default Eyes;
