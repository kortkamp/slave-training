import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 40px;

  font-size: 15px;

  color: white;

  & > span {
    transform: translateY(21px);
  }

  & > div {
    display: flex;
    span {
      transform: rotate(90deg);
      width: 40px;
      height: 20px;
      text-align: center;
      margin-right: 5px;
      background: rgba(4,4,4,0.5);
      border-radius: 10px;
    }
  }
  input {
    -webkit-appearance: none;  /* Override default CSS styles */
    appearance: none;
    width: 100%; /* Full-width */
    height: 25px; /* Specified height */
    background: #444; /* Grey background */
    border-radius: 10px;
    outline: none; /* Remove outline */
    opacity: 0.5; /* Set transparency (for mouse-over effects on hover) */
   
    /* transition: all ease-in-out 1.5s; */
  
  
    &::-webkit-slider-thumb {
      -webkit-appearance: none; /* Override default look */
      appearance: none;
      border-radius: 10px;
      width: 25px; /* Set a specific slider handle width */
      height: 25px; /* Slider handle height */
      background: #04AA6D; /* Green background */
      cursor: pointer; /* Cursor on hover */
    }

    &::-moz-range-thumb {
      border-radius: 10px;
      width: 25px; /* Set a specific slider handle width */
      height: 25px; /* Slider handle height */
      background: #04AA6D; /* Green background */
      cursor: pointer; /* Cursor on hover */
    }  
  }


`;
