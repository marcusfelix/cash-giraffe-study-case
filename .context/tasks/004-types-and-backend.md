# 004 — Domain types & backend connection

> Status: `done`

## Goal

Model the domain types and a single typed api client, backed by mocks until the backend exists.

## Scope

- [ ] Domain types matching [../docs/data-model.md](../docs/data-model.md):
      `Game`, `Task` (+ `bonus`), `User`, `GemTransaction`, `Counters`.
- [ ] `src/lib/api/` — one api client; all network access goes through it.
- [ ] Feature `api.ts` functions mapping to the endpoints below.
- [ ] Mock implementations behind the client so screens run without a backend.

## Endpoints (contract — see backend track)

- [ ] `GET  /games` → `Game[]`
- [ ] `GET  /games/{id}` → `Game`
- [ ] `GET  /user` → `User` (also yields `Counters`)
- [ ] `POST /tasks/{id}/complete` → `{ user: User; transaction: GemTransaction }`
- [ ] `GET  /user/transactions` → `GemTransaction[]` (optional)

## Out of scope

- Auth (none for now — single default user).
- UI and hooks wiring beyond the api layer (features do that in 005/006).
- Real server implementation (backend track `be-*`).

## Steps

- [ ] Define types per `data-model.md`; cross-cutting ones in `src/types`.
- [ ] Build the api client with a single seam to swap mock → real (base URL config).
- [ ] Implement mock data satisfying the types (a few games + tasks + a user).
- [ ] Mock `POST /tasks/{id}/complete` applying the gem-economy rules locally.
- [ ] Expose typed functions; no `fetch` outside the client.

## Acceptance criteria

- [ ] Types match `data-model.md` exactly; no `any`.
- [ ] All data access goes through one client; swapping to real is one place.
- [ ] Mock `complete` is idempotent and updates balance per the economy rules.
- [ ] Matches `architecture.md` (dependencies point inward).
- [ ] `npm run lint` and type checks pass.

## Dependencies

- Packages: none.
- Other tasks: 001, 003.

## Notes for the developer

- Base URL / environment config is yours to confirm (`backend.md`).
- Keep the app types and the Go structs aligned to `data-model.md`.
- `// TODO(dev):` swap mock client → real backend once `be-*` tasks land.
