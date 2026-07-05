import { useCallback } from 'react';
import { useAsync } from '@/hooks/use-async';
import { getCounters } from '../api';
import type { Counters } from '@/types';
import type { AsyncState } from '@/hooks/use-async';

export function useCounters(): AsyncState<Counters> {
  const fn = useCallback(() => getCounters(), []);
  return useAsync(fn);
}
