import { Container } from './styles';
import Body from '../../components/Body';

import backgroundImg from '../../assets/bgimage/H/Hx1_0.jpg';

import testImg from '../../assets/fgimage/Hx1/tools/plug.png';

const MainRoom = ():JSX.Element => (
  <Container>
    <img src={backgroundImg} alt="" />
    <Body />
    <img src={testImg} alt="" />
  </Container>
);
export default MainRoom;
