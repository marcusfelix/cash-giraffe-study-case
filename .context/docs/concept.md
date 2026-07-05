# Concept

What we're building and its screens. Domain-only — pair with
[ui-guidelines.md](./ui-guidelines.md) for style and
[architecture.md](./architecture.md) for structure.

## The app

- [ ] Reward app: users play a **curated set of games** and earn **gems** that
      convert to **real-world value** (cash / gift cards).
- [ ] Home is playful and game-like — a progress **trail**, not a list.
- [ ] Visual language is our own: flat, minimal, non-OS (see ui-guidelines).
      The current app is the thing being redesigned, not a style to copy.

## Core objects

- [ ] **Gems** — the earned currency (green-diamond number, e.g. `2299`).
      Redeemable for real value. Shown as a counter.
- [ ] **Counter** — a single top-bar number. Three at launch: `streak`, `boost`
      (a `2x`-style multiplier), `gems`. Read-only display; tappable later.
- [ ] **Game** — has a title, icon, banner, description, an app-store link, and a
      set of tasks. Its tasks appear as a group on the trail; tapping the game
      opens Detail.
- [ ] **Task** — a **trail item** that awards gems (e.g. "Complete level 1" →
      `214` gems). Belongs to a game. Some carry a time-limited **bonus**
      (higher reward + countdown).
- [ ] **Banner** — a single promo/info slot below the counters. Purpose TBD.

## Screens

### Home (top → bottom)

1. [ ] **Counter bar** — 3 numeric counters: `streak`, `boost`, `gems`. One row.
2. [ ] **Banner slot** — reserve the space; build a generic `Banner` component with
       placeholder content. `// TODO(dev):` real content later.
3. [ ] **Trail** — vertical, scrollable column of task nodes with alternating
       horizontal offset, **grouped by game** (see data-model → The trail). Each
       group shows its game; tapping the game opens Detail.
4. [ ] **Bottom nav** — 5 icons (Home, Tasks, Rewards, Balance, Profile).
       **Disabled for now**: render it, no navigation, visibly inert.
       `// TODO(dev):` wire destinations later.

### Detail (a game)

- [ ] Opens from a trail group. Receives the game id via route params; loads its
      data through a hook.
- [ ] Focus: **game details, banner, and a link to the app store**.
- [ ] Layout, top → bottom:
  1. [ ] **Banner** — game `bannerUrl` + back control.
  2. [ ] **Title**.
  3. [ ] **Description** — short blurb.
  4. [ ] **Primary CTA** — opens `appStoreUrl` (external link to install/open the game).

## Now vs later (groundwork)

- [ ] **Build now:** both screens' layout + components, Home↔Detail navigation,
      tokens, and hooks backed by **mocked data**.
- [ ] **Leave for the developer** (`// TODO(dev):`): banner content, real game/task
      data + rewards, redemption flow, bottom-nav destinations, node/task states,
      task-completion trigger.

## Still open (confirm with the developer)

- [ ] Exact counter icons and formatting (thousands separators, `x` prefix).
- [ ] Trail node + group visuals and locked/active/done states.
- [ ] How a task gets marked complete (in-app vs after playing the linked game).
