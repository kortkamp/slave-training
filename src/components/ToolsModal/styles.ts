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
    

    & > div {
      border: 1px solid red;
      cursor: pointer;
      height: 200px;
      width: 100px;
      display: flex;
      align-items:center;
      justify-content:center;
      border-radius: 20px;
      margin: 10px;
      img {
        height: 200px;
      }
    }
  }
  img.selected {
    filter:opacity(0.3);
  }

  

`;

export const ActiveTools = styled.div`
    position: fixed;
    left: 0;
    top:0;
    /* z-index: var(--tool-z-index); */
    .tool{

    }
    `;
