import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  width: 100%;
  max-width: 540px;
  padding: 0 16px;

  @media (max-width: 768px) {
    padding: 0 12px;
  }

  @media (max-width: 480px) {
    padding: 0 8px;
  }
`;

export const Screen = styled(motion.div)`
  background: ${({ theme }) => theme.colors.bgCard};
  border-radius: ${({ theme }) => theme.borderRadiusLg};
  box-shadow: ${({ theme }) => theme.shadowLg};
  padding: 40px;
  border: 4px solid ${({ theme }) => theme.colors.bgMedium};

  @media (max-width: 768px) {
    padding: 30px;
    border-radius: ${({ theme }) => theme.borderRadius};
  }

  @media (max-width: 480px) {
    padding: 20px 16px;
    border-radius: ${({ theme }) => theme.borderRadiusSm};
    border-width: 3px;
  }

  @media (max-width: 360px) {
    padding: 16px 12px;
  }
`;

export const ScreenHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 4px solid ${({ theme }) => theme.colors.primary};

  @media (max-width: 480px) {
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom-width: 3px;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;

    @media (max-width: 768px) {
      font-size: 1.75rem;
    }

    @media (max-width: 480px) {
      font-size: 1.5rem;
      letter-spacing: 0.5px;
    }

    @media (max-width: 360px) {
      font-size: 1.3rem;
    }
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 1rem;

    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }
`;

export const GameInfo = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 0.85rem;
    gap: 8px;
  }
`;
