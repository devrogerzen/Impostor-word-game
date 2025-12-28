import styled from 'styled-components';

export const Input = styled.input`
  flex: 1;
  width: 100%;
  padding: 15px;
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(99, 102, 241, 0.3);
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.textColor};
  font-size: 1rem;
  min-height: 48px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 14px;
    min-height: 50px;
  }

  @media (max-width: 480px) {
    font-size: 16px; /* Prevents iOS zoom on focus */
    padding: 14px 12px;
    min-height: 52px;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    opacity: 0.7;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;

  @media (max-width: 768px) {
    gap: 10px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
`;
