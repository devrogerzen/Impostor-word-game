import { Screen } from '../common/Container';
import styled from 'styled-components';

const ResultContent = styled.div`
  text-align: center;
`;

const ResultBox = styled.div<{ variant: 'success' | 'warning' | 'danger' }>`
  background: rgba(99, 102, 241, 0.1);
  padding: 30px;
  border-radius: ${({ theme }) => theme.borderRadius};
  margin: 20px 0;
  border: 2px solid
    ${({ variant, theme }) => {
      if (variant === 'success') return theme.colors.success;
      if (variant === 'warning') return theme.colors.warning;
      return theme.colors.danger;
    }};

  h3 {
    font-size: 1.8rem;
    margin-bottom: 15px;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  strong {
    color: ${({ theme }) => theme.colors.textColor};
  }
`;

const ResultIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
`;

interface VoteResultScreenProps {
  game: any;
}

const VoteResultScreen = ({ game }: VoteResultScreenProps) => {
  const votedPlayer = game.votes.votedPlayer;
  const wasImpostor = game.votes.wasImpostor;

  return (
    <Screen
      key="vote-result"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <ResultContent>
        {wasImpostor ? (
          <ResultBox variant="success">
            <ResultIcon>🎉</ResultIcon>
            <h3>¡Victoria de los Jugadores!</h3>
            <p>El Jugador {votedPlayer + 1} era el impostor</p>
            <p>
              Su palabra era: <strong>{game.players[votedPlayer].word}</strong>
            </p>
            <p>
              La palabra correcta era: <strong>{game.normalWord}</strong>
            </p>
          </ResultBox>
        ) : (
          <ResultBox variant="warning">
            <ResultIcon>😬</ResultIcon>
            <h3>¡No era el impostor!</h3>
            <p>El Jugador {votedPlayer + 1} NO era el impostor</p>
            <p>El impostor tiene una última oportunidad...</p>
          </ResultBox>
        )}
      </ResultContent>
    </Screen>
  );
};

export default VoteResultScreen;
