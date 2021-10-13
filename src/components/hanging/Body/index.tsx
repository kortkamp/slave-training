import { Container } from './styles';

import bodyImg from '../../../assets/fgimage/hang/hang_body.png';
import Legs from '../Legs';
import Head from '../Head';

interface IBodyState {
  state: 'sit'|'lift'|'swing'
}
const Body = ({ state }:IBodyState):JSX.Element => (
  <Container hangAngle={1} className={state}>

    <img src={bodyImg} alt="" />
    <Legs />
    <Head position={state === 'sit' ? 0 : 1} />

  </Container>
);

export default Body;
