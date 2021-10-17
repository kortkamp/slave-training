/* eslint-disable no-unused-vars */
import { Container } from './styles';

import eyebrowDefault from '../../assets/fgimage/Hx1/body/y_def.png';
import eyebrowConform from '../../assets/fgimage/Hx1/body/y_conf.png';
import eyebrowPain from '../../assets/fgimage/Hx1/body/y_conf_h.png';
import { useSlave } from '../../hooks/useSlave';

const images = [
  eyebrowDefault,
  eyebrowConform,
  eyebrowPain,
];

const Eyebrow = ():JSX.Element => {
  const { status } = useSlave();
  let strongestFeeling = status.lust;
  if (status.pain > strongestFeeling) {
    strongestFeeling = status.pain;
  }
  if (status.fear > strongestFeeling) {
    strongestFeeling = status.fear;
  }
  let eyebrowPosition = eyebrowDefault;
  if (strongestFeeling > 20) {
    eyebrowPosition = eyebrowConform;
  }
  if (strongestFeeling > 50) {
    eyebrowPosition = eyebrowPain;
  }
  return (
    <Container>
      <img src={eyebrowPosition} alt="" />
    </Container>
  );
};

export default Eyebrow;
