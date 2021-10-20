/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Modal from 'react-modal';
import { Container } from './styles';
import closeImg from '../../assets/close.svg';

import { IToolData, Tools } from '../../tools';

interface IToolsModalProps {
  isOpen: boolean;
  onRequestClose:() => void;
  // eslint-disable-next-line no-unused-vars
  selectTool: (tool:IToolData)=>void;
}

const ToolsModal = ({ isOpen, onRequestClose, selectTool }: IToolsModalProps):JSX.Element => {
  function handleSelectTool(tool:IToolData) {
    selectTool(tool);
    onRequestClose();
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
        <span className="title">TOOLS</span>
        <div className="content">
          {Tools.map((tool) => (
            <div key={tool.name} onClick={() => { handleSelectTool(tool); }}>
              {/* <span>{tool.name}</span> */}
              <img src={tool.image} alt="" />
            </div>
          ))}
        </div>
      </Container>
    </Modal>

  );
};

export default ToolsModal;
