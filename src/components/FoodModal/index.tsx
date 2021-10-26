import Modal from 'react-modal';
import { Container } from './styles';
import closeImg from '../../assets/right-arrow.svg';

import breadImg from '../../assets/fgimage/o/food/bread.png';

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
          <button type="button" onClick={() => handleAddFood(1)}>
            <img src={breadImg} alt="" />
          </button>
        </div>
      </Container>
    </Modal>

  );
};

export default FoodModal;
