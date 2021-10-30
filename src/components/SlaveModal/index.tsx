import Modal from 'react-modal';
import { Container } from './styles';
import closeImg from '../../assets/right-arrow.svg';
import Stats from '../Stats';

interface IToolsModalProps {
  isOpen: boolean;
  onRequestClose:() => void;
}

const SlaveModal = ({ isOpen, onRequestClose }: IToolsModalProps):JSX.Element => (
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
      <span className="title">SLAVE STATS</span>
      <div className="content">

        <Stats />

      </div>
    </Container>
  </Modal>

);

export default SlaveModal;
