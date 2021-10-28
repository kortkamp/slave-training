import Modal from 'react-modal';
import { Container } from './styles';
import closeImg from '../../assets/right-arrow.svg';
import { useSlave } from '../../hooks/useSlave';

interface IToolsModalProps {
  isOpen: boolean;
  onRequestClose:() => void;
}

const SlaveModal = ({ isOpen, onRequestClose }: IToolsModalProps):JSX.Element => {
  const { sleep } = useSlave();
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
        <span className="title">SLAVE</span>
        <div className="content">
          <button type="button" onClick={() => sleep()}>Order to Sleep</button>
          <button type="button">Clear Slave Data</button>

        </div>
      </Container>
    </Modal>

  );
};

export default SlaveModal;
