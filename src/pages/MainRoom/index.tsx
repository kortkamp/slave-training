import { Container } from './styles';
import Body from '../../components/Body';

// eslint-disable-next-line no-unused-vars
import { useMousePosition } from '../../hooks/useMousePosition';

import StatusBox from '../../components/StatusBox';

import backgroundImg from '../../assets/bgimage/H/Hx1_0.jpg';
// import { useSlave } from '../../hooks/useSlave';

// import testImg from '../../assets/fgimage/Hx1/tools/plug.png';

const MainRoom = ():JSX.Element => {
  // eslint-disable-next-line no-unused-vars
  // const position = useMousePosition();
  console.log('main room redraw');
  // const { status } = useSlave();
  return (
    <Container>

      <img className="background" src={backgroundImg} alt="" />

      <Body />
      {/* <img src={testImg} alt="" /> */}
      {/* <div>
        {position.x}
        :
        {position.y}
        --
        {' '}
        {status.lust}
      </div> */}
      <StatusBox />
    </Container>
  );
};
export default MainRoom;
