import { Container } from './styles';
import Head from '../Head';
import { EmotionProvider } from '../../hooks/useEmotion';

import bodyImg from '../../assets/fgimage/Hx1/body/body0.png';
import Ass from '../Ass';

import squirt1 from '../../assets/fgimage/Hx1/ef/squi1.png';
import squirt2 from '../../assets/fgimage/Hx1/ef/squi2.png';
import squirt3 from '../../assets/fgimage/Hx1/ef/squi3.png';
import { useSlave } from '../../hooks/useSlave';

const squirtImages = [
  '', squirt1, squirt2, squirt3,
];

// eslint-disable-next-line no-unused-vars
const Body = ():JSX.Element => {
  const { squirtingLevel } = useSlave();
  const squirtIndex = squirtingLevel >= squirtImages.length
    ? squirtImages.length - 1
    : squirtingLevel;
  return (
    <Container>
      <EmotionProvider>
        <img src={bodyImg} alt="" />
        {squirtingLevel > 0
        && (
          <img
            className="squirt"
            src={squirtImages[squirtIndex]}
            alt=""
          />
        ) }
        <Head />
        <Ass />
      </EmotionProvider>
    </Container>
  );
};

export default Body;
