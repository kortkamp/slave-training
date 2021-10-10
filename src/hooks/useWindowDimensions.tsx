import { useState, useEffect } from 'react';

const baseWidth = 1350;
const baseHeight = 900;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  const scaleX = width / baseWidth;
  const scaleY = height / baseHeight;
  return {
    width,
    height,
    scale: scaleX < scaleY ? scaleX : scaleY,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
