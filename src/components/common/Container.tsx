import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  width: 100%;
  max-width: 500px;
  min-height: 600px;
`;

export const Screen = styled(motion.div)`
  background: ${({ theme }) => theme.colors.bgLight};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 30px;

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

export const ScreenHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid rgba(99, 102, 241, 0.3);

  h2 {
    font-size: 1.8rem;
    margin-bottom: 8px;
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const GameInfo = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;
