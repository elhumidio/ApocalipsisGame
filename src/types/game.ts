export interface GameResources {
  food: number;
  water: number;
  health: number;
  morale: number;
  fuel: number;
  ammo: number;
  materials: number;
  meds: number;
}

export interface Survivor {
  id: string;
  name: string;
  skill: 'medic' | 'fighter' | 'scout' | 'engineer' | 'cook' | 'leader';
  health: number;
  loyalty: number;
  description: string;
  avatar: string;
  alive: boolean;
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  choices: Choice[];
  category: 'combat' | 'exploration' | 'survival' | 'moral' | 'supernatural' | 'zombie' | 'weather' | 'radio' | 'npc';
  minDay?: number;
  requiresFlag?: string;
  requiresSurvivor?: string;
  weight?: number;
}

export interface Choice {
  text: string;
  effects: Partial<GameResources>;
  outcome: string;
  survivorEffect?: { loyalty: number; health: number; survivorId?: string };
  requiresItem?: string;
  requiresAmmo?: number;
  requiresSurvivor?: string;
  nextEventId?: string;
  addSurvivor?: Survivor;
  removeSurvivor?: string;
  addFlag?: string;
  removeFlag?: string;
  achievementId?: string;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  icon: string;
  danger: number;
  loot: string[];
  discovered: boolean;
  explored: boolean;
  zombieLevel: number;
}

export interface BaseUpgrade {
  id: string;
  name: string;
  description: string;
  icon: string;
  cost: Partial<GameResources>;
  effect: string;
  level: number;
  maxLevel: number;
  built: boolean;
}

export interface Weather {
  type: 'clear' | 'rain' | 'storm' | 'radiation' | 'fog' | 'blood_rain' | 'eclipse';
  name: string;
  description: string;
  icon: string;
  duration: number;
  effects: Partial<GameResources>;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  condition: string;
}

export interface RadioMessage {
  id: string;
  sender: string;
  message: string;
  type: 'warning' | 'help' | 'intel' | 'mystery';
  day: number;
  decoded: boolean;
}

export interface GameState {
  day: number;
  resources: GameResources;
  survivors: Survivor[];
  currentLocation: string;
  discoveredLocations: string[];
  exploredLocations: string[];
  eventHistory: string[];
  flags: Record<string, boolean>;
  isGameOver: boolean;
  gameOverReason: string;
  gameOverType: 'death' | 'victory' | 'sacrifice' | 'mystery';
  score: number;
  baseUpgrades: BaseUpgrade[];
  weather: Weather;
  achievements: Achievement[];
  radioMessages: RadioMessage[];
  zombieThreat: number;
  moralAlignment: number; // -100 (evil) to 100 (good)
  ending: string;
  kills: number;
  saved: number;
  betrayed: number;
}

export type Screen = 'start' | 'game' | 'tracker' | 'gameover' | 'map' | 'base' | 'inventory' | 'achievements' | 'radio' | 'survivors';
