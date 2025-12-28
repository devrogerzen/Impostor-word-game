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

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;
