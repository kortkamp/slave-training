import styled from 'styled-components';

export const Container = styled.div`

  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
  
  .title {
    font: 35px sans-serif;
    font-weight : 600;
    margin-bottom: 30px;
  }
  .content{
    width:100%;

    display: flex;
    justify-content:space-around;
    align-items:center;
    

    & > button {
      border: 2px solid red;
      cursor: pointer;
      height: 100px;
      width: 100px;
      display: flex;
      align-items:center;
      justify-content:center;
      border-radius: 20px;
      margin: 10px;
      font-size: 20px;
      img {
        height: 200px;
      }
    }
  }

`;
