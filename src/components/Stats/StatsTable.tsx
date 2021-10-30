import { ISlaveStatus } from '../../interfaces';
import StatsBar from './StatsBar';
import { Table } from './styles';

interface ITableProps {
  name: string;
  stat: ISlaveStatus;
}

const StatsTable = ({ name, stat }:ITableProps):JSX.Element => (
  <Table>
    <div>
      <p>{name}</p>
    </div>
    <div>
      <StatsBar name="lust" value={stat.lust} />
      <StatsBar name="pain" value={stat.pain} />
      <StatsBar name="fear" value={stat.fear} />
      <StatsBar name="energy" value={stat.energy} />
      <StatsBar name="nutrition" value={stat.nutrition} />
      <StatsBar name="oxygen" value={stat.oxygen} />
      <StatsBar name="health" value={stat.health} />
    </div>
  </Table>

);

export default StatsTable;
