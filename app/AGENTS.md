# AGENTS — App (Expo React Native)

Index of the rules an agent must follow in this repo. Read the linked docs
**before** writing code. Do not restate them here — keep this file as an index.

## Read first, always

- [ ] Expo has changed. Read the versioned docs at
      https://docs.expo.dev/versions/v54.0.0/ before writing any Expo code.
- [ ] The existing files under `app/`, `components/`, `hooks/`, `constants/` are
      **Expo boilerplate**. Do not treat them as reference or a pattern to copy.
      Replace them following the docs below.

## Context docs (`../.context/`)

Shared context lives at the repo root, next to `app/` and the future backend.

### Guidelines — `../.context/docs/`

- [ ] [concept.md](../.context/docs/concept.md) — what the app is + its screens. Read first.
- [ ] [principles.md](../.context/docs/principles.md) — how we work: simple, clean, few deps.
- [ ] [architecture.md](../.context/docs/architecture.md) — layers & separation of concerns.
- [ ] [folder-structure.md](../.context/docs/folder-structure.md) — where files go.
- [ ] [state-management.md](../.context/docs/state-management.md) — custom hooks for state + async data.
- [ ] [design-system.md](../.context/docs/design-system.md) — Tailwind-based tokens.
- [ ] [ui-guidelines.md](../.context/docs/ui-guidelines.md) — flat, minimal, non-OS UI.
- [ ] [data-model.md](../.context/docs/data-model.md) — entities + gem economy (shared with backend).
- [ ] [typescript.md](../.context/docs/typescript.md) — TS & code-quality rules.
- [ ] [backend.md](../.context/docs/backend.md) — Go backend (stub, details later).

### Tasks — `../.context/tasks/`

- [ ] [how-to-create-tasks.md](../.context/tasks/how-to-create-tasks.md) — write a task before coding.
- [ ] [TEMPLATE.md](../.context/tasks/TEMPLATE.md) — copy this per task.

## Definition of done (every change)

- [ ] Matches the docs above — not the boilerplate.
- [ ] `npm run lint` passes, no type errors.
- [ ] No new dependency unless the task justifies it (see `principles.md`).
- [ ] UI uses design tokens only — no hardcoded colors, spacing, or font sizes.
- [ ] Groundwork the developer can finish: clean seams, no half-solutions, no dead code.
