import { Container } from './styles';
import Body from '../../components/Body';

// eslint-disable-next-line no-unused-vars
import { useMousePosition } from '../../hooks/useMousePosition';

import StatusBox from '../../components/StatusBox';

import backgroundImg from '../../assets/bgimage/H/Hx1_0.jpg';
import PenetratingTool from '../../components/PenetratingTool';
// import { useSlave } from '../../hooks/useSlave';

// import testImg from '../../assets/fgimage/Hx1/tools/plug.png';

const MainRoom = ():JSX.Element => {
  // eslint-disable-next-line no-unused-vars
  const { mousePosition } = useMousePosition();
  console.log('main room redraw');
  // const { status } = useSlave();

  return (
    <Container>

      <img className="background" src={backgroundImg} alt="" />

      <Body />
      <PenetratingTool initialPosition={{ x: 753, y: 647 }} limit={250} />
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
      <span>{`x:${mousePosition.x} y:${mousePosition.y}`}</span>
    </Container>
  );
};
export default MainRoom;
