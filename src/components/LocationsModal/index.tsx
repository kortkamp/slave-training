import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import { Container } from './styles';
import closeImg from '../../assets/close.svg';

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
        </div>
      </Container>
    </Modal>

  );
};

export default LocationsModal;
