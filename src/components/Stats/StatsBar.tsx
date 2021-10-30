import { Bar } from './styles';

interface IBarProps {
  name:string;
  value:number;
}

const StatsBar = ({ name, value }:IBarProps):JSX.Element => (

  <Bar>
    <span>
      {name}
      :
    </span>
    <span>
      {value.toFixed(3)}
    </span>
  </Bar>

);

export default StatsBar;
