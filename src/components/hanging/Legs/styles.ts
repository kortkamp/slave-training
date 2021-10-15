import styled from 'styled-components';

const swingTime = 0.75;
const swingAngle = 4;

export const Container = styled.div`

  .repositionedLeftLeg {
    left: 580px;
    top: 540px;
    
    transform-origin: 120px 70px;

  }
  .swinging3 {
    animation: swingingLegs ${swingTime / 3}s ease-in-out infinite;
  }
  .swinging2 {
    animation: swingingLegs ${swingTime / 2}s ease-in-out infinite;
  }
  .swinging1 {
    animation: swingingLegs ${swingTime}s ease-in-out infinite;
  }

  .repositionedRightLeg {
    left: 460px;
    top: 520px;
    
    transform-origin: 170px 50px;
    animation-delay: -${swingTime / 4}s;
  }

  


  @keyframes swingingLegs {
    0% , 100%  {
      transform: rotate(${swingAngle}deg)  scaleY(0.9);
    }
    50% {
      transform:  rotate(-${swingAngle}deg) scaleY(0.9);
    }
  }
`;
