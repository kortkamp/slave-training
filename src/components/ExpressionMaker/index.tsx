/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import { useState } from 'react';
import { IExpression, useEmotion } from '../../hooks/useEmotion';
import {
  Container, ExpressionEditor, ExpressionList, SelectorStyle,
} from './styles';

interface ISelectorProps {
  title:string;
  value:number;
  // eslint-disable-next-line no-unused-vars
  setValue:(value:number)=>void;
}
// eslint-disable-next-line no-unused-vars
const Selector = ({ title, value, setValue }:ISelectorProps):JSX.Element => {
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState(0);

  return (
    <SelectorStyle>
      <span>{title}</span>
      <div>
        <button onClick={() => setValue(-1)}>{'<'}</button>
        <span>{value}</span>
        <button onClick={() => setValue(1)}>{'>'}</button>

      </div>
    </SelectorStyle>
  );
};

const ExpressionMaker = ():JSX.Element => {
  const { expression, setExpression } = useEmotion();

  const [expressionList, setExpressionList] = useState<IExpression[]>([]);

  function setValue(keyName:string, value:number) {
    const newExpression = { ...expression };
    // @ts-ignore
    newExpression.head[keyName] += value;
    // @ts-ignore
    if (newExpression.head[keyName] < 0) {
      // @ts-ignore
      newExpression.head[keyName] = 0;
    }
    setExpression(newExpression);
  }

  function addExpression() {
    const index = expressionList.findIndex((item) => (item.name === expression.name));
    if (index >= 0) {
      expressionList[index] = expression;
    } else {
      setExpressionList(
        [...expressionList, { name: expression.name, head: { ...expression.head } }],
      );
    }
  }

  function removeExpression(name:string) {
    const newExpressionList = expressionList.filter((item) => item.name !== name);
    setExpressionList(newExpressionList);
  }

  function changeExpressionName(name:string) {
    const newExpression = { ...expression };
    newExpression.name = name;
    setExpression(newExpression);
  }

  const expressionKeys = Object.keys(expression.head);

  return (
    <Container>
      <ExpressionList>
        {expressionList.map((item) => (
          <div key={item.name}>
            <button onClick={() => setExpression(item)}>
              {item.name}
            </button>
            <button onClick={() => { removeExpression(item.name); }}>X</button>
          </div>
        ))}
      </ExpressionList>
      <ExpressionEditor>
        <input
          type="text"
          name=""
          value={expression.name}
          onChange={(event) => changeExpressionName(event.target.value)}
        />
        {expressionKeys.map((key) => (
          <Selector
            key={key}
            title={key}
            // @ts-ignore
            value={expression.head[key]}
            setValue={(value:number) => setValue(key, value)}
          />
        ))}
        <button onClick={() => addExpression()}>Save</button>
      </ExpressionEditor>
    </Container>
  );
};

export default ExpressionMaker;
