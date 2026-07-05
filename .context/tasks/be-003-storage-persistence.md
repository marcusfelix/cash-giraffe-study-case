# be-003 — Storage & persistence

> Status: `done`

## Goal

Persist user state (gem balance, completed tasks) and transactions across restarts; serve seeded games.

## Scope

- [ ] Implement the `Store` interface from `be-002`.
- [ ] Games/tasks: read-only, loaded from a seed catalog (in-memory from a JSON seed file).
- [ ] User + transactions: persisted so `gemBalance` and `completedTaskIds` survive restart.
- [ ] Concurrency-safe access (mutex or DB transactions).

## Storage choice

- [ ] Prefer the simplest thing that persists (see [principles.md](./principles.md)):
  - Option A — JSON file store via stdlib (`encoding/json`, `os`). Zero deps.
  - Option B — SQLite via a pure-Go driver, if querying grows.
- [ ] Recommend **Option A** for v1. `// TODO(dev):` revisit if data grows.

## Out of scope

- HTTP layer (`be-004`).
- Real game catalog (seed is placeholder).

## Steps

- [ ] Add a seed JSON: a few games, each with ordered tasks (one with a bonus).
- [ ] Implement games/tasks read from the seed.
- [ ] Implement user + transaction persistence (load on start, write on change).
- [ ] Guard concurrent access; write atomically (temp file + rename for JSON).
- [ ] Initialize a default user (`id:"me"`, balance 0) on first run.

## Acceptance criteria

- [ ] Completing a task then restarting keeps the balance and completed tasks.
- [ ] Games/tasks come from the seed and match `data-model.md`.
- [ ] Safe under concurrent requests (test or documented lock).
- [ ] `go build`, `go vet`, `go test ./...` pass. Deps justified per principles.

## Dependencies

- Packages: none for Option A; one driver if Option B (justify it).
- Other tasks: be-002.

## Notes for the developer

- Confirm storage choice and where the data file lives.
- `// TODO(dev):` swap seed for the real game catalog.
