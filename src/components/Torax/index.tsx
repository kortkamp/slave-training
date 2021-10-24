import { useEffect, useState } from 'react';
import { Container } from './styles';

import toraxImg from '../../assets/fgimage/Hx1/body/torax.png';
import { useSlave } from '../../hooks/useSlave';

const Torax = ():JSX.Element => {
  const [breathInterval, setBreathInterval] = useState(3000);
  const [isInspiring, setIsInspiring] = useState(true);

  const { status } = useSlave();

  function doBreath() {
    // console.log('breath');
    let mostRecentBreathInterval = breathInterval;
    setBreathInterval((value) => {
      mostRecentBreathInterval = value;
      return (value);
    });

    setTimeout(() => {
      setIsInspiring((newPosition) => !newPosition);
      doBreath();
    }, mostRecentBreathInterval);
  }

  useEffect(() => {
    let newBreathInterval = 3000 - 20 * (status.lust > status.fear ? status.lust : status.fear);
    if (newBreathInterval < 400) {
      newBreathInterval = 400;
    }
    setBreathInterval(newBreathInterval);
  }, [status.lust, status.fear]);

  useEffect(() => {
    doBreath();
  }, []);

  // TODO improve performance to not render unnecessarily
  // TODO when choked till health zero torax dont stop

  return (
    <Container>
      <img
        src={toraxImg}
        alt=""
        style={
          {
            transform: `translate(-${isInspiring && status.oxygen > 0 ? 2 : 0}px,-${isInspiring && status.oxygen > 0 ? 3 : 0}px)`,
            transition: `transform ${breathInterval}ms ease-in-out`,
          }
        }
      />

    </Container>
  );
};

export default Torax;
