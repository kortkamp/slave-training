import styled from 'styled-components';

export const Container = styled.div`

  position:absolute;
  right:0;
  bottom:0;
  z-index:9999;

  border:1px solid wheat;
  border-radius:10px;
  padding:10px 40px;

  display: flex;
  flex-direction: column;
  align-items: center;

  &>span {
    font-size: 30px;
    font-weight: 600;
    
  }

  &>div {
    transform: rotate(-90deg);
    
  }
  background: rgb(220,220,220,0.1);

`;
