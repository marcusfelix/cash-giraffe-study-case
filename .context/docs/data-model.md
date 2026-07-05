# Data model

Canonical entities. **Single source of truth** for both the app (TS types) and
the backend (Go structs). Keep both sides in sync with this file. Domain terms
only — see [concept.md](./concept.md).

## Entities

### Game
- `id: string`
- `title: string`
- `description: string`
- `iconUrl: string` — small image, shown on the trail
- `bannerUrl: string` — larger image, shown on Detail
- `appStoreUrl: string` — external link to install/open the game
- `tasks: Task[]` — the game's trail items, in `order`

### Task (a trail item)
- `id: string`
- `gameId: string`
- `title: string`
- `reward: number` — gems awarded on completion
- `order: number`
- `bonus?: { reward: number; expiresAt: string /* ISO */ }` — optional, time-limited

### User (the current user — no auth, a single record)
- `id: string` — a fixed default (e.g. `"me"`)
- `gemBalance: number`
- `completedTaskIds: string[]`
- `streak: number`
- `boost: number` — multiplier (e.g. `1`, `2`)

### GemTransaction (the ledger)
- `id: string`
- `type: 'earn'` — extend with `'redeem'` later
- `amount: number` — gems (positive for earn)
- `taskId?: string` — set when the earn came from a task
- `createdAt: string /* ISO */`

### Counters (derived, for the Home top bar)
- `{ streak: number; boost: number; gems: number }`
- `gems` = `user.gemBalance`; `streak`/`boost` come from `User`.

## The trail

- The Home trail is a **flat list of tasks from many games**, but tasks are kept
  **grouped by game** and shown together — so a user works through one game's
  tasks while being nudged to try the next game.
- No new entity: the trail is just an **ordered list of `Game`s, each with its
  `tasks` in order**. The app renders one visual group per game.
- Each group shows its `Game` (icon + title); tapping it opens that game's Detail.

## Gem economy rules

- [ ] `gemBalance` is authoritative and must always equal the sum of the user's
      `GemTransaction` amounts. Never let them drift.
- [ ] **Complete a task**: reject if `taskId` is already in `completedTaskIds`
      (idempotent — no double credit).
- [ ] Award = `task.reward`, **plus** `task.bonus.reward` if a bonus exists and
      `now < bonus.expiresAt`.
- [ ] On success: append the `taskId` to `completedTaskIds`, write one
      `GemTransaction` (`type:'earn'`), and add the amount to `gemBalance`.
- [ ] Whether `boost` multiplies task rewards is a product decision —
      `// TODO(dev):` leave un-applied until confirmed.
- [ ] Redemption (gems → real value) is **out of scope** for now.

## Notes

- Time is ISO-8601 strings across the wire; parse at the edges.
- IDs are opaque strings; don't assume format.
