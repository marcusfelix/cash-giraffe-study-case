import { useCallback } from 'react';
import { useAsync } from '@/hooks/use-async';
import { getGame } from '../api';
import type { Game } from '@/types';
import type { AsyncState } from '@/hooks/use-async';

export function useGame(id: string | null): AsyncState<Game> {
  const fn = useCallback(async () => {
    if (!id) throw new Error('no-id');
    return getGame(id, 600);
  }, [id]);
  return useAsync(fn);
}
