import styled from 'styled-components';

export const Container = styled.div`

  position:absolute;
  top:0;
  right:0;
  right:0px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding:10px;
  background: rgba(200,200,200,0.5);
  border-radius: 20px;
  /* z-index: var(--tool-box-z-index); */

  button {
    & > img {
      height:80px;
      position:unset;
    }
    position:unset;
    border: 0;
    filter:  opacity(0.4);
    background: transparent;
    transition: filter 0.2s;
    &:hover {
      filter:  opacity(1.0);
    }
  }
`;
