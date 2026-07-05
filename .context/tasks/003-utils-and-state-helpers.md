# 003 — Utility functions & state management helpers

> Status: `done`

## Goal

Provide the shared `lib/` utilities and the reusable async-hook foundation from `state-management.md`.

## Scope

- [ ] `src/lib/` pure utilities needed early: number/gem formatting (thousands
      separators), time/countdown formatting, small `cn`/style merge if useful.
- [ ] `src/hooks/use-async.ts` — reusable hook implementing the standard
      `AsyncState<T>` (`data`, `status`, `error`, `refetch`) with unmount guard.
- [ ] Types for the async shape exported for reuse.

## Out of scope

- Any state library (banned — custom hooks only).
- Domain hooks / api calls (task 004).
- UI (task 005).

## Steps

- [ ] Implement `AsyncState<T>` and a generic `useAsync(fn)` per `state-management.md`.
- [ ] Guard against setting state after unmount (AbortController or mounted flag).
- [ ] Add pure formatters in `src/lib/` with unit-testable signatures.
- [ ] Keep each util single-purpose and documented by name, not comments.

## Acceptance criteria

- [ ] `useAsync` returns the exact `AsyncState<T>` shape; handles loading/success/error.
- [ ] No state/data-fetching packages added.
- [ ] Utils are pure (no app-specific imports) and typed with no `any`.
- [ ] `npm run lint` and type checks pass.

## Dependencies

- Packages: none.
- Other tasks: 001.

## Notes for the developer

- Confirm number/currency formatting rules (locale, decimals for gems).
- `// TODO(dev):` markers left in: locale specifics if unconfirmed.
