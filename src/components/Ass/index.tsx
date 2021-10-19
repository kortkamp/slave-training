import { Container } from './styles';

import overAssStretch from '../../assets/fgimage/Hx1/body/ass_stretch_6o.png';
import behindAssStretch from '../../assets/fgimage/Hx1/body/ass_stretch_6b.png';
import overBelly from '../../assets/fgimage/Hx1/body/over_ass.png';
import { useSlave } from '../../hooks/useSlave';

// eslint-disable-next-line no-unused-vars
const Ass = ():JSX.Element => {
  const { status } = useSlave();
  const stretchScale = Math.round(status.ass.stretch / 3.5) / 10;
  return (
    <Container>

      <img src={overBelly} alt="" style={{ zIndex: 1009 }} />
      <img src={behindAssStretch} alt="" style={{ zIndex: 1000, transformOrigin: '753px 647px', transform: `scale(${stretchScale})` }} />
      <img src={overAssStretch} alt="" style={{ zIndex: 1010, transformOrigin: '753px 647px', transform: `scale(${stretchScale})` }} />
    </Container>
  );
};

export default Ass;
