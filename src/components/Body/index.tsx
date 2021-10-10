import { Container } from './styles';
import Head from '../Head';
import { EmotionProvider } from '../../hooks/useEmotion';

// eslint-disable-next-line no-unused-vars
const Body = ():JSX.Element => (
  <Container>
    <EmotionProvider>
      <Head />
    </EmotionProvider>
  </Container>
);

export default Body;
