# 005 — Components implementation

> Status: `done`

## Goal

Build the presentational components for both screens — token-styled, dumb, and typed.

## Scope

Shared primitives (`src/components/`):
- [ ] `Screen` (safe-area container), `Text` presets, `Card`, `Pressable`/`Button`.

Home components (`src/features/home/components/`):
- [ ] `CounterBar` — row of 3 counters (streak, boost, gems).
- [ ] `Banner` — generic placeholder slot.
- [ ] `Trail` — renders tasks **grouped by game**; `TrailGroup` (game icon +
      title, opens Detail) containing `TrailNode`s (tasks), alternating offset.
- [ ] `BottomNav` — 5 icons, **disabled/inert**.

Detail components (`src/features/detail/components/`):
- [ ] `GameBanner` (image + back), `GameDescription`, `AppStoreButton`
      (opens `appStoreUrl`).

## Out of scope

- Data fetching / navigation wiring (task 006).
- Final visual polish (developer does this).

## Steps

- [ ] Build shared primitives first, then feature components on top.
- [ ] Props in, JSX out — no fetching, no globals.
- [ ] Style only via tokens; touch targets ≥ 44px; clear pressed states.
- [ ] Feed components with static props / mock objects for now.

## Acceptance criteria

- [ ] Every screen element in `concept.md` has a component.
- [ ] Components are presentational (no data/side effects) per `architecture.md`.
- [ ] Tokens only — no hardcoded colors/spacing/font sizes.
- [ ] Flat/minimal, non-OS style per `ui-guidelines.md`.
- [ ] Typed props, named exports; `npm run lint` and type checks pass.

## Dependencies

- Packages: none (icons come from the `Icon` component in task 007).
- Other tasks: 002, 004, 007.

## Notes for the developer

- Visual polish, exact icons, motion, and copy are left with `// TODO(dev):`.
- Bottom nav is intentionally inert until destinations are defined.
