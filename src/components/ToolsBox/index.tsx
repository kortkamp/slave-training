import { ReactNode, useState } from 'react';
import { Container } from './styles';

import toolImg from '../../assets/tools.svg';
import homeImg from '../../assets/home.svg';
import settingsImg from '../../assets/settings.svg';
import slaveImg from '../../assets/slave.svg';
import medicineImg from '../../assets/medicine.svg';
import ToolsModal from '../ToolsModal';
import LocationsModal from '../LocationsModal';

interface IToolBoxProps {
  // eslint-disable-next-line react/require-default-props
  children?: ReactNode|undefined;
}

const ToolsBox = ({ children = undefined }:IToolBoxProps):JSX.Element => {
  const [isToolsModalOpen, setIsToolsModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationsModalOpen] = useState(false);

  return (
    <Container>
      {children}
      <button type="button" onClick={() => setIsLocationsModalOpen(true)}>
        <img src={homeImg} alt="Locations" />
      </button>
      <button type="button" onClick={() => setIsToolsModalOpen(true)}>
        <img src={toolImg} alt="Tool" />
      </button>
      <button type="button">
        <img src={slaveImg} alt="Slave" />
      </button>
      <button type="button">
        <img src={medicineImg} alt="Medicine" />
      </button>
      <button type="button">
        <img src={settingsImg} alt="Settings" />
      </button>
      <ToolsModal
        isOpen={isToolsModalOpen}
        onRequestClose={() => setIsToolsModalOpen(false)}

      />
      <LocationsModal
        isOpen={isLocationModalOpen}
        onRequestClose={() => setIsLocationsModalOpen(false)}
      />
    </Container>
  );
};

export default ToolsBox;
