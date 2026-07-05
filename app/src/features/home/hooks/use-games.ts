import { useCallback } from 'react';
import { useAsync } from '@/hooks/use-async';
import { getGames } from '../api';
import type { Game } from '@/types';
import type { AsyncState } from '@/hooks/use-async';

export function useGames(): AsyncState<Game[]> {
  const fn = useCallback(() => getGames(), []);
  return useAsync(fn);
}
