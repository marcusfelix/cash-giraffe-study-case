# State management

No state or data-fetching libraries. Custom hooks own state and async data and
hand the UI plain values to render.

## Rules

- [ ] All state, side effects, and fetching live in hooks — never in components.
- [ ] One hook per concern. Name it `use<Thing>`.
- [ ] Async hooks expose an explicit status, never a bare boolean soup.
- [ ] Components receive data + status + handlers as props/return values and just render.
- [ ] Local component state (`useState`) is fine for pure UI (open/closed, input text).
- [ ] Share state across the tree with React Context only when prop-drilling
      genuinely hurts. Keep providers small and colocated with the feature.
- [ ] No global mutable singletons for app state.

## Async data hook — standard shape

Every hook that fetches returns this shape:

```ts
type AsyncState<T> = {
  data: T | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: Error | null;
  refetch: () => void;
};
```

- [ ] Set `loading` before the request, `success`/`error` after.
- [ ] Guard against setting state after unmount (AbortController or a mounted flag).
- [ ] The api call itself comes from `src/lib/api` / the feature `api.ts` — the
      hook orchestrates, it does not build URLs or parse responses inline.

Example:

```ts
export function useCounters(): AsyncState<Counters> {
  const [state, setState] = useState<AsyncState<Counters>>({
    data: null, status: 'idle', error: null, refetch: () => {},
  });

  const load = useCallback(async () => {
    setState(s => ({ ...s, status: 'loading', error: null }));
    try {
      const data = await getCounters();        // from api.ts
      setState({ data, status: 'success', error: null, refetch: load });
    } catch (error) {
      setState(s => ({ ...s, status: 'error', error: error as Error }));
    }
  }, []);

  useEffect(() => { load(); }, [load]);
  return { ...state, refetch: load };
}
```

## In the component

```tsx
const { data, status } = useCounters();
if (status === 'loading') return <Loading />;
if (status === 'error')   return <ErrorState onRetry={...} />;
return <CounterBar counters={data!} />;
```
