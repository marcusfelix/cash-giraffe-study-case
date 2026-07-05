# AGENTS — Backend (Go)

Index of rules an agent must follow. Read the linked docs before writing code.

## Read first

- [ ] [concept.md](../.context/docs/concept.md) — what the app is.
- [ ] [principles.md](../.context/docs/principles.md) — simple, clean, few deps.
- [ ] [architecture.md](../.context/docs/architecture.md) — layers & separation.
- [ ] [data-model.md](../.context/docs/data-model.md) — entities + gem economy.
- [ ] [backend.md](../.context/docs/backend.md) — Go backend contract.

## Layout

```
cmd/server/       → entry point: wires store → service → HTTP server
internal/domain/  → plain Go structs, no I/O
internal/store/   → Store interface + SQLite implementation
internal/service/ → gem-economy business logic
internal/http/    → HTTP handlers, middleware, server
```

## Definition of done

- [ ] `go build ./...`, `go vet ./...`, `go test ./...` all pass.
- [ ] No new dep without justification in the task.
- [ ] Transport, service, and store layers stay separated.
- [ ] Error shape: `{ "error": string }` for all HTTP errors.
