
export interface GameState {
  mimuBalance: number;
  mimuPerClick: number;
  mimuPerSecond: number;
  upgrades: Upgrade[];
  pets: Pet[];
  tasks: Task[];
  totalMimuEarned: number;
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  level: number;
  type: 'click' | 'auto';
  cost: (level: number) => number;
  effect: (level: number) => number;
}

export interface Pet {
  id: string;
  name: string;
  description: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  cost: number;
  multiplier: number;
  owned: boolean;
  emoji: string;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  reward: number;
  isCompleted: (state: GameState) => boolean;
  claimed: boolean;
}

export interface LeaderboardPlayer {
  rank: number;
  name: string;
  score: number;
}

export enum GameView {
  Upgrades = 'Upgrades',
  Pets = 'Pets',
  Tasks = 'Tasks',
  Leaderboard = 'Leaderboard',
}
