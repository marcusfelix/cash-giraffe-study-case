export type Task = {
  id: string;
  gameId: string;
  title: string;
  reward: number;
  order: number;
  bonus?: { reward: number; expiresAt: string };
};

export type Game = {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
  bannerUrl: string;
  appStoreUrl: string;
  tasks: Task[];
};

export type User = {
  id: string;
  gemBalance: number;
  completedTaskIds: string[];
  streak: number;
  boost: number;
};

export type GemTransaction = {
  id: string;
  type: 'earn';
  amount: number;
  taskId?: string;
  createdAt: string;
};

export type Counters = {
  streak: number;
  boost: number;
  gems: number;
};
