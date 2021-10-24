/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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

import syringeImgExt from '../../../assets/fgimage/Hx1/tools/syringe0.png';
import syringeImgInt from '../../../assets/fgimage/Hx1/tools/syringe2.png';

const SyringeData:IToolData = {
  name: 'syringe',
  image: '',
  area: 'ass',
  type: 'penetrator',
  depthLimit: 50,
  angle: -41,
  map: [
    [70, 0], [65, 2], [64, 47],
  ],
};

const Syringe = ():JSX.Element => {
  const { scale } = useWindowDimensions();
  const ref = useRef<HTMLImageElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isFilled, setIsFilled] = useState(true);
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });

  const { addEnema } = useAss();

  const [silhouetteMap, setSilhouetteMap] = useState<number[]>([]);

  const { setChokingLevel } = useSlave();
  const { penetrateAss } = useAss();

  function generateSilhouetteMap() {
    const expandedMap = [0];

    if (SyringeData.map.length > 0) {
      const centerX = SyringeData.map[0][0];

      let lastPoint = SyringeData.map[0];
      SyringeData.map.forEach((point) => {
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
    setChokingLevel(depth / SyringeData.depthLimit);
  }
  function penetrate(depth:number) {
    if (SyringeData.name === 'strangle') {
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
    console.log(`remove${SyringeData}`);
    penetrate(0);
  }

  function handleClick() {
    if (pos.y < 0) {
      if (isFilled) {
        addEnema(1);
      }
      setIsFilled(!isFilled);
    }
  }

  useEffect(() => {
    penetrate(0);
    generateSilhouetteMap();
  }, [SyringeData]);

  useEffect(() => {
    console.log('create');
    return () => { removeTool(); };
  }, []);

  const initialPosition = { x: 753, y: 647 };
  function onMouseMove(e:any) {
    if (!isDragging) return;

    if (ref.current) {
      const newPosition = {
        x: pos.x,
        y: ref.current.offsetTop + e.movementY / scale,
      };
      if (newPosition.y > SyringeData.depthLimit) {
        newPosition.y = SyringeData.depthLimit;
      }
      if (newPosition.y < -SyringeData.depthLimit) {
        newPosition.y = -SyringeData.depthLimit;
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
        transform: `rotate(${SyringeData.angle}deg)`,

      }}
    >
      <img
        onClick={() => handleClick()}
        className="internalSyringe"
        src={syringeImgInt}
        alt=""
        style={{
          position: 'absolute',
          left: pos.x,
          top: pos.y,
          transform: `translateY(${isFilled ? 160 : 0}px)`,
          transition: 'transform 0.3s ease-in-out',
        }}
      />
      <img
        ref={ref}
        src={syringeImgExt}
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

export default Syringe;
