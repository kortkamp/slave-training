import styled from 'styled-components';

export const Container = styled.div`
  position:absolute;
  top:0;
  right:0;
  display:flex;

  font-size:20px;

  background: rgb(220,220,220,0.5);
`;

export const ExpressionList = styled.div`
  width:150px;
  padding:20px;

  border-right: 1px solid black;

  

  div {
    display:flex;
    justify-content:space-between;
    
    button {
      font-size:20px;
      
    }
    
  }
`;

export const ExpressionEditor = styled.div`
 

  
  padding: 20px;
  
  display: flex;
  flex-direction: column;
  align-items:center;

  input, button {
    width:150px;
    font-size:20px;
  }
 

`;

export const SelectorStyle = styled.div`
  
  width:150px;

  div {
    display:flex;
    justify-content:space-between;
    align-items:center;

  }

  padding-bottom: 5px;

  border-bottom:1px solid black;
  margin-bottom: 5px;

  button {
    height:30px;
    width:35px;
    font-size:20px;
  }

`;
