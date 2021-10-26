/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Container, Scene } from './styles';

import StatusBox from '../../components/StatusBox';

import backgroundImg from '../../assets/bgimage/bg/bed.jpg';

import chairImg from '../../assets/fgimage/o/food/chair.png';
import tableImg from '../../assets/fgimage/o/food/tbl_a.png';
import dishImg from '../../assets/fgimage/o/food/dish.png';
import dishBread1 from '../../assets/fgimage/o/food/bread1.png';
import dishBread2 from '../../assets/fgimage/o/food/bread2.png';
import dishBread3 from '../../assets/fgimage/o/food/bread3.png';

import breadHandImg from '../../assets/fgimage/o/food/bread_hand.png';

import bodyImg from '../../assets/fgimage/s/body/din_b.png';
import headImg from '../../assets/fgimage/s/body/din_h2.png';

import eyesImg from '../../assets/fgimage/s/face/S/e_def.gif';
import eyesClose from '../../assets/fgimage/s/face/S/e_close.png';

import mouthDef from '../../assets/fgimage/s/face/S/m_def.png';
import mouthOpen from '../../assets/fgimage/s/face/S/m_open.png';
import mouthEating from '../../assets/fgimage/s/face/S/m_mgmg.gif';

import frontHairImg from '../../assets/fgimage/s/body/din_fh.png';
import rightArm from '../../assets/fgimage/s/body/din_a1b.png';
import leftArmDown from '../../assets/fgimage/s/body/din_a2.png';
import leftArmUpHolding from '../../assets/fgimage/s/body/din_a2c.png';
import leftArmUpHolding2 from '../../assets/fgimage/s/body/din_a2b.png';
import dressImg from '../../assets/fgimage/s/dress/S/a1.png';

const eatingArm = [
  leftArmDown, leftArmUpHolding, leftArmUpHolding2,
];

const mouth = [
  mouthDef, mouthOpen, mouthEating,
];

const eye = [
  eyesImg, eyesClose,
];

const foodImages = [
  dishImg, dishBread1, dishBread2, dishBread3,
];

interface IData {
  arm:number;
  mouth:number;
  eye:number;
  time: number;
}

const data:IData[] = [
  {
    arm: 1, mouth: 1, eye: 0, time: 600,
  },
  {
    arm: 2, mouth: 2, eye: 1, time: 1000,
  },
  {
    arm: 0, mouth: 2, eye: 1, time: 3000,
  },
  {
    arm: 0, mouth: 0, eye: 1, time: 2000,
  },

];

const Kitchen = ():JSX.Element => {
  const [eatAnimation, setEatAnimation] = useState(0);
  const [isEating, setIsEating] = useState(false);
  const [food, setFood] = useState(3);

  useEffect(() => {
    // here we must check -1 cuz animation scene
    // takes several steps, each been checking isEating
    // but the first that sets food--
    if (food === -1) {
      setIsEating(false);
    }
  }, [food]);

  function eatPart(animationPhase:number) {
    let currentIsEating = isEating;

    setIsEating((value) => {
      currentIsEating = value;
      return value;
    });

    if (animationPhase === 0) {
      setFood((value) => value - 1);
    }

    if (currentIsEating) {
      setEatAnimation(animationPhase);
      setTimeout(() => {
        eatPart((animationPhase + 1) % data.length);
      }, data[animationPhase].time);
    }
  }
  useEffect(() => {
    if (isEating) {
      eatPart(0);
    }
  }, [isEating]);

  return (
    <Container>

      <img className="background" src={backgroundImg} alt="" />
      <Scene>
        <img src={chairImg} alt="" />

        {isEating
          ? <img src={eatingArm[data[eatAnimation].arm]} alt="" />
          : <img src={leftArmDown} alt="" />}

        {data[eatAnimation].arm === 1 && isEating
        && <img src={breadHandImg} alt="" />}
        <img src={bodyImg} alt="" />
        <img src={dressImg} alt="" />
        <img src={rightArm} alt="" />
        <img src={headImg} alt="" />
        {isEating
          ? (
            <>
              <img src={eye[data[eatAnimation].eye]} alt="" />
              <img src={mouth[data[eatAnimation].mouth]} alt="" />
            </>
          )
          : (
            <>
              <img src={eyesImg} alt="" />
              <img src={mouthDef} alt="" />
            </>
          )}

        <img src={frontHairImg} alt="" />

        <img src={tableImg} alt="" />
        <img src={foodImages[food]} alt="" />
      </Scene>

      <button
        type="button"
        onClick={() => { setIsEating(!isEating); }}
      >
        {isEating ? 'eat' : 'dont'}
      </button>
      <StatusBox />
    </Container>
  );
};
export default Kitchen;
