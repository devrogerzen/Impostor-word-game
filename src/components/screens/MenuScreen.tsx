import { Screen } from '../common/Container';
import { Button } from '../common/Button';
import styled from 'styled-components';
import { FaMask } from 'react-icons/fa';
import { IoBookOutline } from 'react-icons/io5';

const Logo = styled.div`
  text-align: center;
  margin-bottom: 50px;

  h1 {
    font-size: 3rem;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 4px 4px 0 ${({ theme }) => theme.colors.primaryDark};
  }

  p {
    color: ${({ theme }) => theme.colors.accent};
    font-size: 1.1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 3px;
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 2.2rem;
    }

    p {
      font-size: 0.9rem;
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
        <p>¿Confías en tus amigos? Piénsalo dos veces</p>
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
