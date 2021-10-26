/* eslint-disable import/prefer-default-export */
import { createGlobalStyle } from 'styled-components';

interface IGlobalProps {
  scale: number;
}

export const GlobalStyle = createGlobalStyle<IGlobalProps>`
  :root{
    --dark-green: #02793e;
    --green: #009c4f;
    --light-green: #78c348;
    --red: #df2930;
    --light-red: #FF454A;
    
    
    --blue: #5429cc;
    
    --blue-light: #6933ff;
    
    --text-title: #363f5f;
    --text-body: #969cb3;
    
    --background: #F0F2F5;
    --shape: #ffffff;


    // z-index list
    --tool-z-index:1005;

    --modal-z-index: 2000;
    --tool-box-z-index: 2100;
    
  }
  * {
    margin: 0;
    padding: 0;
    
  }
  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }
    @media (max-width: 720px){
      font-size: 87.5%;
    }
    width: fit-content;
    height:fit-content;
    
    overflow: hidden;

    transform:scale(${(props) => props.scale});
    transform-origin: left top;
    //overflow-y: scroll;
  }
  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
    //max-width: 52.5rem;
    
    
  }
  body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }
  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }
  button {
    cursor: pointer;
  }
  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  }
  
  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .react-modal-overlay {
    background: rgba(0,0,0,0.0);
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    display:flex;
    align-items:center;
    justify-content: center;
    z-index: var(--modal-z-index);
  }
  .react-modal-content {
    min-width: 400px;
    max-width: fit-content;
    background:rgba(240,240,240,.8);
    padding: 3rem;
    position: absolute;
    right: 0;
    top: 0;
    min-height: 500px;
    border-radius: 0.25rem;
  }
  .react-modal-close {
    width: 30px;
    position:absolute;
    right: 1.5rem;
    top: 1.5rem;
    border: 0;
    background: transparent;
    opacity: 0.5;
    transition: opacity 0.2s;
    &:hover {
      opacity: 1;
    }
  }

  .ReactModal__Overlay {
    opacity: 1;
    transform: translateX(500px);
    transition: all 200ms ease-in-out;
  }

  .ReactModal__Overlay--after-open {
    opacity: 1;
    transform: translateX(0px);
  }

  .ReactModal__Overlay--before-close {
    opacity: 1;
    transform: translateX(500px);
  }
  
`;
