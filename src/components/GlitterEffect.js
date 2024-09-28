import React, { useState, useEffect } from 'react';
import Sparkle from 'react-sparkle';

const GlitterEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <Sparkle
      color="random"
      count={30}
      minSize={7}
      maxSize={12}
      overflowPx={0}
      fadeOutSpeed={30}
      newSparkleOnFadeOut={true}
      flicker={false}
      pixelSize={1}
      style={{
        position: 'fixed',
        top: mousePosition.y,
        left: mousePosition.x,
        width: 100,
        height: 100,
        pointerEvents: 'none',
      }}
    />
  );
};

export default GlitterEffect;