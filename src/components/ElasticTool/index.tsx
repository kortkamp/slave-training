import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { Container } from './styles';

import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { IToolData } from '../../tools';

interface IDraggableToolProps {
  initialPosition: {
    x: number, y:number
  };

  tool: IToolData;
  // eslint-disable-next-line no-unused-vars
  action: (value:number)=>void;
}

const ElasticTool = ({ initialPosition, tool, action }:IDraggableToolProps):JSX.Element => {
  const { scale } = useWindowDimensions();
  const ref = useRef<HTMLImageElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });

  function executeAction(value: number) {
    console.log(value);
    action(value);
  }

  function onMouseMove(e:any) {
    if (!isDragging) return;

    if (ref.current) {
      const newPosition = {
        x: pos.x,
        y: ref.current.offsetTop + e.movementY / scale,
      };
      if (newPosition.y > tool.depthLimit) {
        newPosition.y = tool.depthLimit;
      }
      if (newPosition.y < 0) {
        newPosition.y = 0;
      }

      setPos(newPosition);
    }
    e.stopPropagation();
    e.preventDefault();
  }

  function onMouseUp(e:any) {
    setIsDragging(false);
    setPos((currentPos) => {
      executeAction(currentPos.y / 5);
      return ({ x: currentPos.x, y: 0 });
    });

    e.stopPropagation();
    e.preventDefault();
  }

  function onMouseDown(e:any) {
    if (e.button !== 0) return;
    setIsDragging(true);

    e.stopPropagation();
    e.preventDefault();
  }

  // When the element mounts, attach an mousedown listener
  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('mousedown', onMouseDown);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('mousedown', onMouseDown);
      }
    };
  }, [ref.current]);

  useEffect(() => {
    if (ref.current) {
      setPos({
        x: 0 - ((ref.current.width) / 2),
        y: 0,
      });
    }
    return () => {

    };
  }, [ref.current?.width]);

  // Everytime the isDragging state changes, assign or remove
  // the corresponding mousemove and mouseup handlers
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mousemove', onMouseMove);
    } else {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }
    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [isDragging]);

  return (
    <Container
      style={{
        position: 'absolute',
        left: initialPosition.x,
        top: initialPosition.y,
      }}
    >
      <img
        className={isDragging ? '' : 'released'}
        ref={ref}
        src={tool.image}
        alt=""
        style={{
          position: 'absolute',
          left: pos.x,
          top: pos.y,
          touchAction: 'none',
        }}
      />
    </Container>
  );
};

export default ElasticTool;
