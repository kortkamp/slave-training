/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Modal from 'react-modal';
import { useState } from 'react';
import { ActiveTools, Container } from './styles';
import closeImg from '../../assets/close.svg';

import { IToolData, Tools } from '../../tools';
import PenetratingTool from '../PenetratingTool';
import ElasticTool from '../ElasticTool';

interface IToolsModalProps {
  isOpen: boolean;
  onRequestClose:() => void;

}

const ToolsModal = ({
  // eslint-disable-next-line no-unused-vars
  isOpen, onRequestClose,
}: IToolsModalProps):JSX.Element => {
  const [selectedTools, setSelectedTools] = useState<IToolData[]>([]);

  // const [isSelectAreaOpen, setIsSelectAreaOpen] = useState(false);

  function removeTool(tool:IToolData) {
    const updatedTools = selectedTools.filter((item) => item.name !== tool.name);
    setSelectedTools(updatedTools);
  }
  function setTool(tool:IToolData) {
    if (selectedTools.find((item) => tool.name === item.name)) {
      removeTool(tool);
      return;
    }
    const updatedTools = [...selectedTools];
    updatedTools.push(tool);
    setSelectedTools(updatedTools);
  }

  function handleSelectTool(tool:IToolData) {
    setTool(tool);
    onRequestClose();
  }

  const bodyLocations = {
    ass: { x: 753, y: 647 },
    stomach: { x: 520, y: 350 },
    neck: { x: 360, y: 160 },
  };
  return (
    <>
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
                <img
                  className={selectedTools.find((item) => item.name === tool.name) ? 'selected' : ''}
                  src={tool.image}
                  alt=""
                />
              </div>
            ))}
          </div>
        </Container>
      </Modal>
      <ActiveTools style={{ zIndex: 1030 }}>
        {selectedTools.map((tool) => {
          if (tool?.type === 'elastic') {
            return (
              <ElasticTool
                key={tool.name}
                initialPosition={bodyLocations.stomach}
                tool={tool}
                action={() => {}}
              />
            );
          }
          return <></>;
        })}

      </ActiveTools>
      <ActiveTools style={{ zIndex: 1005 }}>
        {selectedTools.map((tool) => {
          if (tool?.type === 'penetrator') {
            return (
              <PenetratingTool
                key={tool.name}
                initialPosition={bodyLocations.ass}
                tool={tool}
              />

            );
          }
          return <></>;
        })}

      </ActiveTools>
    </>
  );
};

export default ToolsModal;
