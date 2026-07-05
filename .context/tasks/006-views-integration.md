# 006 — Views integration (Home + Detail)

> Status: `done`

## Goal

Wire the two screens: hooks feed components with data, and Home navigates to Detail.

## Scope

- [ ] Feature hooks using `useAsync`: `use-counters`, `use-games` (Home trail),
      `use-game(id)` (Detail).
- [ ] `home-screen.tsx` — compose `CounterBar`, `Banner`, `Trail` (tasks grouped
      by game), `BottomNav`; render loading/error/success states.
- [ ] `detail-screen.tsx` — compose `GameBanner`, `GameDescription`, `AppStoreButton`.
- [ ] Routes: Home route renders `HomeScreen`; a `game/[id]` route renders `DetailScreen`.
- [ ] Trail group (game) → navigate to `game/[id]`; app-store button opens `appStoreUrl`.

## Out of scope

- Real backend (still mocked via task 004).
- Bottom-nav destinations, redemption, task-completion trigger (`// TODO(dev):`).

## Steps

- [ ] Add feature hooks wrapping the api functions with `useAsync`.
- [ ] Compose Home; render the trail grouped by game; handle `loading` / `error`
      (retry) / `success`.
- [ ] Add the `game/[id]` route + Detail screen; read `id` from params.
- [ ] Wire group press → navigation; open `appStoreUrl` via `expo-linking`/`WebBrowser`.
- [ ] Verify back returns to Home; confirm the whole flow runs on mock data.

## Acceptance criteria

- [ ] Home shows counters, banner, grouped trail, inert bottom nav — from hooks.
- [ ] Tapping a game opens its Detail; back returns to Home.
- [ ] Detail shows banner + description + working app-store link.
- [ ] All state via custom hooks (`state-management.md`); no data in components.
- [ ] Loading and error states handled.
- [ ] Matches `concept.md` layout; tokens/style rules hold.
- [ ] `npm run lint` and type checks pass; app runs end-to-end on mocks.

## Dependencies

- Packages: none.
- Other tasks: 002, 003, 004, 005.

## Notes for the developer

- `// TODO(dev):` bottom-nav routing, task-completion trigger, banner content,
  node/group visual states, real data.
- This delivers reviewable groundwork — final UI touches are yours.
