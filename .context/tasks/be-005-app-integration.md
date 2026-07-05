# be-005 — App integration

> Status: `done`

## Goal

Connect the Expo app's api client to the running Go backend, replacing mocks.

## Scope

- [ ] CORS / local-network access so the app (device / simulator / web) can reach the server.
- [ ] Point the app's api client (app task 004) at the backend base URL via config.
- [ ] Verify the full flow on real endpoints: load games → open detail → complete a task → balance updates and persists.
- [ ] Short run instructions (start backend + app together).

## Out of scope

- Auth, deploy, redemption.
- New features beyond wiring.

## Steps

- [ ] Enable CORS (allow the dev origins) in the HTTP layer.
- [ ] Expose base URL to the app via Expo config / env; swap mock → real client.
- [ ] Smoke test each endpoint from the app.
- [ ] Confirm completing a task persists across a backend restart.
- [ ] Document `run` steps in `backend/` and note them in `backend.md`.

## Acceptance criteria

- [ ] App runs end-to-end against the Go backend (no mocks in the path).
- [ ] Completing a task updates the on-screen gem balance and survives restart.
- [ ] Types/JSON align with `data-model.md` on both sides.
- [ ] `go build`/`go vet`/tests pass; app `lint` + type checks pass.

## Dependencies

- Packages: none.
- Other tasks: be-004, app task 004 (and 006 for the full UI flow).

## Notes for the developer

- Confirm dev base URL per platform (LAN IP for device, `localhost` for web/sim).
- `// TODO(dev):` environments (dev/staging/prod) and secrets later.
