import { useAss } from '../../hooks/useAss';
import { useSlave } from '../../hooks/useSlave';
import StatsBar from './StatsBar';
import StatsTable from './StatsTable';
import { Container, Table } from './styles';

const Stats = ():JSX.Element => {
  const { preference, resistence } = useSlave();
  const { getStats } = useAss();

  return (
    <Container>
      <StatsTable name="preference" stat={preference} />
      <StatsTable name="resistence" stat={resistence} />
      <Table>
        <div>
          <p>ass</p>
        </div>
        <div>
          <StatsBar name="max stretch" value={getStats().maxStretch} />
          <StatsBar name="max enema" value={getStats().enemaCapacity} />
        </div>
      </Table>
    </Container>
  );
};

export default Stats;
