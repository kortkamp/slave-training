import styled from 'styled-components';

interface IPupilsProps {
  pos:number;
  radius:number;
}

interface IPupilsProps2 {
  eyelip:number;
  pos:number;
  radius:number;
}

export const Container = styled.div<IPupilsProps2>`
  z-index: 1021;
  position:absolute;
  width:130px;
  height:40px;
  left:308px;
  top:188px;
  display:flex;
  justify-content:space-between;
  /* border:1px solid white; */
  transform: rotate(-40deg);
  & > div {
    margin-top:${(props) => 5 + props.eyelip * 8}px;
    position:relative;
    /* border:1px solid green; */
    width:40px;
    overflow:hidden;
    img {
      top: -${(props) => props.pos + 6 + props.eyelip * 8}px;
      transform:scale(${(props) => props.radius});
    }
  }
  div.right {
    transform: rotate(${(props) => 10 - props.eyelip * 5}deg);
    img {
      //left: ${(props) => -props.pos / 10}px;
    }
  }
  div.left {
    transform: rotate(-${(props) => 10 - props.eyelip * 5}deg);
  }
`;

export const EyelipOpen = styled.div<IPupilsProps>`
  position:absolute;
  width:130px;
  height:40px;
  left:308px;
  top:188px;
  display:flex;
  justify-content:space-between;
  /* border:1px solid white; */
  transform: rotate(-40deg);
  & > div {
    margin-top:5px;
    position:relative;
    /* border:1px solid green; */
    width:40px;
    overflow:hidden;
    img {
      top: -${(props) => props.pos + 6}px;
      transform:scale(${(props) => props.radius});
    }
  }
  div.right {
    transform: rotate(10deg);
    img {
      //left: ${(props) => -props.pos / 10}px;
    }
  }
  div.left {
    transform: rotate(-10deg);
  }
`;

export const EyelipHalf = styled.div<IPupilsProps>`
  position:absolute;
  width:130px;
  height:40px;
  left:308px;
  top:188px;
  display:flex;
  justify-content:space-between;
  /* border:1px solid white; */
  transform: rotate(-40deg);
  & > div {
    margin-top:13px;
    position:relative;
    /* border:1px solid green; */
    width:40px;
    overflow:hidden;
    img {
      top: -${(props) => props.pos + 18}px;
      transform:scale(${(props) => props.radius});
    }
  }
  div.right {
    transform: rotate(5deg);
    img {
      //left: ${(props) => -props.pos / 10}px;
    }
  }
  div.left {
    transform: rotate(-5deg);
  }
  
`;
