import { useReducer } from 'react';
import clone from 'clone-deep';
import { Container, Option } from './styles';

interface IChatOption {
  text: string;
  action?: () => void;
  next?: IChatSequence|undefined;
  reset?: boolean;
  back?:number;
  finish?:boolean;
}
export interface IChatSequence {
  // eslint-disable-next-line react/no-unused-prop-types
  text: string;
  // eslint-disable-next-line react/no-unused-prop-types
  options?: IChatOption[];
}
interface IReducerStateAction {
  type: 'clear'|'go'|'back';
  ammount?: number;
  state?: IChatSequence;
}
function chatReducer(state:IChatSequence[], action:IReducerStateAction) {
  switch (action.type) {
    case 'go':
      if (action.state) {
        state.unshift(clone(action.state));
        return state;
      }
      return state;
    case 'back':
      if (action.ammount) {
        console.log(action.ammount);
        state.splice(0, action.ammount);
        return state;
      }
      state.shift();
      return state;
    case 'clear':
      return [];
    default:
      throw new Error();
  }
}

const ChatBox = ({ initchat }:{initchat:IChatSequence}):JSX.Element => {
  const [chatStack, dispachChat] = useReducer(chatReducer, [initchat]);

  return (
    <Container>

      <div key={chatStack[0]?.text} className="text">
        { chatStack[0]?.text || '...'}
      </div>
      <div key={`${chatStack[0].text}-`} className="options">
        {chatStack[0].options?.map((option) => (
          <Option
            key={option.text}
            onClick={() => {
              if (option.action) {
                option.action();
              }
              if (option.next) {
                dispachChat({ type: 'go', state: option.next });
              }
              if (option.back) {
                dispachChat({ type: 'back', ammount: option.back });
              }
              if (option.finish) {
                dispachChat({ type: 'clear' });
              }
              if (option.reset) {
                dispachChat({ type: 'clear' });
                dispachChat({ type: 'go', state: initchat });
              }
            }}
          >
            {option.text}
          </Option>
        ))}
        {chatStack.length > 1
        && (
          <Option onClick={() => { dispachChat({ type: 'back' }); }}>
            Back
          </Option>
        )}
      </div>

    </Container>
  );
};

export default ChatBox;
