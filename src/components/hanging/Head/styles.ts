import styled from 'styled-components';

interface IContainerProps {
  skewAngle: number;
}

export const Container = styled.div<IContainerProps>`
  position:absolute;
  left: 345px;
  top:-90px;

  transform: rotate(-${(props) => props.skewAngle}deg);
  transform-origin: 320px 250px;
  transition: transform 0.8s;
`;
