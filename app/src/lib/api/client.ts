import type { Game, User, GemTransaction, Counters } from '@/types';
import { mockGames, mockUser, mockTransactions } from './mock-data';

// TODO(dev): swap mock → real backend once be-* tasks land
const USE_MOCK = false;

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8080';

function mockDelay<T>(value: T, ms = 400): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

async function apiFetch<T>(path: string, options?: RequestInit, delayMs?: number): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, options);
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  const data = await res.json() as T;
  if (delayMs) await new Promise(r => setTimeout(r, delayMs));
  return data;
}

let _user = { ...mockUser };
let _transactions = [...mockTransactions];

export async function getGames(): Promise<Game[]> {
  if (USE_MOCK) return mockDelay([...mockGames]);
  return apiFetch<Game[]>('/games');
}

export async function getGame(id: string, delayMs?: number): Promise<Game> {
  if (USE_MOCK) {
    const game = mockGames.find(g => g.id === id);
    if (!game) throw new Error(`Game not found: ${id}`);
    return mockDelay({ ...game });
  }
  return apiFetch<Game>(`/games/${id}`, undefined, delayMs);
}

export async function getUser(): Promise<User> {
  if (USE_MOCK) return mockDelay({ ..._user });
  return apiFetch<User>('/user');
}

export async function getCounters(): Promise<Counters> {
  if (USE_MOCK) {
    return mockDelay({ streak: _user.streak, boost: _user.boost, gems: _user.gemBalance });
  }
  const user = await apiFetch<User>('/user');
  return { streak: user.streak, boost: user.boost, gems: user.gemBalance };
}

export async function completeTask(taskId: string): Promise<{ user: User; transaction: GemTransaction }> {
  if (USE_MOCK) {
    if (_user.completedTaskIds.includes(taskId)) {
      throw new Error('Task already completed');
    }
    const task = mockGames.flatMap(g => g.tasks).find(t => t.id === taskId);
    if (!task) throw new Error(`Task not found: ${taskId}`);

    let amount = task.reward;
    if (task.bonus && new Date(task.bonus.expiresAt) > new Date()) {
      amount += task.bonus.reward;
    }

    const transaction: GemTransaction = {
      id: `txn-${Date.now()}`,
      type: 'earn',
      amount,
      taskId,
      createdAt: new Date().toISOString(),
    };

    _user = {
      ..._user,
      gemBalance: _user.gemBalance + amount,
      completedTaskIds: [..._user.completedTaskIds, taskId],
    };
    _transactions = [..._transactions, transaction];

    return mockDelay({ user: { ..._user }, transaction });
  }
  return apiFetch<{ user: User; transaction: GemTransaction }>(`/tasks/${taskId}/complete`, { method: 'POST' });
}

export async function getTransactions(): Promise<GemTransaction[]> {
  if (USE_MOCK) return mockDelay([..._transactions]);
  return apiFetch<GemTransaction[]>('/user/transactions');
}
