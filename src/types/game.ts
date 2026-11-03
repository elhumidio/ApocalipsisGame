export interface GameResources {
  food: number;
  water: number;
  health: number;
  morale: number;
  fuel: number;
  ammo: number;
}

export interface Survivor {
  id: string;
  name: string;
  skill: string;
  health: number;
  loyalty: number;
  description: string;
  avatar: string;
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  image?: string;
  choices: Choice[];
  category: 'combat' | 'exploration' | 'survival' | 'moral' | 'supernatural';
  minDay?: number;
}

export interface Choice {
  text: string;
  effects: Partial<GameResources>;
  outcome: string;
  survivorEffect?: { loyalty: number; health: number };
  requiresItem?: string;
  nextEventId?: string;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  icon: string;
  danger: number;
  loot: string[];
  discovered: boolean;
}

export interface GameState {
  day: number;
  resources: GameResources;
  survivors: Survivor[];
  currentLocation: string;
  discoveredLocations: string[];
  eventHistory: string[];
  flags: Record<string, boolean>;
  isGameOver: boolean;
  gameOverReason: string;
  score: number;
}

export type Screen = 'start' | 'game' | 'tracker' | 'gameover' | 'map';
