/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-prop-types */
import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { Container } from './styles';

import { useWindowDimensions } from '../../../hooks/useWindowDimensions';
import { useSlave } from '../../../hooks/useSlave';
import { IToolData } from '../../../tools';
import { useAss } from '../../../hooks/useAss';

interface IDraggableToolProps {
  initialPosition: {
    x: number, y:number
  };

  tool: IToolData
}

const PenetratingTool = ({ initialPosition, tool }:IDraggableToolProps):JSX.Element => {
  const { scale } = useWindowDimensions();
  const ref = useRef<HTMLImageElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });

  const [silhouetteMap, setSilhouetteMap] = useState<number[]>([]);

  const { setChokingLevel } = useSlave();
  const { penetrateAss } = useAss();

  function generateSilhouetteMap() {
    const expandedMap = [0];

    if (tool.map.length > 0) {
      const centerX = tool.map[0][0];

      let lastPoint = tool.map[0];
      tool.map.forEach((point) => {
        if (point !== lastPoint) {
          const diff = [point[0] - lastPoint[0], point[1] - lastPoint[1]];
          const linear = diff[0] / diff[1];
          // eslint-disable-next-line no-plusplus
          for (let i = lastPoint[1] + 1; i <= point[1]; i++) {
            expandedMap[i] = centerX - ((i - lastPoint[1]) * linear + lastPoint[0]);
          }
          lastPoint = point;
        }
      });
    }
    setSilhouetteMap(expandedMap);
  }
  function strangle(depth:number) {
    setChokingLevel(depth / tool.depthLimit);
  }
  function penetrate(depth:number) {
    if (tool.name === 'strangle') {
      strangle(depth);
    } else {
      let stretch = 0;
      if (depth <= silhouetteMap.length) {
        stretch = silhouetteMap[Math.round(depth)];
      }
      if (stretch === undefined) {
        stretch = 0;
      }
      penetrateAss({ depth, stretch });
    }
  }

  function removeTool() {
    console.log(`remove${tool}`);
    penetrate(0);
  }

  useEffect(() => {
    penetrate(0);
    generateSilhouetteMap();
  }, [tool]);

  useEffect(() => {
    console.log('create');
    return () => { removeTool(); };
  }, []);

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
      if (newPosition.y < -tool.depthLimit) {
        newPosition.y = -tool.depthLimit;
      }

      penetrate(newPosition.y < 0 ? -newPosition.y : 0);

      setPos(newPosition);
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
        transform: `rotate(${tool.angle}deg)`,

      }}
    >
      <img
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

export default PenetratingTool;
