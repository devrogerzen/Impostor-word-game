import { Screen, ScreenHeader } from '../common/Container';
import { Button } from '../common/Button';
import styled from 'styled-components';
import { IoCheckboxOutline } from 'react-icons/io5';

const VotingContent = styled.div`
  margin: 20px 0;
`;

const PlayersVoteList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PlayerVoteItem = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ selected }) => (selected ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.1)')};
  padding: 15px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  border: 2px solid ${({ selected, theme }) => (selected ? theme.colors.primary : 'transparent')};
  box-shadow: ${({ selected }) => (selected ? '0 0 15px rgba(99, 102, 241, 0.4)' : 'none')};

  &:hover {
    background: rgba(99, 102, 241, 0.2);
    transform: translateX(5px);
  }

  .player-name {
    font-size: 1.1rem;
    font-weight: 600;
  }

  .vote-icon {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    padding: 8px;
    border-radius: 50%;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

interface VotingScreenProps {
  game: any;
}

const VotingScreen = ({ game }: VotingScreenProps) => {
  return (
    <Screen
      key="voting"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ScreenHeader>
        <h2>
          <IoCheckboxOutline style={{ verticalAlign: 'middle', marginRight: '8px' }} />
          Votación
        </h2>
        <p>¿Quién creen que es el impostor?</p>
      </ScreenHeader>

      <VotingContent>
        <PlayersVoteList>
          {game.players.map((player: any, index: number) => (
            <PlayerVoteItem
              key={index}
              selected={game.selectedVote === index}
              onClick={() => game.selectVote(index)}
            >
              <span className="player-name">{player.name}</span>
              {game.selectedVote === index && (
                <span className="vote-icon">
                  <IoCheckboxOutline />
                </span>
              )}
            </PlayerVoteItem>
          ))}
        </PlayersVoteList>
      </VotingContent>

      <Button
        variant="primary"
        fullWidth
        onClick={game.tallyVotes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Ver Resultados
      </Button>
    </Screen>
  );
};

export default VotingScreen;
