import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'vote' | 'reveal' | 'danger';
  fullWidth?: boolean;
}

const getButtonStyles = (variant: ButtonProps['variant']) => {
  switch (variant) {
    case 'primary':
      return css`
        background: ${({ theme }) => theme.colors.primary};
        &:hover {
          background: ${({ theme }) => theme.colors.primaryDark};
          box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4);
        }
      `;
    case 'secondary':
      return css`
        background: ${({ theme }) => theme.colors.secondary};
        &:hover {
          background: #475569;
        }
      `;
    case 'vote':
      return css`
        background: ${({ theme }) => theme.colors.warning};
        &:hover {
          background: #d97706;
        }
      `;
    case 'reveal':
      return css`
        background: linear-gradient(135deg, #ec4899, #8b5cf6);
        font-size: 1.3rem;
        padding: 20px;
        animation: pulse 2s infinite;

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `;
    case 'danger':
      return css`
        background: ${({ theme }) => theme.colors.danger};
        &:hover {
          background: #dc2626;
        }
      `;
    default:
      return '';
  }
};

export const Button = styled(motion.button)<ButtonProps>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  padding: 15px 25px;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  color: white;
  position: relative;
  overflow: hidden;
  margin: 8px 0;

  ${({ variant = 'primary' }) => getButtonStyles(variant)}

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:active::before {
    width: 300px;
    height: 300px;
  }

  &:hover {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      transform: none;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;
