import { useState } from 'react';
import { Screen, ScreenHeader, GameInfo } from '../common/Container';
import { Button } from '../common/Button';
import { Input, InputGroup } from '../common/Input';
import styled from 'styled-components';
import { IoDiceOutline, IoPeopleOutline } from 'react-icons/io5';
import { BiMessageDetail } from 'react-icons/bi';
import { showAlert } from '../../utils/sweetAlert';

const GameContent = styled.div`
  margin-bottom: 20px;
`;

const CurrentTurn = styled.div`
  background: rgba(99, 102, 241, 0.2);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 25px;
  border: 2px solid ${({ theme }) => theme.colors.primary};

  p:first-child {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 8px;
  }
`;

const TurnInstruction = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
`;

const CluesSection = styled.div`
  margin: 25px 0;

  h3 {
    margin-bottom: 15px;
    color: ${({ theme }) => theme.colors.primary};
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const CluesList = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 15px;
  max-height: 250px;
  overflow-y: auto;
`;

const ClueItem = styled.div`
  background: rgba(99, 102, 241, 0.1);
  padding: 12px 15px;
  border-radius: 6px;
  margin-bottom: 10px;
  border-left: 3px solid ${({ theme }) => theme.colors.primary};

  strong {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NoClues = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 20px;
`;

interface GameScreenProps {
  game: any;
}

const GameScreen = ({ game }: GameScreenProps) => {
  const [clueText, setClueText] = useState('');
  const currentPlayerIndex = game.currentPlayerIndex % game.numPlayers;
  const currentPlayer = game.players[currentPlayerIndex];

  const handleAddClue = () => {
    if (clueText.trim()) {
      game.addClue(clueText);
      setClueText('');
      showAlert.success('¡Pista agregada correctamente!', '✅ Pista Guardada');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddClue();
    }
  };

  return (
    <Screen
      key="game"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <ScreenHeader>
        <h2>
          <IoDiceOutline style={{ verticalAlign: 'middle', marginRight: '8px' }} />
          Dando Pistas
        </h2>
        <GameInfo>
          <span>
            <IoPeopleOutline style={{ verticalAlign: 'middle' }} /> {game.numPlayers} jugadores
          </span>
        </GameInfo>
      </ScreenHeader>

      <GameContent>
        <CurrentTurn>
          <p>Turno de {currentPlayer.name}</p>
          <TurnInstruction>Da una pista sobre tu palabra</TurnInstruction>
        </CurrentTurn>

        <CluesSection>
          <h3>
            <BiMessageDetail /> Pistas dadas:
          </h3>
          <CluesList>
            {game.clues.length === 0 ? (
              <NoClues>Aún no hay pistas...</NoClues>
            ) : (
              game.clues.map((clue: any, index: number) => (
                <ClueItem key={index}>
                  <strong>{clue.playerName}:</strong> {clue.text}
                </ClueItem>
              ))
            )}
          </CluesList>
        </CluesSection>

        <InputGroup>
          <Input
            type="text"
            placeholder="Escribe tu pista aquí..."
            maxLength={50}
            value={clueText}
            onChange={(e) => setClueText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button variant="primary" onClick={handleAddClue}>
            Agregar Pista
          </Button>
        </InputGroup>
      </GameContent>

      <Button
        variant="vote"
        fullWidth
        onClick={() => game.showScreen('voting')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Iniciar Votación
      </Button>
    </Screen>
  );
};

export default GameScreen;
