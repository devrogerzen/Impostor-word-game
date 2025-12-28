import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
  pointer-events: none;
`;

const ParallaxLayer = styled(motion.div)<{ speed: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const FloatingShape = styled(motion.div)<{ size: number; color: string }>`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background: ${({ color }) => color};
  filter: blur(60px);
  opacity: 0.15;
`;

const ParallaxBackground = () => {
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX / window.innerWidth - 0.5;
      mouseY.current = e.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <BackgroundContainer>
      {/* Layer 1 - Slowest */}
      <ParallaxLayer
        speed={0.2}
        animate={{
          x: mouseX.current * 20,
          y: mouseY.current * 20,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
      >
        <FloatingShape
          size={400}
          color="#6366f1"
          style={{ top: '10%', left: '10%' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <FloatingShape
          size={300}
          color="#ec4899"
          style={{ bottom: '20%', right: '15%' }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </ParallaxLayer>

      {/* Layer 2 - Medium */}
      <ParallaxLayer
        speed={0.4}
        animate={{
          x: mouseX.current * 40,
          y: mouseY.current * 40,
        }}
        transition={{ type: 'spring', stiffness: 60, damping: 30 }}
      >
        <FloatingShape
          size={250}
          color="#8b5cf6"
          style={{ top: '40%', right: '20%' }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.2, 0.15],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <FloatingShape
          size={350}
          color="#3b82f6"
          style={{ bottom: '10%', left: '20%' }}
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.1, 0.18, 0.1],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </ParallaxLayer>

      {/* Layer 3 - Fastest */}
      <ParallaxLayer
        speed={0.6}
        animate={{
          x: mouseX.current * 60,
          y: mouseY.current * 60,
        }}
        transition={{ type: 'spring', stiffness: 70, damping: 30 }}
      >
        <FloatingShape
          size={200}
          color="#a855f7"
          style={{ top: '60%', left: '40%' }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.12, 0.18, 0.12],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        <FloatingShape
          size={180}
          color="#f43f5e"
          style={{ top: '25%', right: '35%' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.16, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />
      </ParallaxLayer>
    </BackgroundContainer>
  );
};

export default ParallaxBackground;
