import { useState } from 'react';
import { Screen, ScreenHeader } from '../common/Container';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import styled from 'styled-components';
import { IoHelpCircleOutline } from 'react-icons/io5';

const GuessContent = styled.div`
  margin: 20px 0;
`;

const ImpostorInfo = styled.div`
  background: rgba(239, 68, 68, 0.2);
  padding: 25px;
  border-radius: 8px;
  margin-bottom: 30px;
  border: 2px solid ${({ theme }) => theme.colors.danger};

  p:first-child {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.colors.danger};
  }
`;

const GuessInstruction = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
`;

const GuessInputSection = styled.div`
  margin: 20px 0;

  input {
    margin-bottom: 15px;
    text-align: center;
  }
`;

interface ImpostorGuessScreenProps {
  game: any;
}

const ImpostorGuessScreen = ({ game }: ImpostorGuessScreenProps) => {
  const [guess, setGuess] = useState('');

  const handleGuess = () => {
    game.checkImpostorGuess(guess);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGuess();
    }
  };

  return (
    <Screen
      key="impostor-guess"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
    >
      <ScreenHeader>
        <h2>
          <IoHelpCircleOutline style={{ verticalAlign: 'middle', marginRight: '8px' }} />
          Última Oportunidad
        </h2>
        <p>El impostor puede intentar adivinar la palabra</p>
      </ScreenHeader>

      <GuessContent>
        <ImpostorInfo>
          <p>Jugador {game.impostorIndex + 1} eres el impostor</p>
          <GuessInstruction>Intenta adivinar la palabra de los demás jugadores</GuessInstruction>
        </ImpostorInfo>

        <GuessInputSection>
          <Input
            type="text"
            placeholder="Escribe tu respuesta..."
            maxLength={30}
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button variant="primary" fullWidth onClick={handleGuess}>
            Adivinar
          </Button>
        </GuessInputSection>

        <Button variant="secondary" fullWidth onClick={game.impostorGiveUp}>
          Rendirse
        </Button>
      </GuessContent>
    </Screen>
  );
};

export default ImpostorGuessScreen;
