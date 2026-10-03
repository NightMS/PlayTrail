export type GameStatus = 'Playing' | 'Backlog' | 'Completed' | 'On Hold' | 'Dropped';

export type PersonalTag = 'Main' | 'Gacha' | 'Singleplayer' | 'Multiplayer' | 'Modded';

export interface Goal {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface Game {
  id: string;
  title: string;
  exeName: string;
  coverUrl: string;
  officialUrl?: string;
  status: GameStatus;
  tags: PersonalTag[];
  notes: string;
  goals: Goal[];
  isHidden: boolean;
  firstPlayed?: string;
  lastPlayed?: string;
  totalActiveSeconds: number;
  totalAfkSeconds: number;
}

export interface ActiveSession {
  gameId: string;
  title: string;
  coverUrl: string;
  startTime: string;
  activeSeconds: number;
  afkSeconds: number;
  isFocused: boolean;
}