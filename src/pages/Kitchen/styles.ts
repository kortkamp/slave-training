import styled from 'styled-components';

export const Container = styled.div`
  
  button {
    width: 100px;
    height: 70px;
    font-size: 50px;
  }
  position: relative;
  width:fit-content;

  img {
    top:0;
    left:0;
    position:absolute;
    &.background {
      position:static;
    }
  }
`;

export const Scene = styled.div`
  position:absolute;
  top:-50px;
  left:0;
  
  transform: rotate(16deg);
  
`;
