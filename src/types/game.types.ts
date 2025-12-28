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
  | 'dragonball';

export interface Player {
  id: number;
  word: string;
  isImpostor: boolean;
  hasSeenWord: boolean;
}

export interface Clue {
  player: number;
  text: string;
}

export type GamePhase =
  | 'menu'
  | 'rules'
  | 'config'
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
  players: Player[];
  currentPlayerIndex: number;
  clues: Clue[];
  votes: Record<string, any>;
  selectedVote?: number;
  normalWord: string;
  impostorIndex: number;
  gamePhase: GamePhase;
}
