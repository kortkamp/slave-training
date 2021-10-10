/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Container, TestButton } from './styles';

// mouth
import mouthClosed from '../../assets/fgimage/Hx1/body/m_n.png';
import mouthSmile from '../../assets/fgimage/Hx1/body/m_s.png';
import mouthSmileTongue from '../../assets/fgimage/Hx1/body/m_s_t.png';
import mouthClosedSmile from '../../assets/fgimage/Hx1/body/m_sn.png';
import mouthA from '../../assets/fgimage/Hx1/body/m_a.png';
import mouthE from '../../assets/fgimage/Hx1/body/m_e.png';
import mouthETongue from '../../assets/fgimage/Hx1/body/m_e_t.png';
import mouthI from '../../assets/fgimage/Hx1/body/m_i.png';
import mouthO from '../../assets/fgimage/Hx1/body/m_o.png';
import mouthOTongue from '../../assets/fgimage/Hx1/body/m_o_t.png';
import { useEmotion } from '../../hooks/useEmotion';

const Mouth = ():JSX.Element => {
  // never change that damm order in the array below or you gonna
  // fuck all the game, to add new images , always put then after the array alements
  const images = [
    { file: mouthClosed, name: 'mouthClosed' },
    { file: mouthSmile, name: 'mouthSmile' },
    { file: mouthSmileTongue, name: 'mouthSmileTongue' },
    { file: mouthClosedSmile, name: 'mouthClosedSmile' },
    { file: mouthA, name: 'mouthA' },
    { file: mouthE, name: 'mouthE' },
    { file: mouthETongue, name: 'mouthETongue' },
    { file: mouthI, name: 'mouthI' },
    { file: mouthO, name: 'mouthO' },
    { file: mouthOTongue, name: 'mouthOTongue' },
    { file: mouthClosed, name: 'mouthClosed' },
  ];

  const { expression } = useEmotion();

  function setMouth() {

  }

  return (
    <Container>
      <img
        src={
          expression.head.mouth < images.length
            ? images[expression.head.mouth].file
            : images[images.length - 1].file
        }
        alt=""
      />

    </Container>
  );
};

export default Mouth;
