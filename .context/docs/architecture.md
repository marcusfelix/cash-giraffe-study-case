# Architecture & separation of concerns

Keep layers apart. Data flows up through hooks; UI stays dumb.

## Layers

| Layer | Responsibility | May import |
|-------|----------------|------------|
| Routes (`app/`) | Screen wiring only. Thin. | features, shared UI, hooks |
| Features (`src/features/*`) | One product area: its UI, hooks, api, types | shared, lib, theme |
| Shared UI (`src/components`) | Reusable presentational primitives | theme, lib |
| Hooks (`src/hooks`, feature hooks) | State + async data + side effects | lib, api |
| Lib (`src/lib`) | Pure utils, api client, formatting | nothing app-specific |
| Theme (`src/theme`) | Design tokens | nothing |

## Rules

- [ ] Route files (`app/**`) contain no business logic — they render a feature.
- [ ] Components are presentational: props in, JSX out. No fetching, no globals.
- [ ] All state, data fetching, and side effects live in hooks. See
      [state-management.md](./state-management.md).
- [ ] Network calls go through one api client in `src/lib/api`. Components never
      call `fetch` directly.
- [ ] Dependencies point inward: UI → hooks → lib. Never the reverse.
- [ ] No cross-feature imports. Shared code moves to `src/components` or `src/lib`.
- [ ] Types live next to what they describe; cross-cutting types in `src/types`.

## A screen, end to end

```
app/(tabs)/index.tsx          # route: <HomeScreen/>
src/features/home/
  home-screen.tsx             # composes counters + banner + trail, calls hooks
  components/counter-bar.tsx  # presentational
  components/trail.tsx        # presentational
  hooks/use-counters.ts       # state + fetch
  api.ts                      # endpoints via src/lib/api client
  types.ts
```
