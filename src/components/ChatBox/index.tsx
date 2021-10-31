import { useState } from 'react';
import { Container, Option } from './styles';

interface IChatOption {
  text: string;
  action: () => void;
  next?: IChatSequence|undefined;
  reset?: boolean;
  finish?:boolean;
}
export interface IChatSequence {
  // eslint-disable-next-line react/no-unused-prop-types
  text: string;
  // eslint-disable-next-line react/no-unused-prop-types
  options: IChatOption[];
}

const ChatBox = ({ initchat }:{initchat:IChatSequence}):JSX.Element => {
  const [chat, setChat] = useState<IChatSequence|undefined>(initchat);

  return (
    <Container>

      <div className="text">
        { chat?.text || '...'}
      </div>
      <div className="options">
        {chat?.options.map((option) => (
          <Option
            onClick={() => {
              option.action();
              if (option.next) {
                setChat(option.next);
              }
              if (option.reset) {
                setChat(initchat);
              }
              if (option.finish) {
                setChat(undefined);
              }
            }}
          >
            {option.text}
          </Option>
        ))}
      </div>

    </Container>
  );
};

export default ChatBox;
