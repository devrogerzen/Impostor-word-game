import { useState, useCallback } from 'react';
import type { GameState, GamePhase, Category, Player, Clue, Winner } from '../types/game.types';
import { getRandomWordPair } from '../data/words';

const initialState: GameState = {
  numPlayers: 4,
  selectedCategory: null,
  players: [],
  currentPlayerIndex: 0,
  clues: [],
  votes: {},
  normalWord: '',
  impostorIndex: -1,
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

  // Change player count
  const changePlayerCount = useCallback((delta: number) => {
    setState((prev) => {
      const newCount = Math.max(3, Math.min(10, prev.numPlayers + delta));
      return { ...prev, numPlayers: newCount };
    });
  }, []);

  // Start game
  const startGame = useCallback(() => {
    const { selectedCategory, numPlayers } = state;

    if (!selectedCategory) {
      alert('Por favor selecciona una categoría');
      return;
    }

    const wordPair = getRandomWordPair(selectedCategory);
    if (!wordPair) {
      alert('Error al obtener palabras');
      return;
    }

    const impostorIndex = Math.floor(Math.random() * numPlayers);
    const players: Player[] = Array.from({ length: numPlayers }, (_, i) => ({
      id: i + 1,
      word: i === impostorIndex ? wordPair.impostor : wordPair.normal,
      isImpostor: i === impostorIndex,
      hasSeenWord: false,
    }));

    setState((prev) => ({
      ...prev,
      players,
      impostorIndex,
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
      alert('Por favor escribe una pista');
      return;
    }

    setState((prev) => {
      const playerNum = (prev.currentPlayerIndex % prev.numPlayers) + 1;
      const newClue: Clue = {
        player: playerNum,
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
    const { selectedVote, players } = state;

    if (selectedVote === undefined) {
      alert('Por favor vota por un jugador');
      return;
    }

    const wasImpostor = players[selectedVote].isImpostor;

    setState((prev) => ({
      ...prev,
      gamePhase: 'vote-result',
      votes: { ...prev.votes, votedPlayer: selectedVote, wasImpostor },
    }));

    // Auto-transition after showing result
    setTimeout(() => {
      if (wasImpostor) {
        showFinalScreen('players');
      } else {
        setState((prev) => ({ ...prev, gamePhase: 'impostor-guess' }));
      }
    }, 3000);
  }, [state]);

  // Check impostor guess
  const checkImpostorGuess = useCallback((guess: string) => {
    if (!guess.trim()) {
      alert('Por favor escribe tu respuesta');
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
