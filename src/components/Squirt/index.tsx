import { Container } from './styles';
import squirt1 from '../../assets/fgimage/Hx1/ef/squi1.png';
import squirt2 from '../../assets/fgimage/Hx1/ef/squi2.png';
import squirt3 from '../../assets/fgimage/Hx1/ef/squi3.png';

import { useSlave } from '../../hooks/useSlave';

const squirtImages = [
  '', squirt1, squirt2, squirt3,
];
const Squirt = ():JSX.Element => {
  const { squirtingLevel } = useSlave();
  const squirtIndex = squirtingLevel >= squirtImages.length
    ? squirtImages.length - 1
    : squirtingLevel;
  return (
    <Container>
      {squirtingLevel > 0
        && (
          <img
            className="squirt"
            src={squirtImages[squirtIndex]}
            alt=""
          />
        ) }
    </Container>
  );
};

export default Squirt;
