import Modal from 'react-modal';
import { Container } from './styles';
import closeImg from '../../assets/close.svg';

interface IToolsModalProps {
  isOpen: boolean;
  onRequestClose:() => void;
  // eslint-disable-next-line no-unused-vars
  addFood: (value:number) => void;
}

const FoodModal = ({ isOpen, onRequestClose, addFood }: IToolsModalProps):JSX.Element => {
  function handleAddFood(value:number) {
    addFood(value);
    console.log(value);
  }
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
        <span className="title">FOOD</span>
        <div className="content">
          <button type="button" onClick={() => handleAddFood(1)}>Bread</button>
        </div>
      </Container>
    </Modal>

  );
};

export default FoodModal;
