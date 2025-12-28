import { Screen, ScreenHeader } from '../common/Container';
import { Button, ButtonGroup } from '../common/Button';
import styled from 'styled-components';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdArrowBack } from 'react-icons/md';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { getCategories } from '../../data/words';
import type { Category } from '../../types/game.types';

const ConfigContent = styled.div`
  margin-bottom: 20px;
`;

const ConfigOption = styled.div`
  background: rgba(99, 102, 241, 0.1);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;

  label {
    display: block;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 15px;
    color: ${({ theme }) => theme.colors.primary};
  }

  small {
    display: block;
    color: ${({ theme }) => theme.colors.textMuted};
    margin-top: 10px;
    font-size: 0.85rem;
  }
`;

const NumberSelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin: 10px 0;

  button {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: ${({ theme }) => theme.transitions.default};
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: ${({ theme }) => theme.colors.primaryDark};
      transform: scale(1.1);
    }
  }

  span {
    font-size: 2rem;
    font-weight: bold;
    min-width: 60px;
    text-align: center;
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 10px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryBtn = styled.div<{ selected: boolean }>`
  padding: 15px;
  background: ${({ selected }) =>
    selected ? 'rgba(99, 102, 241, 0.3)' : 'rgba(148, 163, 184, 0.1)'};
  border: 2px solid ${({ selected, theme }) => (selected ? theme.colors.primary : 'transparent')};
  border-radius: 8px;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  text-align: center;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textColor};
  box-shadow: ${({ selected }) => (selected ? '0 0 15px rgba(99, 102, 241, 0.4)' : 'none')};

  &:hover {
    background: rgba(99, 102, 241, 0.2);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const categoryIcons: Record<Category, string> = {
  animales: '🐾',
  comida: '🍕',
  profesiones: '👔',
  deportes: '⚽',
  lugares: '🏛️',
  objetos: '🔧',
  transporte: '🚗',
  tecnologia: '💻',
  musica: '🎵',
  peliculas: '🎬',
  dragonball: '🐉',
};

interface ConfigScreenProps {
  game: any;
}

const ConfigScreen = ({ game }: ConfigScreenProps) => {
  const categories = getCategories();

  const formatCategoryName = (category: Category) => {
    const icon = categoryIcons[category] || '📁';
    const name = category.charAt(0).toUpperCase() + category.slice(1);
    return `${icon} ${name}`;
  };

  const getImpostorCount = (numPlayers: number): number => {
    if (numPlayers <= 4) return 1;
    if (numPlayers <= 6) return 2;
    if (numPlayers <= 8) return 2;
    return 3;
  };

  return (
    <Screen
      key="config"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <ScreenHeader>
        <h2>
          <IoSettingsOutline style={{ verticalAlign: 'middle', marginRight: '8px' }} />
          Configuración
        </h2>
      </ScreenHeader>

      <ConfigContent>
        <ConfigOption>
          <label>Número de Jugadores</label>
          <NumberSelector>
            <button onClick={() => game.changePlayerCount(-1)}>
              <AiOutlineMinus />
            </button>
            <span>{game.numPlayers}</span>
            <button onClick={() => game.changePlayerCount(1)}>
              <AiOutlinePlus />
            </button>
          </NumberSelector>
          <small>
            Mínimo 3, máximo 10 jugadores
            <br />
            🎭 Impostores: {getImpostorCount(game.numPlayers)}
          </small>
        </ConfigOption>

        <ConfigOption>
          <label>Categoría</label>
          <CategoryGrid>
            {categories.map((category) => (
              <CategoryBtn
                key={category}
                selected={game.selectedCategory === category}
                onClick={() => game.selectCategory(category)}
              >
                {formatCategoryName(category)}
              </CategoryBtn>
            ))}
          </CategoryGrid>
        </ConfigOption>
      </ConfigContent>

      <ButtonGroup>
        <Button
          variant="secondary"
          onClick={() => game.showScreen('menu')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <MdArrowBack style={{ marginRight: '8px' }} />
          Volver
        </Button>
        <Button
          variant="primary"
          onClick={game.startGame}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Iniciar Juego
        </Button>
      </ButtonGroup>
    </Screen>
  );
};

export default ConfigScreen;
