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

const WordDisplay = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  padding: 25px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border-radius: 12px;
  margin: 20px 0;
  box-shadow: 0 5px 20px rgba(99, 102, 241, 0.5);

  @media (max-width: 480px) {
    font-size: 2rem;
  }
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
          <h3>Jugador {game.currentPlayerIndex + 1}</h3>
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
            <WordLabel>Tu palabra es:</WordLabel>
            <WordDisplay>{currentPlayer.word}</WordDisplay>
            <WordInstruction>¡Memorízala y no la digas en voz alta!</WordInstruction>
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
