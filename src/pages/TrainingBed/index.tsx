import { useHistory } from 'react-router-dom';
// import { useState } from 'react';
import { Container } from './styles';
import Body from '../../components/Body';

import StatusBox from '../../components/StatusBox';

import backgroundImg from '../../assets/bgimage/H/Hx1_0.jpg';

import ToolsBox from '../../components/ToolsBox';

// import { useMousePosition } from '../../hooks/useMousePosition';

const MainRoom = ():JSX.Element => {
  const history = useHistory();

  console.log('oh my god rendered room');
  // const { mousePosition } = useMousePosition();
  return (
    <Container>

      <img className="background" src={backgroundImg} alt="" />

      <Body />

      <StatusBox />
      <button type="button" onClick={() => history.push('/hang')}>Goto Hang</button>
      <button type="button">Tools</button>

      <ToolsBox />
      {/* <span>{`${mousePosition.x} ${mousePosition.y}`}</span> */}

    </Container>
  );
};
export default MainRoom;
