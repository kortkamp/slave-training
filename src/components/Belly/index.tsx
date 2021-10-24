import belly1 from '../../assets/fgimage/Hx1/belly/belly1.png';
import belly2 from '../../assets/fgimage/Hx1/belly/belly2.png';
import belly3 from '../../assets/fgimage/Hx1/belly/belly3.png';
import belly4 from '../../assets/fgimage/Hx1/belly/belly4.png';
import belly5 from '../../assets/fgimage/Hx1/belly/belly5.png';
import belly6 from '../../assets/fgimage/Hx1/belly/belly6.png';
import { useAss } from '../../hooks/useAss';

import { Container } from './styles';

const bellyImages = [
  '',
  belly1,
  belly2,
  belly3,
  belly4,
  belly5,
  belly6,
];

const Belly = ():JSX.Element => {
  const { enemaLevel } = useAss();
  let imageIndex = enemaLevel;
  if (imageIndex >= bellyImages.length) {
    imageIndex = bellyImages.length - 1;
  }
  return (
    <Container>
      <img src={bellyImages[Math.floor(imageIndex)]} alt="" style={{ zIndex: 1012 }} />
    </Container>
  );
};

export default Belly;
