import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { Container } from './styles';

import toolImg from '../../assets/fgimage/Hx1/tools/plug.png';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';

const DraggableTool = ():JSX.Element => {
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLImageElement>(null);
  const { scale } = useWindowDimensions();

  function onMouseMove(e:any) {
    if (!isDragging) return;

    if (ref.current) {
      setPos({
        x: ref.current.offsetLeft + e.movementX / scale,
        y: ref.current.offsetTop + e.movementY / scale,
      });
    }
    e.stopPropagation();
    e.preventDefault();
  }

  function onMouseUp(e:any) {
    setIsDragging(false);
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
    <Container>
      <img
        ref={ref}
        src={toolImg}
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

export default DraggableTool;
