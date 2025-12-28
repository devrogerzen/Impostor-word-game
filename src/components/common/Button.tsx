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
        color: white;
        border: 3px solid ${({ theme }) => theme.colors.primary};
        box-shadow: 0 4px 0 ${({ theme }) => theme.colors.primaryDark};

        &:hover {
          background: ${({ theme }) => theme.colors.primaryDark};
          transform: translateY(-4px);
          box-shadow: 0 8px 0 ${({ theme }) => theme.colors.primaryDark},
                      0 12px 24px rgba(255, 107, 53, 0.3);
        }

        &:active {
          transform: translateY(2px);
          box-shadow: 0 2px 0 ${({ theme }) => theme.colors.primaryDark};
        }
      `;
    case 'secondary':
      return css`
        background: ${({ theme }) => theme.colors.secondary};
        color: white;
        border: 3px solid ${({ theme }) => theme.colors.secondary};
        box-shadow: 0 4px 0 #003666;

        &:hover {
          background: #00619e;
          transform: translateY(-4px);
          box-shadow: 0 8px 0 #003666,
                      0 12px 24px rgba(0, 78, 137, 0.3);
        }

        &:active {
          transform: translateY(2px);
          box-shadow: 0 2px 0 #003666;
        }
      `;
    case 'vote':
      return css`
        background: ${({ theme }) => theme.colors.accent};
        color: ${({ theme }) => theme.colors.textDark};
        border: 3px solid ${({ theme }) => theme.colors.accent};
        box-shadow: 0 4px 0 #d99a00;
        font-weight: 700;

        &:hover {
          background: #ffc933;
          transform: translateY(-4px);
          box-shadow: 0 8px 0 #d99a00,
                      0 12px 24px rgba(247, 184, 1, 0.3);
        }

        &:active {
          transform: translateY(2px);
          box-shadow: 0 2px 0 #d99a00;
        }
      `;
    case 'reveal':
      return css`
        background: ${({ theme }) => theme.colors.purple};
        color: white;
        border: 3px solid ${({ theme }) => theme.colors.purple};
        box-shadow: 0 6px 0 #5a0891;
        font-size: 1.3rem;
        padding: 20px;
        font-weight: 700;
        animation: pulse 2s infinite;

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 6px 0 #5a0891;
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 8px 0 #5a0891, 0 12px 32px rgba(114, 9, 183, 0.4);
          }
        }

        &:hover {
          background: #8f2dd1;
          animation: none;
        }

        &:active {
          transform: translateY(3px);
          box-shadow: 0 3px 0 #5a0891;
        }
      `;
    case 'danger':
      return css`
        background: ${({ theme }) => theme.colors.danger};
        color: white;
        border: 3px solid ${({ theme }) => theme.colors.danger};
        box-shadow: 0 4px 0 #d13555;

        &:hover {
          background: #f16581;
          transform: translateY(-4px);
          box-shadow: 0 8px 0 #d13555,
                      0 12px 24px rgba(239, 71, 111, 0.3);
        }

        &:active {
          transform: translateY(2px);
          box-shadow: 0 2px 0 #d13555;
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
