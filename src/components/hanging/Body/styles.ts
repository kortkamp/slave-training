import styled from 'styled-components';

interface IBodyContainer {
  hangAngle:number;
}

const bodyScale = 0.8;

export const Container = styled.div<IBodyContainer>`
  top: 800px;

  position:relative;
  transform: scale(${bodyScale});

  &:not(.sit) {
    //transform:translateY(100px);
    
  }

  &.swing{

   
    animation: swinging 2.5s ease-in-out infinite;
    
    transform-origin: center -1000px
  }

  @keyframes swinging {
  
  0% , 100%  {transform: translateX(-0px) rotate(${(props) => props.hangAngle}deg) scale(${bodyScale});}
  
  50% {transform: translateX(0px) rotate(-${(props) => props.hangAngle}deg) scale(${bodyScale});}
 
}
  

  //transition: transform 0.5s;

`;
