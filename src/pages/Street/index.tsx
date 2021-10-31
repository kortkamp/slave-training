import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from './styles';

import backgroundImg from '../../assets/bgimage/bg/town_night.jpg';

import salesman from '../../assets/fgimage/o/sub/smile.png';

import slave from '../../assets/fgimage/s/body/stand.png';

import ToolsBox from '../../components/ToolsBox';
import ChatBox, { IChatSequence } from '../../components/ChatBox';

const SlaveMarket = ():JSX.Element => {
  const [isSlaveShown, setIsSlaveShown] = useState(false);
  const history = useHistory();

  const chat: IChatSequence = { // 0
    text: '[Slave Master] Hello sir, what do you want tonight?',
    options: [
      { text: 'Sell a slave', action: () => {} },
      {
        text: 'Buy a new slave',
        action: () => { setIsSlaveShown(true); },
        next: { // 0
          text: '[Slave Master] In this momment I have just this small slave girl, will you buy Her?',
          options: [
            {
              text: 'Yes',
              action: () => {},
              next: { // 0
                text: '[Slave Master] Thank you Mister, good to make business with you.',
                options: [
                  { text: 'Goodbye', action: () => { history.push('/restroom'); } },
                ],
              },
            },
            { text: 'No', action: () => { setIsSlaveShown(false); }, reset: true },
          ],
        },
      },
      { text: 'Nothing', action: () => {}, finish: true },
    ],
  };

  return (
    <Container>
      <img className="background" src={backgroundImg} alt="" />
      <img src={salesman} alt="" />
      { isSlaveShown
      && <img src={slave} alt="" />}

      <ToolsBox />

      <ChatBox initchat={chat} />

    </Container>
  );
};
export default SlaveMarket;
