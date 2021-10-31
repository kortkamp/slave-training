import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from './styles';

import backgroundImg from '../../assets/bgimage/bg/town_night.jpg';

import salesman from '../../assets/fgimage/o/sub/smile.png';

import slave from '../../assets/fgimage/s/body/stand.png';

import ToolsBox from '../../components/ToolsBox';
import ChatBox from '../../components/ChatBox';

interface IChatOption {
  text: string;
  effect: () => number;
}
interface IChatSequence {
  text: string;
  options: IChatOption[];
}

const SlaveMarket = ():JSX.Element => {
  const [isSlaveShown, setIsSlaveShown] = useState(false);
  const history = useHistory();

  const chat:IChatSequence[] = [
    { // 0
      text: '[Slave Master] Hello sir, what do you want tonight?',
      options: [
        { text: 'Buy a new slave', effect: () => { setIsSlaveShown(true); return 1; } },
        { text: 'Sell a slave', effect: () => 0 },
      ],
    },
    { // 1
      text: '[Slave Master] So do you want to buy this piece of shit?',
      options: [
        { text: 'Yes', effect: () => { console.log(`you bought a slave${chat}`); return 3; } },
        { text: 'No', effect: () => { setIsSlaveShown(false); return 0; } },
        { text: 'Talk to Her', effect: () => 2 },
      ],
    },
    { // 2
      text: '[Slave Master] Dont spend your time talking with slaves, they deserve pain and punishment.',
      options: [
        { text: 'Whats your name?', effect: () => 2 },
        { text: 'How old are you?', effect: () => 2 },
        { text: 'Back', effect: () => 1 },
      ],
    },
    { // 3
      text: '[Slave Master] Thank you for buying this garbage and dont forget, if you damage her too much I have plenty of slaves to sell.',
      options: [
        { text: 'Goodbye Mister', effect: () => { history.push('/restroom'); return 0; } },

      ],
    },
  ];

  return (
    <Container>
      <img className="background" src={backgroundImg} alt="" />
      <img src={salesman} alt="" />
      { isSlaveShown
      && <img src={slave} alt="" />}

      <ToolsBox />

      <ChatBox chat={chat} />

    </Container>
  );
};
export default SlaveMarket;
