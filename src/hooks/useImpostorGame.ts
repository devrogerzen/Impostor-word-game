import { useState, useCallback } from 'react';
import type { GameState, GamePhase, Category, Player, Clue, Winner } from '../types/game.types';
import { getRandomWordPair } from '../data/words';
import { showAlert } from '../utils/sweetAlert';

// Cryptographically secure random integer
const getSecureRandomInt = (max: number): number => {
  const randomBuffer = new Uint32Array(1);
  window.crypto.getRandomValues(randomBuffer);
  return randomBuffer[0] % max;
};

const initialState: GameState = {
  numPlayers: 4,
  selectedCategory: null,
  playerNames: [],
  players: [],
  currentPlayerIndex: 0,
  clues: [],
  votes: {},
  normalWord: '',
  impostorIndex: -1,
  impostorIndices: [],
  gamePhase: 'menu',
};

export const useImpostorGame = () => {
  const [state, setState] = useState<GameState>(initialState);

  // Navigate between screens
  const showScreen = useCallback((screenName: GamePhase) => {
    setState((prev) => ({ ...prev, gamePhase: screenName }));
  }, []);

  // Select category
  const selectCategory = useCallback((category: Category) => {
    setState((prev) => ({ ...prev, selectedCategory: category }));
  }, []);

  // Set player names
  const setPlayerNames = useCallback((names: string[]) => {
    setState((prev) => ({ ...prev, playerNames: names }));
  }, []);

  // Change player count
  const changePlayerCount = useCallback((delta: number) => {
    setState((prev) => {
      const newCount = Math.max(3, Math.min(10, prev.numPlayers + delta));
      return { ...prev, numPlayers: newCount };
    });
  }, []);

  // Calculate number of impostors based on player count
  const getImpostorCount = (numPlayers: number): number => {
    if (numPlayers <= 4) return 1;
    if (numPlayers <= 6) return 2;
    if (numPlayers <= 8) return 2;
    return 3; // 9-10 players
  };

  // Select multiple random impostors without repetition
  const selectImpostors = (numPlayers: number, count: number): number[] => {
    const indices: number[] = [];
    const available = Array.from({ length: numPlayers }, (_, i) => i);

    for (let i = 0; i < count; i++) {
      const randomIndex = getSecureRandomInt(available.length);
      indices.push(available[randomIndex]);
      available.splice(randomIndex, 1);
    }

    return indices.sort((a, b) => a - b);
  };

  // Start game
  const startGame = useCallback(() => {
    const { selectedCategory, numPlayers, playerNames } = state;

    if (!selectedCategory) {
      showAlert.warning('Por favor selecciona una categoría antes de continuar');
      return;
    }

    if (playerNames.length === 0) {
      // If no names are set, go to names screen
      setState((prev) => ({ ...prev, gamePhase: 'names' }));
      return;
    }

    const wordPair = getRandomWordPair(selectedCategory);
    if (!wordPair) {
      showAlert.error('No se pudieron cargar las palabras. Intenta con otra categoría.');
      return;
    }

    const impostorCount = getImpostorCount(numPlayers);
    const impostorIndices = selectImpostors(numPlayers, impostorCount);

    const players: Player[] = Array.from({ length: numPlayers }, (_, i) => ({
      id: i + 1,
      name: playerNames[i] || `Jugador ${i + 1}`,
      word: impostorIndices.includes(i) ? wordPair.impostor : wordPair.normal,
      isImpostor: impostorIndices.includes(i),
      hasSeenWord: false,
    }));

    setState((prev) => ({
      ...prev,
      players,
      impostorIndex: impostorIndices[0] ?? -1, // Keep for backwards compatibility
      impostorIndices,
      normalWord: wordPair.normal,
      currentPlayerIndex: 0,
      clues: [],
      votes: {},
      selectedVote: undefined,
      gamePhase: 'distribution',
    }));
  }, [state]);

  // Reveal word for current player
  const revealWord = useCallback(() => {
    setState((prev) => {
      const updatedPlayers = [...prev.players];
      updatedPlayers[prev.currentPlayerIndex].hasSeenWord = true;
      return { ...prev, players: updatedPlayers };
    });
  }, []);

  // Move to next player in distribution
  const nextPlayer = useCallback(() => {
    setState((prev) => {
      const nextIndex = prev.currentPlayerIndex + 1;

      if (nextIndex >= prev.numPlayers) {
        // All players have seen their words, start game phase
        return { ...prev, currentPlayerIndex: 0, gamePhase: 'game' };
      }

      return { ...prev, currentPlayerIndex: nextIndex };
    });
  }, []);

  // Add clue
  const addClue = useCallback((clueText: string) => {
    if (!clueText.trim()) {
      showAlert.warning('Por favor escribe una pista antes de continuar');
      return;
    }

    setState((prev) => {
      const playerIndex = prev.currentPlayerIndex % prev.numPlayers;
      const player = prev.players[playerIndex];
      const newClue: Clue = {
        player: player.id, // Keep for backwards compatibility
        playerName: player.name,
        text: clueText,
      };

      return {
        ...prev,
        clues: [...prev.clues, newClue],
        currentPlayerIndex: prev.currentPlayerIndex + 1,
      };
    });
  }, []);

  // Select vote
  const selectVote = useCallback((playerIndex: number) => {
    setState((prev) => ({ ...prev, selectedVote: playerIndex }));
  }, []);

  // Tally votes
  const tallyVotes = useCallback(() => {
    const { selectedVote, players, impostorIndices } = state;

    if (selectedVote === undefined) {
      showAlert.warning('Por favor selecciona a un jugador para votar');
      return;
    }

    const wasImpostor = players[selectedVote].isImpostor;

    // Check if all impostors have been eliminated
    const remainingImpostors = impostorIndices.filter(
      (idx) => idx !== selectedVote
    );
    const allImpostorsEliminated = wasImpostor && remainingImpostors.length === 0;

    setState((prev) => ({
      ...prev,
      gamePhase: 'vote-result',
      votes: {
        ...prev.votes,
        votedPlayer: selectedVote,
        wasImpostor,
        remainingImpostors: remainingImpostors.length,
      },
    }));

    // Auto-transition after showing result
    setTimeout(() => {
      if (allImpostorsEliminated) {
        // Players win if all impostors are eliminated
        showFinalScreen('players');
      } else if (wasImpostor) {
        // Continue playing if there are still impostors
        setState((prev) => ({
          ...prev,
          gamePhase: 'game',
          impostorIndices: remainingImpostors,
        }));
      } else {
        // Innocent was eliminated, impostors can guess
        setState((prev) => ({ ...prev, gamePhase: 'impostor-guess' }));
      }
    }, 3000);
  }, [state]);

  // Check impostor guess
  const checkImpostorGuess = useCallback((guess: string) => {
    if (!guess.trim()) {
      showAlert.warning('Por favor escribe tu respuesta antes de continuar');
      return;
    }

    const isCorrect = guess.toUpperCase() === state.normalWord;
    showFinalScreen(isCorrect ? 'impostor' : 'players');
  }, [state.normalWord]);

  // Impostor gives up
  const impostorGiveUp = useCallback(() => {
    showFinalScreen('players');
  }, []);

  // Show final screen
  const showFinalScreen = useCallback((winner: Winner) => {
    setState((prev) => ({
      ...prev,
      gamePhase: 'final',
      votes: { ...prev.votes, winner },
    }));
  }, []);

  // New game
  const newGame = useCallback(() => {
    setState({
      ...initialState,
      numPlayers: state.numPlayers,
      selectedCategory: state.selectedCategory,
      gamePhase: 'config',
    });
  }, [state.numPlayers, state.selectedCategory]);

  // Reset to menu
  const resetToMenu = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    ...state,
    showScreen,
    selectCategory,
    setPlayerNames,
    changePlayerCount,
    startGame,
    revealWord,
    nextPlayer,
    addClue,
    selectVote,
    tallyVotes,
    checkImpostorGuess,
    impostorGiveUp,
    newGame,
    resetToMenu,
  };
};
