import { useState } from 'react';
import { Screen, ScreenHeader } from '../common/Container';
import { Button } from '../common/Button';
import styled from 'styled-components';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

const DistributionContent = styled.div`
  text-align: center;
`;

const PlayerInfo = styled.div`
  margin-bottom: 40px;

  h3 {
    font-size: 2rem;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const WordContainer = styled.div`
  background: rgba(99, 102, 241, 0.1);
  padding: 40px 20px;
  border-radius: ${({ theme }) => theme.borderRadius};
  margin: 20px 0;
`;

const WordLabel = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 15px;
`;

const WordDisplay = styled.div<{ isImpostor: boolean }>`
  font-size: 2.5rem;
  font-weight: bold;
  padding: 25px;
  background: ${({ isImpostor, theme }) =>
    isImpostor ? theme.colors.danger : theme.colors.success};
  color: white;
  border-radius: 12px;
  margin: 20px 0;
  box-shadow: ${({ isImpostor }) =>
    isImpostor ? '0 8px 0 #C23456, 0 12px 24px rgba(239, 71, 111, 0.4)' : '0 8px 0 #04A87D, 0 12px 24px rgba(6, 214, 160, 0.4)'};
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const RoleBadge = styled.div<{ isImpostor: boolean }>`
  font-size: 1.3rem;
  font-weight: 900;
  padding: 15px 25px;
  background: ${({ isImpostor, theme }) =>
    isImpostor ? theme.colors.danger : theme.colors.success};
  color: white;
  border-radius: 8px;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 3px;
  box-shadow: ${({ isImpostor }) =>
    isImpostor ? '0 4px 0 #C23456' : '0 4px 0 #04A87D'};
  display: inline-block;
`;

const WordInstruction = styled.p`
  color: ${({ theme }) => theme.colors.warning};
  font-weight: 600;
  margin: 15px 0;
`;

const HiddenMessage = styled.p`
  font-size: 1.1rem;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

interface DistributionScreenProps {
  game: any;
}

const DistributionScreen = ({ game }: DistributionScreenProps) => {
  const [isWordRevealed, setIsWordRevealed] = useState(false);
  const currentPlayer = game.players[game.currentPlayerIndex];

  const handleReveal = () => {
    setIsWordRevealed(true);
    game.revealWord();
  };

  const handleNext = () => {
    setIsWordRevealed(false);
    game.nextPlayer();
  };

  return (
    <Screen
      key="distribution"
      initial={{ opacity: 0, rotateY: -90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      exit={{ opacity: 0, rotateY: 90 }}
      transition={{ duration: 0.5 }}
    >
      <ScreenHeader>
        <h2>
          <IoEyeOutline style={{ verticalAlign: 'middle', marginRight: '8px' }} />
          Distribución de Palabras
        </h2>
      </ScreenHeader>

      <DistributionContent>
        <PlayerInfo>
          <h3>{currentPlayer.name}</h3>
          <p>Mira tu palabra y pasa el teléfono</p>
        </PlayerInfo>

        {!isWordRevealed ? (
          <WordContainer>
            <HiddenMessage>
              <IoEyeOffOutline style={{ fontSize: '2rem', display: 'block', margin: '0 auto 10px' }} />
              Toca para ver tu palabra
            </HiddenMessage>
            <Button variant="reveal" onClick={handleReveal} fullWidth>
              Ver Palabra
            </Button>
          </WordContainer>
        ) : (
          <WordContainer>
            <RoleBadge isImpostor={currentPlayer.isImpostor}>
              {currentPlayer.isImpostor ? '🎭 ¡ERES EL IMPOSTOR!' : '✅ ERES UN JUGADOR NORMAL'}
            </RoleBadge>
            <WordLabel>Tu palabra es:</WordLabel>
            <WordDisplay isImpostor={currentPlayer.isImpostor}>{currentPlayer.word}</WordDisplay>
            <WordInstruction>
              {currentPlayer.isImpostor
                ? '¡Actúa normal y no te delates!'
                : '¡Memorízala y descubre al impostor!'}
            </WordInstruction>
            <Button variant="primary" onClick={handleNext} fullWidth>
              Siguiente Jugador
            </Button>
          </WordContainer>
        )}
      </DistributionContent>
    </Screen>
  );
};

export default DistributionScreen;
