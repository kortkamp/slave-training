import styled from 'styled-components';

interface IContainerProps {
  position: number;
}

export const Container = styled.div<IContainerProps>`
  position:absolute;
  left: 345px;
  top:-90px;

  transform: rotate(-${(props) => props.position * 32}deg);
  transform-origin: 320px 250px;
`;
