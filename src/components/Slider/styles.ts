import styled from 'styled-components';

export const Container = styled.div`
  input {
    -webkit-appearance: none;  /* Override default CSS styles */
    appearance: none;
    width: 100%; /* Full-width */
    height: 25px; /* Specified height */
    background: #444; /* Grey background */
    border-radius: 10px;
    outline: none; /* Remove outline */
    opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: .2s; /* 0.2 seconds transition on hover */
    transition: opacity .2s;
  
  
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
