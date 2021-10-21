import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { Container } from './styles';
import Body from '../../components/Body';

import { IToolData } from '../../tools';

import StatusBox from '../../components/StatusBox';

import backgroundImg from '../../assets/bgimage/H/Hx1_0.jpg';
import PenetratingTool from '../../components/PenetratingTool';

import ToolsBox from '../../components/ToolsBox';
import ElasticTool from '../../components/ElasticTool';
// import { useSlave } from '../../hooks/useSlave';

const MainRoom = ():JSX.Element => {
  // eslint-disable-next-line no-unused-vars
  // const { mousePosition } = useMousePosition();

  // const { status } = useSlave();
  const history = useHistory();
  // const { hurt } = useSlave();

  const [tool, setTool] = useState<IToolData>();
  console.log('oh my god rendered room');
  return (
    <Container>

      <img className="background" src={backgroundImg} alt="" />

      <Body />
      {tool?.type === 'penetrator'
      && <PenetratingTool initialPosition={{ x: 753, y: 647 }} tool={tool} />}

      {tool?.type === 'elastic'
      && <ElasticTool initialPosition={{ x: 520, y: 350 }} tool={tool} action={() => {}} />}

      <StatusBox />
      <button type="button" onClick={() => history.push('/hang')}>Goto Hang</button>
      <button type="button">Tools</button>

      <ToolsBox selectTool={(selectedTool) => setTool(selectedTool)} />
    </Container>
  );
};
export default MainRoom;
