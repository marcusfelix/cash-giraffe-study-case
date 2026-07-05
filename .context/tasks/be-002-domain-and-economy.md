# be-002 — Domain entities & gem-economy service

> Status: `done`

## Goal

Model the entities and the gem-economy rules as a storage-agnostic service.

## Scope

- [ ] Go structs in `internal/domain` matching [../docs/data-model.md](../docs/data-model.md):
      `Game`, `Task` (+ `Bonus`), `User`, `GemTransaction`, `Counters`.
- [ ] A `Store` interface (get games, get game, get user, save user, append transaction).
- [ ] A `service` implementing the economy rules against the `Store`.

## Out of scope

- Concrete persistence (that's `be-003`) — depend on the interface only.
- HTTP layer (`be-004`).

## Steps

- [ ] Define domain structs + JSON tags matching the wire contract.
- [ ] Define the `Store` interface.
- [ ] Implement `CompleteTask(taskID)`:
  - [ ] reject if already in `completedTaskIds` (idempotent).
  - [ ] award `reward` + `bonus.reward` when `now < bonus.expiresAt`.
  - [ ] append one `GemTransaction`, update `completedTaskIds` and `gemBalance`.
- [ ] Implement `Counters(user)` derivation.
- [ ] Keep `boost` multiplication un-applied (`// TODO(dev):` product decision).

## Acceptance criteria

- [ ] Structs match `data-model.md`; JSON matches the app contract.
- [ ] `gemBalance` always equals the sum of transactions (invariant covered by a test).
- [ ] `CompleteTask` is idempotent and honors bonus expiry.
- [ ] Unit tests for earn / double-complete / expired-bonus cases.
- [ ] `go build`, `go vet`, `go test ./...` pass. Stdlib only.

## Dependencies

- Packages: none.
- Other tasks: be-001.

## Notes for the developer

- Confirm whether `boost` multiplies task rewards.
- `// TODO(dev):` redemption transactions later.
