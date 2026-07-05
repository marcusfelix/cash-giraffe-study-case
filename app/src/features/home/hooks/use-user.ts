import { useCallback } from 'react';
import { useAsync } from '@/hooks/use-async';
import { getUser } from '../api';
import type { User } from '@/types';
import type { AsyncState } from '@/hooks/use-async';

export function useUser(): AsyncState<User> {
  const fn = useCallback(() => getUser(), []);
  return useAsync(fn);
}
