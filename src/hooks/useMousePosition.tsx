import { useEffect, useState } from 'react';
import { useWindowDimensions } from './useWindowDimensions';

export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mouseDown, setMouseDown] = useState(false);

  const { scale } = useWindowDimensions();

  useEffect(() => {
    const setFromEvent = (e:MouseEvent) => setPosition({
      x: e.clientX / scale,
      y: e.clientY / scale,
    });
    window.addEventListener('mousemove', setFromEvent);
    window.addEventListener('mousedown', () => setMouseDown(true));
    window.addEventListener('mouseup', () => setMouseDown(false));

    return () => {
      window.removeEventListener('mousemove', setFromEvent);
      window.removeEventListener('mousedown', () => setMouseDown(true));
      window.removeEventListener('mouseup', () => setMouseDown(false));
    };
  }, [scale]);

  return { mousePosition: position, mouseDown };
};
