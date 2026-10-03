import { Game, ActiveSession } from '../types/game';

export const MOCK_ACTIVE_SESSION: ActiveSession = {
  gameId: '1',
  title: 'Honkai: Star Rail',
  coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
  startTime: new Date().toISOString(),
  activeSeconds: 5484, // 1h 31m 24s
  afkSeconds: 667,    // 11m 07s
  isFocused: true,
};

export const MOCK_GAMES: Game[] = [
  {
    id: '1',
    title: 'Honkai: Star Rail',
    exeName: 'StarRail.exe',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    officialUrl: 'https://hsr.hoyoverse.com',
    status: 'Playing',
    tags: ['Main', 'Gacha'],
    notes: 'Focus on farming Relics. Save Stellar Jades.',
    goals: [
      { id: 'g1', title: 'Clear Memory of Chaos Stage 12', isCompleted: true },
      { id: 'g2', title: 'Farm Speed set for Support', isCompleted: false },
    ],
    isHidden: false,
    firstPlayed: '2026-01-12',
    lastPlayed: '2026-10-03',
    totalActiveSeconds: 280800, // 78h
    totalAfkSeconds: 18000,    // 5h
  },
  {
    id: '2',
    title: 'Minecraft (Modded)',
    exeName: 'javaw.exe',
    coverUrl: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=600&auto=format&fit=crop&q=80',
    status: 'Playing',
    tags: ['Main', 'Modded'],
    notes: '1.20.1 Custom Modpack. WorldEdit + Create + TAC Zero.',
    goals: [
      { id: 'm1', title: 'Build automated iron farm', isCompleted: true },
      { id: 'm2', title: 'Defeat Ender Dragon', isCompleted: false },
    ],
    isHidden: false,
    firstPlayed: '2025-07-15',
    lastPlayed: '2026-10-01',
    totalActiveSeconds: 772200, // 214h 30m
    totalAfkSeconds: 36000,    // 10h
  },
  {
    id: '3',
    title: 'Genshin Impact',
    exeName: 'GenshinImpact.exe',
    coverUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    officialUrl: 'https://genshin.hoyoverse.com',
    status: 'Playing',
    tags: ['Gacha', 'Singleplayer'],
    notes: 'Daily commissions & resin spending.',
    goals: [
      { id: 'gi1', title: 'Complete Archon Quest', isCompleted: true }
    ],
    isHidden: false,
    firstPlayed: '2025-08-10',
    lastPlayed: '2026-09-28',
    totalActiveSeconds: 504000, // 140h
    totalAfkSeconds: 21600,    // 6h
  }
];