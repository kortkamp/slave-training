import { Container } from './styles';

interface ILiftControlProps {
  // eslint-disable-next-line no-unused-vars
  setValue:(value:number) => void;
}

const LiftControl = ({ setValue }:ILiftControlProps):JSX.Element => (
  <Container>
    <button type="button" onClick={() => setValue(300)}>
      <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <polyline fill="none" stroke="#000" strokeWidth="2" points="7.086 1.174 17.086 11.174 7.086 21.174" transform="rotate(-89 12.086 11.174)" />
      </svg>
    </button>
    <button type="button" onClick={() => setValue(-300)}>
      <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <polyline fill="none" stroke="#000" strokeWidth="2" points="7.086 1.174 17.086 11.174 7.086 21.174" transform="rotate(89 12.086 11.174)" />
      </svg>
    </button>
  </Container>
);

export default LiftControl;
