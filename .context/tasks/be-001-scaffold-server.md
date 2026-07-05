# be-001 — Backend scaffold & HTTP server

> Status: `done`

## Goal

Stand up the Go backend: module, clean layout, and a running HTTP server with a health check.

## Scope

- [ ] Create `backend/` at the repo root with a Go module.
- [ ] Layout with clean separation (transport → service → store):
      `cmd/server/`, `internal/http/`, `internal/service/`, `internal/store/`,
      `internal/domain/`.
- [ ] `net/http` server with config (port via env, sane default) and graceful shutdown.
- [ ] `GET /health` → `200 ok`.
- [ ] `backend/AGENTS.md` pointing at `../.context/` docs (mirror `app/AGENTS.md`).

## Out of scope

- Entities, endpoints, persistence (later `be-*` tasks).
- Auth, deploy.

## Steps

- [ ] `go mod init` with the project module path.
- [ ] Create the folder layout with package stubs.
- [ ] Implement server bootstrap + graceful shutdown in `cmd/server`.
- [ ] Add `/health`; add a router (stdlib `http.ServeMux`).
- [ ] Add `backend/AGENTS.md` indexing the shared docs + `backend.md`.

## Acceptance criteria

- [ ] `go run ./cmd/server` boots and serves `GET /health` → `ok`.
- [ ] `go build ./...` and `go vet ./...` pass.
- [ ] Layout separates transport / service / store.
- [ ] Standard library only; no module added without justification.

## Dependencies

- Packages: none (stdlib `net/http`).
- Other tasks: none (first backend task).

## Notes for the developer

- Confirm the Go module path and port convention.
- `// TODO(dev):` hosting/deploy later.
