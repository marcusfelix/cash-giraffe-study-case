import { useState, useCallback, useEffect, useRef } from 'react';

export type AsyncState<T> = {
  data: T | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: Error | null;
  refetch: () => void;
};

export function useAsync<T>(fn: () => Promise<T>): AsyncState<T> {
  const [state, setState] = useState<Omit<AsyncState<T>, 'refetch'>>({
    data: null,
    status: 'idle',
    error: null,
  });
  const mountedRef = useRef(true);

  const load = useCallback(async () => {
    setState(s => ({ ...s, status: 'loading', error: null }));
    try {
      const data = await fn();
      if (mountedRef.current) {
        setState({ data, status: 'success', error: null });
      }
    } catch (err) {
      if (mountedRef.current) {
        setState(s => ({ ...s, status: 'error', error: err as Error }));
      }
    }
  }, [fn]);

  useEffect(() => {
    mountedRef.current = true;
    load();
    return () => {
      mountedRef.current = false;
    };
  }, [load]);

  return { ...state, refetch: load };
}
