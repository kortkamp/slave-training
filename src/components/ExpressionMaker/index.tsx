/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import { useState } from 'react';
import clone from 'clone-deep';
import { IExpression, IReaction, useEmotion } from '../../hooks/useEmotion';
import {
  Container, ExpressionEditor, ExpressionList, ReactionContainer, SelectorStyle,
} from './styles';

import Expression from '../../data/Expression.json';
import Reaction from '../../data/Reaction.json';

interface ISelectorProps {
  title:string;
  value:number;
  // eslint-disable-next-line no-unused-vars
  setValue:(value:number)=>void;
}
// eslint-disable-next-line no-unused-vars
const Selector = ({ title, value, setValue }:ISelectorProps):JSX.Element => (
  <SelectorStyle>
    <span>{title}</span>
    <div>
      <button onClick={() => setValue(-1)}>{'<'}</button>
      <span>{value}</span>
      <button onClick={() => setValue(1)}>{'>'}</button>

    </div>
  </SelectorStyle>
);

const ExpressionMaker = ():JSX.Element => {
  const {
    expression, setExpression, playReaction, loadExpressionFromData,
  } = useEmotion();

  const [expressionList, setExpressionList] = useState<IExpression[]>(
    Object.entries(Expression).map((entry) => (
      {
        name: entry[0],
        time: entry[1].time,
        face: entry[1].face,
      }
    )),
  );

  const [reaction, setReaction] = useState<IReaction>({
    name: '',
    priority: 0,
    expression: [],
  });

  function setValue(keyName:string, value:number) {
    const newExpression = { ...expression };
    // @ts-ignore
    newExpression.face[keyName] += value;
    // @ts-ignore
    if (newExpression.face[keyName] < 0) {
      // @ts-ignore
      newExpression.face[keyName] = 0;
    }
    setExpression(newExpression);
  }

  function addExpression() {
    const newExpression = { expression: { ...expression }, time: 0 };
    const index = expressionList.findIndex((item) => (item.name === expression.name));
    if (index >= 0) {
      expressionList[index] = {
        ...clone(expression),
        time: expressionList[index].time,
      };
    } else {
      setExpressionList(
        [...expressionList,
          clone(expression),
        ],
      );
    }
  }

  function removeExpression(name:string) {
    const newExpressionList = expressionList.filter((item) => item.name !== name);
    setExpressionList(newExpressionList);
  }

  function removeFromReaction(name:string) {

  }

  function changeExpressionName(name:string) {
    const newExpression = { ...expression };
    newExpression.name = name;
    setExpression(newExpression);
  }

  function setExpressionTime(item:IExpression, value:number) {
    const newExpressionList = expressionList.map((expItem) => {
      if (expItem.name === item.name) {
        return { ...expItem, time: value };
      }
      return expItem;
    });
    setExpressionList(newExpressionList);
  }
  function setReactionItemTime(item:IExpression, value:number) {

  }
  function addToReaction(timedExpression:IExpression) {
    const newReaction = clone(reaction);
    newReaction.expression.push({ name: timedExpression.name, time: timedExpression.time });
    setReaction(newReaction);
  }

  function generateExpressionJson() {
    const newArray = expressionList.map((entry) => (
      [entry.name, { time: entry.time, face: entry.face }]
    ));
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(Object.fromEntries(newArray)));
  }

  function loadReaction(value:IReaction) {
    setReaction(value);
  }

  const expressionKeys = Object.keys(expression.face);

  return (
    <Container>
      <ReactionContainer>
        <span>
          Reaction List
        </span>
        {Object.entries(Reaction).map((entry) => (
          <div key={entry[0]}>
            <button
              className="expName"
              onClick={() => loadReaction({ name: entry[0], ...entry[1] })}
            >
              {entry[0]}

            </button>
          </div>
        ))}
      </ReactionContainer>
      <ReactionContainer>
        <span>Reaction</span>
        <div>
          <button
            onClick={() => {
              playReaction(reaction);
            }}
          >
            Play
          </button>
          <button
            onClick={() => {
              const nome = reaction.name;
              const obj = {
                nome: {
                  priority: reaction.priority,
                  expression: reaction.expression,
                },
              };
              // eslint-disable-next-line no-console
              console.log(JSON.stringify(obj));
            }}
          >
            JSON

          </button>
        </div>
        <span>
          {reaction.name}
          {' '}
          {reaction.priority}
        </span>
        {reaction.expression.map((item) => (
          <div key={Math.random()}>
            <button
              className="expName"
              onClick={() => {
                loadExpressionFromData(item.name);
              }}
            >
              {item.name}
            </button>
            <input
              type="number"
              value={item.time}
              // eslint-disable-next-line no-param-reassign
              onChange={(event) => { item.time = Number(event.target.value); }}
            />
            <button>X</button>
          </div>
        ))}

      </ReactionContainer>
      <ExpressionList>
        <span>Expression List</span>
        <button onClick={() => generateExpressionJson()}>JSON</button>
        {expressionList.map((item) => (
          <div key={item.name}>
            <button onClick={() => addToReaction({ ...item })}>{'<'}</button>
            <button className="expName" onClick={() => setExpression(clone(item))}>
              {item.name}
            </button>
            <input
              type="number"
              value={item.time}
              onChange={(event) => setExpressionTime(item, Number(event.target.value))}
            />
            <button onClick={() => { removeExpression(item.name); }}>X</button>

          </div>
        ))}
      </ExpressionList>
      <ExpressionEditor>
        <span>Editor</span>
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
            value={expression.face[key]}
            setValue={(value:number) => setValue(key, value)}
          />
        ))}
        <button onClick={() => addExpression()}>Save</button>
      </ExpressionEditor>
    </Container>
  );
};

export default ExpressionMaker;
