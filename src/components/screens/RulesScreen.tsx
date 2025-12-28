import { Screen, ScreenHeader } from '../common/Container';
import { Button } from '../common/Button';
import styled from 'styled-components';
import { IoBookOutline, IoTrophyOutline, IoGameControllerOutline } from 'react-icons/io5';
import { MdArrowBack } from 'react-icons/md';

const RulesContent = styled.div`
  text-align: left;
  margin-bottom: 20px;
`;

const RuleSection = styled.div`
  background: rgba(99, 102, 241, 0.1);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border-left: 4px solid ${({ theme }) => theme.colors.primary};

  h3 {
    margin-bottom: 12px;
    color: ${({ theme }) => theme.colors.primary};
    display: flex;
    align-items: center;
    gap: 8px;
  }

  p {
    margin-bottom: 8px;
    line-height: 1.6;
  }

  ol {
    margin-left: 20px;
    line-height: 1.8;

    li {
      margin-bottom: 8px;
    }
  }
`;

interface RulesScreenProps {
  game: any;
}

const RulesScreen = ({ game }: RulesScreenProps) => {
  return (
    <Screen
      key="rules"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <ScreenHeader>
        <h2>
          <IoBookOutline style={{ verticalAlign: 'middle', marginRight: '8px' }} />
          Reglas del Juego
        </h2>
      </ScreenHeader>

      <RulesContent>
        <RuleSection>
          <h3>
            <IoGameControllerOutline /> Objetivo
          </h3>
          <p>
            <strong>Jugadores normales:</strong> Descubrir quién es el impostor
          </p>
          <p>
            <strong>El Impostor:</strong> No ser descubierto y adivinar la palabra de los demás
          </p>
        </RuleSection>

        <RuleSection>
          <h3>
            <IoGameControllerOutline /> Cómo se juega
          </h3>
          <ol>
            <li>Cada jugador ve su palabra (uno por uno)</li>
            <li>Los jugadores normales reciben la MISMA palabra</li>
            <li>El impostor recibe una palabra DIFERENTE pero relacionada</li>
            <li>Cada jugador da pistas sobre su palabra</li>
            <li>Las pistas deben ser claras pero no obvias</li>
            <li>Después de las pistas, votan quién es el impostor</li>
          </ol>
        </RuleSection>

        <RuleSection>
          <h3>
            <IoTrophyOutline /> Victoria
          </h3>
          <p>
            <strong>Jugadores ganan si:</strong> Descubren al impostor
          </p>
          <p>
            <strong>Impostor gana si:</strong> No lo descubren O adivina la palabra correcta
          </p>
        </RuleSection>
      </RulesContent>

      <Button
        variant="secondary"
        fullWidth
        onClick={() => game.showScreen('menu')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <MdArrowBack style={{ marginRight: '8px' }} />
        Volver
      </Button>
    </Screen>
  );
};

export default RulesScreen;
