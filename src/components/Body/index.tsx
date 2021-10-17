import { Container } from './styles';
import Head from '../Head';
import { EmotionProvider } from '../../hooks/useEmotion';

// import bodyImg from '../../assets/fgimage/Hx1/body/body0.png';
import Ass from '../Ass';

// eslint-disable-next-line no-unused-vars
const Body = ():JSX.Element => (
  <Container>
    <EmotionProvider>
      {/* <img src={bodyImg} alt="" /> */}
      <Head />
      <Ass />
    </EmotionProvider>
  </Container>
);

export default Body;
