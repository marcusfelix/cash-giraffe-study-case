# Backend (Go)

> **Disclaimer — early.** The Go backend is being scaffolded. Entities and the
> first endpoints are defined below; **auth, hosting, and real game data are still
> TBD.** Add details as the `be-*` tasks land. Don't assume anything not written here.

## Where it lives

- [ ] Repo root holds both sides: `app/` (Expo) and `backend/` (Go).
- [ ] Shared context stays in `.context/` — used by both. Backend gets its own
      `backend/AGENTS.md` when work starts (see `be-001`).

## Scope (v1)

- [ ] Serve games + their tasks, the current user's state, and complete-task earning.
- [ ] Persist **gem balance** and **completed tasks** across restarts.
- [ ] **No auth** — a single default user (`id: "me"`).
- [ ] No redemption / real-money flow yet.

## Entities

- [ ] Defined once in [data-model.md](./data-model.md): `Game`, `Task`, `User`,
      `GemTransaction`, `Counters`. Go structs must match it (and the app types).

## Gem economy

- [ ] Rules live in `data-model.md`. Balance = sum of transactions; complete-task
      is idempotent; bonus applies only before `expiresAt`.

## Endpoints (v1 contract)

- [ ] `GET  /games` → `Game[]`
- [ ] `GET  /games/{id}` → `Game`
- [ ] `GET  /user` → `User`
- [ ] `POST /tasks/{id}/complete` → `{ user, transaction }`
- [ ] `GET  /user/transactions` → `GemTransaction[]`
- [ ] `GET  /health` → ok

## Principles

- [ ] Keep it simple: standard library first (`net/http`), minimal deps
      (see [principles.md](./principles.md)). Justify any module added.
- [ ] Clean separation: transport (http) → service (economy rules) → store (persistence).
- [ ] JSON over the wire; ISO-8601 timestamps.

## To fill in later

- [ ] Base URL / environments and how the app reads them.
- [ ] Auth model, if/when introduced.
- [ ] Real game/task catalog (seed is placeholder).
- [ ] Redemption flow and its ledger entries.
- [ ] Deploy/hosting.
