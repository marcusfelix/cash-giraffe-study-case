# be-004 — REST API endpoints

> Status: `done`

## Goal

Expose the v1 endpoints over HTTP, wiring transport → service → store.

## Scope

Implement the contract from [../docs/backend.md](../docs/backend.md):
- [ ] `GET  /games` → `Game[]`
- [ ] `GET  /games/{id}` → `Game` (404 if missing)
- [ ] `GET  /user` → `User`
- [ ] `POST /tasks/{id}/complete` → `{ user, transaction }`
- [ ] `GET  /user/transactions` → `GemTransaction[]`

## Out of scope

- Auth, pagination, redemption.
- App-side wiring (`be-005` / app task 004).

## Steps

- [ ] Add handlers in `internal/http` calling the service.
- [ ] JSON encode/decode; consistent error shape (`{ "error": string }`).
- [ ] Map errors to status codes: 400 (bad input / already completed),
      404 (unknown game/task), 500 (store failure).
- [ ] Route with stdlib `http.ServeMux` (Go 1.22 method+path patterns).
- [ ] Request logging middleware (stdlib `log`).

## Acceptance criteria

- [ ] Every endpoint returns JSON matching `data-model.md`.
- [ ] `POST /tasks/{id}/complete` is idempotent (second call → 400, no double credit).
- [ ] Unknown ids → 404; malformed requests → 400.
- [ ] Endpoint tests with `httptest` cover happy + error paths.
- [ ] `go build`, `go vet`, `go test ./...` pass. Stdlib only.

## Dependencies

- Packages: none.
- Other tasks: be-002, be-003.

## Notes for the developer

- Confirm the error envelope shape if you want it different.
- `// TODO(dev):` versioned path prefix (`/v1`) if desired.
