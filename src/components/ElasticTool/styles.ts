import styled from 'styled-components';

export const Container = styled.div`
 
  z-index:1020;
  position:absolute;  

  transform: rotate(-50deg);
  
  .pointZeroMarker {
    position:absolute;
    border: 4px solid red;
    left:-2px;
    top: -2px;
  }

  img {
    cursor: -webkit-grab; cursor:-moz-grab;
  }
  
  img.released {
    transition: all 0.05s ease-in;
  }
  
`;
