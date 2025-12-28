import { Screen } from '../common/Container';
import { Button, ButtonGroup } from '../common/Button';
import styled from 'styled-components';
import { IoTrophyOutline, IoPlayOutline, IoHomeOutline } from 'react-icons/io5';

const FinalContent = styled.div`
  text-align: center;
`;

const ResultBox = styled.div<{ variant: 'success' | 'danger' }>`
  background: rgba(99, 102, 241, 0.1);
  padding: 30px;
  border-radius: ${({ theme }) => theme.borderRadius};
  margin: 20px 0;
  border: 2px solid
    ${({ variant, theme }) => (variant === 'success' ? theme.colors.success : theme.colors.danger)};
  background: ${({ variant }) =>
    variant === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'};

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

const RevealSection = styled.div`
  margin-top: 30px;
  background: rgba(99, 102, 241, 0.1);
  padding: 25px;
  border-radius: ${({ theme }) => theme.borderRadius};

  h3 {
    margin-bottom: 20px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const RoleRevealItem = styled.div<{ isImpostor: boolean }>`
  background: rgba(0, 0, 0, 0.2);
  padding: 12px 15px;
  border-radius: 6px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 4px solid ${({ isImpostor, theme }) => (isImpostor ? theme.colors.danger : theme.colors.success)};

  .player-name {
    font-weight: 600;
  }

  small {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const RoleBadge = styled.span<{ isImpostor: boolean }>`
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
  background: ${({ isImpostor, theme }) => (isImpostor ? theme.colors.danger : theme.colors.success)};
  color: white;
`;

interface FinalScreenProps {
  game: any;
}

const FinalScreen = ({ game }: FinalScreenProps) => {
  const winner = game.votes.winner;
  const impostorCount = game.players.filter((p: any) => p.isImpostor).length;

  return (
    <Screen
      key="final"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
    >
      <FinalContent>
        {winner === 'impostor' ? (
          <ResultBox variant="danger">
            <ResultIcon>😈</ResultIcon>
            <h3>¡Gana{impostorCount > 1 ? 'n' : ''} {impostorCount > 1 ? 'los Impostores' : 'el Impostor'}!</h3>
            <p>
              {impostorCount > 1 ? 'Los impostores adivinaron' : 'El impostor adivinó'} la palabra
              correctamente
            </p>
            <p>
              La palabra era: <strong>{game.normalWord}</strong>
            </p>
          </ResultBox>
        ) : (
          <ResultBox variant="success">
            <ResultIcon>{game.votes.votedPlayer !== undefined ? '🎉' : '🎊'}</ResultIcon>
            <h3>¡Ganan los Jugadores!</h3>
            <p>
              {game.votes.votedPlayer !== undefined
                ? `Descubrieron a ${impostorCount > 1 ? 'todos los impostores' : 'el impostor'}`
                : `${impostorCount > 1 ? 'Los impostores no pudieron' : 'El impostor no pudo'} adivinar la palabra`}
            </p>
            {game.votes.votedPlayer === undefined && (
              <p>
                La palabra correcta era: <strong>{game.normalWord}</strong>
              </p>
            )}
          </ResultBox>
        )}

        <RevealSection>
          <h3>
            <IoTrophyOutline style={{ verticalAlign: 'middle', marginRight: '8px' }} />
            Revelación de Roles
          </h3>
          {game.players.map((player: any, index: number) => (
            <RoleRevealItem key={index} isImpostor={player.isImpostor}>
              <div>
                <span className="player-name">{player.name}</span>
                <small> - {player.word}</small>
              </div>
              <RoleBadge isImpostor={player.isImpostor}>
                {player.isImpostor ? '😈 Impostor' : '✅ Normal'}
              </RoleBadge>
            </RoleRevealItem>
          ))}
        </RevealSection>

        <ButtonGroup>
          <Button
            variant="primary"
            onClick={game.newGame}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <IoPlayOutline style={{ marginRight: '8px' }} />
            Nueva Partida
          </Button>
          <Button
            variant="secondary"
            onClick={game.resetToMenu}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <IoHomeOutline style={{ marginRight: '8px' }} />
            Menú Principal
          </Button>
        </ButtonGroup>
      </FinalContent>
    </Screen>
  );
};

export default FinalScreen;
