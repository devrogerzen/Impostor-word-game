// Types for the Impostor Game

export interface WordPair {
  normal: string;
  impostor: string;
}

export type Category =
  | 'animales'
  | 'comida'
  | 'profesiones'
  | 'deportes'
  | 'lugares'
  | 'objetos'
  | 'transporte'
  | 'tecnologia'
  | 'musica'
  | 'peliculas'
  | 'dragonball'
  | 'jesus'
  | 'biblia';

export interface Player {
  id: number;
  name: string;
  word: string;
  isImpostor: boolean;
  hasSeenWord: boolean;
}

export interface Clue {
  player: number; // Deprecated: kept for backwards compatibility
  playerName: string;
  text: string;
}

export type GamePhase =
  | 'menu'
  | 'rules'
  | 'config'
  | 'names'
  | 'distribution'
  | 'game'
  | 'voting'
  | 'vote-result'
  | 'impostor-guess'
  | 'final';

export type Winner = 'impostor' | 'players';

export interface GameState {
  numPlayers: number;
  selectedCategory: Category | null;
  playerNames: string[];
  players: Player[];
  currentPlayerIndex: number;
  clues: Clue[];
  votes: Record<string, any>;
  selectedVote?: number;
  normalWord: string;
  impostorIndex: number; // Deprecated: kept for backwards compatibility
  impostorIndices: number[];
  gamePhase: GamePhase;
}
