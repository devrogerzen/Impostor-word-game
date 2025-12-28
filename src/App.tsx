import { ThemeProvider } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { Container } from './components/common/Container';
import { useImpostorGame } from './hooks/useImpostorGame';
import MenuScreen from './components/screens/MenuScreen';
import RulesScreen from './components/screens/RulesScreen';
import ConfigScreen from './components/screens/ConfigScreen';
import NamesScreen from './components/screens/NamesScreen';
import DistributionScreen from './components/screens/DistributionScreen';
import GameScreen from './components/screens/GameScreen';
import VotingScreen from './components/screens/VotingScreen';
import VoteResultScreen from './components/screens/VoteResultScreen';
import ImpostorGuessScreen from './components/screens/ImpostorGuessScreen';
import FinalScreen from './components/screens/FinalScreen';
import ParallaxBackground from './components/ParallaxBackground';

function App() {
  const game = useImpostorGame();

  const renderScreen = () => {
    switch (game.gamePhase) {
      case 'menu':
        return <MenuScreen game={game} />;
      case 'rules':
        return <RulesScreen game={game} />;
      case 'config':
        return <ConfigScreen game={game} />;
      case 'names':
        return <NamesScreen game={game} />;
      case 'distribution':
        return <DistributionScreen game={game} />;
      case 'game':
        return <GameScreen game={game} />;
      case 'voting':
        return <VotingScreen game={game} />;
      case 'vote-result':
        return <VoteResultScreen game={game} />;
      case 'impostor-guess':
        return <ImpostorGuessScreen game={game} />;
      case 'final':
        return <FinalScreen game={game} />;
      default:
        return <MenuScreen game={game} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ParallaxBackground />
      <Container>
        <AnimatePresence mode="wait">
          {renderScreen()}
        </AnimatePresence>
      </Container>
    </ThemeProvider>
  );
}

export default App;
