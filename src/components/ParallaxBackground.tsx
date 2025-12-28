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
  filter: blur(80px);
  opacity: 0.2;
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
          size={450}
          color="#FF6B35"
          style={{ top: '5%', left: '5%' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <FloatingShape
          size={350}
          color="#F7B801"
          style={{ bottom: '15%', right: '10%' }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.12, 0.22, 0.12],
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
          size={300}
          color="#7209B7"
          style={{ top: '35%', right: '15%' }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.18, 0.28, 0.18],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <FloatingShape
          size={400}
          color="#004E89"
          style={{ bottom: '5%', left: '15%' }}
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.15, 0.25, 0.15],
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
          size={250}
          color="#EF476F"
          style={{ top: '55%', left: '35%' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.16, 0.26, 0.16],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        <FloatingShape
          size={220}
          color="#06D6A0"
          style={{ top: '20%', right: '30%' }}
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.14, 0.24, 0.14],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />
      </ParallaxLayer>
    </BackgroundContainer>
  );
};

export default ParallaxBackground;
