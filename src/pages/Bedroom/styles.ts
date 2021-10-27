import styled from 'styled-components';

export const Container = styled.div`
  
  
  position: relative;
  width:fit-content;

  div.headContainer {
    transform: rotate(42deg) scale(0.85);
    /* opacity:0.3; */
    position: absolute;
    top: -60px;
    left: 554px; 
    /* transform-origin: '0px 0px'; */
    /* transform: 'scale(0.8)'; */
  }

  img {
    top:0;
    left:0;
    position:absolute;
    &.background {
      position:static;
    }
  }
`;
