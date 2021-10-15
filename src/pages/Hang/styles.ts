import styled from 'styled-components';

export const Container = styled.div`
  
  height:900px;
  width:1350px;
  position: relative;
  
  div.hangController{
    position:absolute;
    top:0;
    left: 0;
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
