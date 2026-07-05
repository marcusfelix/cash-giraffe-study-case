import type { Game, User, GemTransaction } from '@/types';

export const mockGames: Game[] = [
  {
    id: 'game-1',
    title: 'Puzzle Quest',
    description: 'Solve clever puzzles and earn gems as you advance through increasingly tricky levels. A perfect brain workout!',
    iconUrl: 'https://picsum.photos/seed/pq/64/64',
    bannerUrl: 'https://picsum.photos/seed/pq/800/400',
    appStoreUrl: 'https://apps.apple.com',
    tasks: [
      { id: 'task-1', gameId: 'game-1', title: 'Complete level 1', reward: 214, order: 1 },
      { id: 'task-2', gameId: 'game-1', title: 'Complete level 5', reward: 320, order: 2, bonus: { reward: 150, expiresAt: new Date(Date.now() + 3600 * 2 * 1000).toISOString() } },
      { id: 'task-3', gameId: 'game-1', title: 'Reach level 10', reward: 500, order: 3 },
    ],
  },
  {
    id: 'game-2',
    title: 'Word Blitz',
    description: 'Race against the clock to form words and outsmart opponents. Fast-paced, fun, and rewarding.',
    iconUrl: 'https://picsum.photos/seed/wb/64/64',
    bannerUrl: 'https://picsum.photos/seed/wb/800/400',
    appStoreUrl: 'https://apps.apple.com',
    tasks: [
      { id: 'task-4', gameId: 'game-2', title: 'Play first match', reward: 100, order: 1 },
      { id: 'task-5', gameId: 'game-2', title: 'Win 3 matches', reward: 280, order: 2 },
    ],
  },
  {
    id: 'game-3',
    title: 'Stack Tower',
    description: 'Build the tallest tower you can without toppling! A simple concept that becomes surprisingly addictive.',
    iconUrl: 'https://picsum.photos/seed/st/64/64',
    bannerUrl: 'https://picsum.photos/seed/st/800/400',
    appStoreUrl: 'https://apps.apple.com',
    tasks: [
      { id: 'task-6', gameId: 'game-3', title: 'Stack 10 blocks', reward: 150, order: 1 },
      { id: 'task-7', gameId: 'game-3', title: 'Reach floor 20', reward: 400, order: 2 },
    ],
  },
];

export const mockUser: User = {
  id: 'me',
  gemBalance: 2299,
  completedTaskIds: [],
  streak: 7,
  boost: 2,
};

export const mockTransactions: GemTransaction[] = [];
