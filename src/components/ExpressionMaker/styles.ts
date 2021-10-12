import styled from 'styled-components';

export const Container = styled.div`
  position:absolute;
  top:0;
  right:0;
  display:flex;

  font-size:20px;

  background: rgb(220,220,220,0.5);

  .expName {
    width:90px;
   
  }
  & > div  {
    & > span {
      font-weight: 600;
      font-size: 22px;
      text-align:center;
      padding-bottom:5px;
    }
  }
`;

export const ReactionContainer = styled.div`
  width:150px;
  padding:20px;

  border-right: 1px solid black;

  button {
      font-size:20px; 
  }

  div {
    display:flex;
    justify-content:space-between;
    margin-bottom: 5px;
   
    input {
      width: 50px;
      font-size:20px;
    }
    
  }
`;

export const ExpressionList = styled.div`
  width:170px;
  padding:20px;

  border-right: 1px solid black;

  button {
      font-size:20px;
      
  }

  div {
    display:flex;
    justify-content:space-between;
    
  
    input {
      width: 50px;
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
