import { Container, LiftContainer } from './styles';

import bodyImg from '../../../assets/fgimage/hang/hang_body2.png';
import Legs from '../Legs';
import Head from '../Head';

import ropeImg from '../../../assets/fgimage/hang/rope.png';

interface IBodyState {
  hands: 'tied'|'released';
  neck: 'tied'|'released';
  liftHeight: number;
}

const Body = ({
  // eslint-disable-next-line no-unused-vars
  hands, neck, liftHeight,
}:IBodyState):JSX.Element => (
  <LiftContainer liftHeight={liftHeight}>
    <Container swingAngle={5} className={liftHeight > 0 ? 'swing' : 'sit'}>

      <img src={bodyImg} alt="" />
      <Legs liftHeight={liftHeight} />
      {neck === 'tied' && <img className="ropeImg" src={ropeImg} alt="" />}
      <Head liftHeight={liftHeight} />

    </Container>

  </LiftContainer>
);

export default Body;
