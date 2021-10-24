import { Container } from './styles';

import overAssStretch from '../../assets/fgimage/Hx1/body/ass_stretch_6o.png';
import behindAssStretch from '../../assets/fgimage/Hx1/body/ass_stretch_6b.png';
import overBelly from '../../assets/fgimage/Hx1/body/over_ass.png';
import bulge1 from '../../assets/fgimage/Hx1/body/bulge1.png';
import bulge2 from '../../assets/fgimage/Hx1/body/bulge2.png';

import enemaExpelImg from '../../assets/fgimage/Hx1/ef/enema_expel2.png';
import { useAss } from '../../hooks/useAss';

// eslint-disable-next-line no-unused-vars
const Ass = ():JSX.Element => {
  const { stretch, depth, isExpelingEnema } = useAss();
  const stretchScale = Math.round(stretch / 3.5) / 10;
  return (
    <Container>

      <img src={overBelly} alt="" style={{ zIndex: 1009 }} />
      {isExpelingEnema
      && <img src={enemaExpelImg} alt="" style={{ zIndex: 1009 }} />}
      <img src={behindAssStretch} alt="" style={{ zIndex: 1000, transformOrigin: '753px 647px', transform: `scale(${stretchScale})` }} />
      <img src={overAssStretch} alt="" style={{ zIndex: 1010, transformOrigin: '753px 647px', transform: `scale(${stretchScale})` }} />
      {depth > 200
      && <img src={bulge1} alt="" style={{ zIndex: 1010 }} />}
      {depth > 220
      && <img src={bulge2} alt="" style={{ zIndex: 1011 }} />}
    </Container>
  );
};

export default Ass;
