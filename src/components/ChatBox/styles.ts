import styled from 'styled-components';

export const Container = styled.div`

  position: absolute;
  left: 0;
  bottom: 0;
  width: 800px;
  height: 200px;
  /* border: 4px solid green; */
  border-radius: 30px;
  padding: 20px;
  background: rgba(200,200,200,0.3);
  font-size: 25px;
  font-weight: 600;
  .text {
    margin-bottom: 20px;
    animation: fadein 2s;
  }
  .options {
    animation: fadein 2s;
  }
  @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

`;

export const Option = styled.div`
  cursor: pointer;
  width: fit-content;
  margin-left: 20px;
  border-bottom: 1px solid transparent;
  &:hover {
    border-bottom: 1px solid black;
  }
  &:before {
    content:"• ";
  }
`;
