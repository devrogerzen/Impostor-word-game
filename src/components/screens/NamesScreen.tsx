import { useState } from 'react';
import { Screen, ScreenHeader } from '../common/Container';
import { Button, ButtonGroup } from '../common/Button';
import styled from 'styled-components';
import { IoPeopleOutline } from 'react-icons/io5';
import { MdArrowBack } from 'react-icons/md';
import { showAlert } from '../../utils/sweetAlert';

const NamesContent = styled.div`
  margin-bottom: 20px;
`;

const NamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin: 20px 0;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const PlayerInputGroup = styled.div`
  background: rgba(99, 102, 241, 0.1);
  padding: 15px;
  border-radius: 8px;

  label {
    display: block;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.colors.primary};
  }

  input {
    width: 100%;
    padding: 12px;
    background: rgba(0, 0, 0, 0.3);
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 8px;
    color: ${({ theme }) => theme.colors.textColor};
    font-size: 1rem;
    font-weight: 600;
    transition: ${({ theme }) => theme.transitions.default};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.accent};
      box-shadow: 0 0 15px rgba(247, 184, 1, 0.3);
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.textMuted};
      opacity: 0.5;
    }
  }
`;

const InfoBox = styled.div`
  background: rgba(247, 184, 1, 0.1);
  border: 2px solid ${({ theme }) => theme.colors.warning};
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;

  p {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.9rem;
    margin: 0;
  }
`;

interface NamesScreenProps {
  game: any;
}

const NamesScreen = ({ game }: NamesScreenProps) => {
  const [names, setNames] = useState<string[]>(
    Array(game.numPlayers).fill('').map((_, i) => `Jugador ${i + 1}`)
  );

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const handleContinue = () => {
    // Validate names
    const trimmedNames = names.map(name => name.trim());
    const hasEmptyNames = trimmedNames.some(name => name === '');

    if (hasEmptyNames) {
      showAlert.warning('Por favor ingresa un nombre para todos los jugadores');
      return;
    }

    game.setPlayerNames(trimmedNames);
    game.startGame();
  };

  return (
    <Screen
      key="names"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <ScreenHeader>
        <h2>
          <IoPeopleOutline style={{ verticalAlign: 'middle', marginRight: '8px' }} />
          Nombres de Jugadores
        </h2>
      </ScreenHeader>

      <NamesContent>
        <InfoBox>
          <p>
            Ingresa el nombre de cada jugador. Puedes usar apodos o números si prefieres.
          </p>
        </InfoBox>

        <NamesGrid>
          {Array.from({ length: game.numPlayers }).map((_, index) => (
            <PlayerInputGroup key={index}>
              <label>Jugador {index + 1}</label>
              <input
                type="text"
                value={names[index]}
                onChange={(e) => handleNameChange(index, e.target.value)}
                placeholder={`Jugador ${index + 1}`}
                maxLength={20}
              />
            </PlayerInputGroup>
          ))}
        </NamesGrid>
      </NamesContent>

      <ButtonGroup>
        <Button
          variant="secondary"
          onClick={() => game.showScreen('config')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <MdArrowBack style={{ marginRight: '8px' }} />
          Volver
        </Button>
        <Button
          variant="primary"
          onClick={handleContinue}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Continuar
        </Button>
      </ButtonGroup>
    </Screen>
  );
};

export default NamesScreen;
