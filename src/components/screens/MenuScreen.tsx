import { Screen } from '../common/Container';
import { Button } from '../common/Button';
import styled from 'styled-components';
import { FaMask } from 'react-icons/fa';
import { IoBookOutline } from 'react-icons/io5';

const Logo = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    background: linear-gradient(135deg, #6366f1, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 2rem;
    }
  }
`;

const MenuButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

interface MenuScreenProps {
  game: any;
}

const MenuScreen = ({ game }: MenuScreenProps) => {
  return (
    <Screen
      key="menu"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Logo>
        <h1>
          <FaMask /> EL IMPOSTOR
        </h1>
        <p>Juego de deducción social</p>
      </Logo>
      <MenuButtons>
        <Button
          variant="primary"
          fullWidth
          onClick={() => game.showScreen('config')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Nueva Partida
        </Button>
        <Button
          variant="secondary"
          fullWidth
          onClick={() => game.showScreen('rules')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <IoBookOutline style={{ marginRight: '8px' }} />
          Reglas del Juego
        </Button>
      </MenuButtons>
    </Screen>
  );
};

export default MenuScreen;
