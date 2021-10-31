import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import { Container } from './styles';
import closeImg from '../../assets/right-arrow.svg';

interface IToolsModalProps {
  isOpen: boolean;
  onRequestClose:() => void;
}

const LocationsModal = ({ isOpen, onRequestClose }: IToolsModalProps):JSX.Element => {
  const history = useHistory();
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Close modal" />
      </button>
      <Container>
        <span className="title">LOCATIONS</span>
        <div className="content">
          <button type="button" onClick={() => history.push('/')}>Training Room</button>
          <button type="button" onClick={() => history.push('/hang')}>Hanging Room</button>
          <button type="button" onClick={() => history.push('/kitchen')}>Kitchen</button>
          <button type="button" onClick={() => history.push('/bedroom')}>Bedroom</button>
          <button type="button" onClick={() => history.push('/restroom')}>Restroom</button>
          <button type="button" onClick={() => history.push('/street')}>Streets</button>
        </div>
      </Container>
    </Modal>

  );
};

export default LocationsModal;
