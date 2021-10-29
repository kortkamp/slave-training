import { Container } from './styles';

interface ISLiderProps {
  name:string;
  value:number;
  // eslint-disable-next-line no-unused-vars
  setValue:(value:number) => void;
}

const Slider = ({ name, value, setValue }:ISLiderProps):JSX.Element => (
  <Container>
    <span>{name}</span>
    <div>
      <span>{Math.round(value)}</span>
      <input
        type="range"
        min="0"
        max="120"
        step="0.5"
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
      />

    </div>
  </Container>
);

export default Slider;
