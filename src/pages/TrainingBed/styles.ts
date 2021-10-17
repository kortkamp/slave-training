import styled from 'styled-components';

export const Container = styled.div`
  
  
  position: relative;
  width:fit-content;

  width: 1350px;
  height: 900px;

  img {
    top:0;
    left:0;
    position:absolute;
    &.background {
      position:static;
    }
  }
`;
