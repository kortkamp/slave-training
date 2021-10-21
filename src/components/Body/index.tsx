import { Container } from './styles';
import Head from '../Head';

import bodyImg from '../../assets/fgimage/Hx1/body/body0.png';
import Ass from '../Ass';

import Torax from '../Torax';
import Squirt from '../Squirt';

// eslint-disable-next-line no-unused-vars

const Body = ():JSX.Element => (
  <Container>
    <img src={bodyImg} alt="" />
    <Torax />
    <Squirt />
    <Head />
    <Ass />
  </Container>
);

export default Body;
