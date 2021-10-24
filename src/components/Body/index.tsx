import { Container } from './styles';
import Head from '../Head';

import bodyImg from '../../assets/fgimage/Hx1/body/body0.png';
import Ass from '../Ass';

import Torax from '../Torax';
import Squirt from '../Squirt';
import Belly from '../Belly';

// eslint-disable-next-line no-unused-vars

const Body = ():JSX.Element => (
  <Container>
    <img src={bodyImg} alt="" />
    <Torax />
    <Squirt />
    <Head />
    <Ass />
    <Belly />
  </Container>
);

export default Body;
