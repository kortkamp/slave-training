import { useEffect, useState } from 'react';
import { useWindowDimensions } from './useWindowDimensions';

export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const { scale } = useWindowDimensions();

  useEffect(() => {
    const setFromEvent = (e:MouseEvent) => setPosition({
      x: e.clientX / scale,
      y: e.clientY / scale,
    });
    window.addEventListener('mousemove', setFromEvent);

    return () => {
      window.removeEventListener('mousemove', setFromEvent);
    };
  }, [scale]);

  return position;
};
