import { useCallback } from 'react';
import { useAsync } from '@/hooks/use-async';
import { getGame } from '../api';
import type { Game } from '@/types';
import type { AsyncState } from '@/hooks/use-async';

export function useGame(id: string): AsyncState<Game> {
  const fn = useCallback(() => getGame(id), [id]);
  return useAsync(fn);
}
