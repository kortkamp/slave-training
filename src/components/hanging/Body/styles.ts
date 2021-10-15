import styled from 'styled-components';

interface IBodyContainer {
  swingAngle:number;

}

interface ILiftContainer {
  liftHeight: number
}

const bodyScale = 0.65;
const swingTime = 3;

export const LiftContainer = styled.div<ILiftContainer>`

  transform:translateY(-${(props) => props.liftHeight}px) scale(${bodyScale});
  transition: transform 2s ;
`;

export const Container = styled.div<IBodyContainer>`
  top: 500px;
  left: -200px;

  position:relative;
  
  img.ropeImg {
    left: 628px;
    top: -423px;
  }

  &.swing{
    animation: swinging ${swingTime}s ease-in-out infinite;
    
    animation-delay: -${swingTime / 2}s;
    transform: rotate(0) ;
    transform-origin: center -400px;

    transition: transform ${swingTime}s ;
  }

  @keyframes swing2 {
    0% {
      transform: rotate(0) ;
    }
    100% {
      transform:  rotate(${(props) => props.swingAngle}deg);
    }
  }
  @keyframes swinging {
    0% , 100%  {
      transform: rotate(${(props) => props.swingAngle}deg) ;
    }
    50% {
      transform:  rotate(-${(props) => props.swingAngle}deg);
    }
  }


`;
