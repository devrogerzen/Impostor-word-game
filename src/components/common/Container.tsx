import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  width: 100%;
  max-width: 540px;
  min-height: 600px;
`;

export const Screen = styled(motion.div)`
  background: ${({ theme }) => theme.colors.bgCard};
  border-radius: ${({ theme }) => theme.borderRadiusLg};
  box-shadow: ${({ theme }) => theme.shadowLg};
  padding: 30px;
  border: 4px solid ${({ theme }) => theme.colors.bgMedium};

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

export const ScreenHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 4px solid ${({ theme }) => theme.colors.primary};

  h2 {
    font-size: 2rem;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 1rem;
  }
`;

export const GameInfo = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 600;
`;
