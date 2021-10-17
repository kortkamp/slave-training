/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-prop-types */
import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { Container } from './styles';

import toolImg from '../../assets/fgimage/Hx1/tools/prone_plug.png';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { useSlave } from '../../hooks/useSlave';

interface IDraggableToolProps {
  initialPosition: {
    x: number, y:number
  };
  limit: number;
}

const PenetratingTool = ({ initialPosition, limit }:IDraggableToolProps):JSX.Element => {
  const { scale } = useWindowDimensions();
  const ref = useRef<HTMLImageElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });

  const [silhouetteMap, setSilhouetteMap] = useState<number[]>([]);

  const { penetrateAss } = useSlave();

  function generateSilhouetteMap() {
    const map = [
      [39, 0], [31, 4], [26, 9], [19, 19], [14, 28], [10, 38],
      [9, 48], [9, 62], [18, 74], [28, 81], [28, 108],
    ];

    const centerX = map[0][0];

    const expandedMap = [0];
    let lastPoint = map[0];
    map.forEach((point) => {
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
    setSilhouetteMap(expandedMap);
    console.log();
  }

  useEffect(() => {
    generateSilhouetteMap();
  }, []);

  function penetrate(depth:number) {
    let stretch = 0;
    if (depth <= silhouetteMap.length) {
      stretch = silhouetteMap[Math.round(depth)];
    }
    console.log(`penetrate:${depth} stretch:${stretch}`);
    penetrateAss({ depth, stretch });
  }

  function onMouseMove(e:any) {
    if (!isDragging) return;

    if (ref.current) {
      const newPosition = {
        x: pos.x,
        y: ref.current.offsetTop + e.movementY / scale,
      };
      if (newPosition.y > limit) {
        newPosition.y = limit;
      }
      if (newPosition.y < -limit) {
        newPosition.y = -limit;
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
      console.log(ref.current.width);
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
      {/* <img
        src={toolImg}
        alt=""
        style={{
          zIndex: 10050,
          position: 'absolute',
          left: pos.x,
          top: pos.y,
          touchAction: 'none',
        }}
      /> */}
      {/* <div className="pointZeroMarker" /> */}
    </Container>
  );
};

export default PenetratingTool;
