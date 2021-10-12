/* eslint-disable no-unused-vars */
import { Container } from './styles';

import eyebrowDefault from '../../assets/fgimage/Hx1/body/y_def.png';
import eyebrowConform from '../../assets/fgimage/Hx1/body/y_conf.png';
import eyebrowPain from '../../assets/fgimage/Hx1/body/y_conf_h.png';
import { useEmotion } from '../../hooks/useEmotion';

const images = [
  eyebrowDefault,
  eyebrowConform,
  eyebrowPain,
];

const Eyebrow = ():JSX.Element => {
  const { expression } = useEmotion();
  return (
    <Container>
      <img src={images[expression.face.eyebrow]} alt="" />
    </Container>
  );
};

export default Eyebrow;
