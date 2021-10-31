/* eslint-disable react/destructuring-assignment */
import { useState } from 'react';
import { Container, Option } from './styles';

interface IChatOption {
  text: string;
  effect: () => number;
}
interface IChatSequence {
  text: string;
  options: IChatOption[];
}

const ChatBox = (props:{chat:IChatSequence[]}):JSX.Element => {
  const [step, setStep] = useState(0);

  const { chat } = props;

  return (
    <Container>
      <div className="text">
        { chat[step].text }
      </div>
      <div className="options">
        {chat[step].options.map((option) => (
          <Option onClick={() => { setStep(option.effect()); }}>
            {option.text}
          </Option>
        ))}
      </div>
    </Container>
  );
};

export default ChatBox;
