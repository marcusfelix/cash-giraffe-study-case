# 001 — Clean up the Expo boilerplate

> Status: `done`

## Goal

Strip the Expo starter down to an empty, structured shell that follows our folder rules.

## Scope

- [ ] Delete starter demo code: sample screens, demo components, themed helpers,
      example hooks/constants that exist only to showcase Expo.
- [ ] Create the `src/` structure from `folder-structure.md`
      (`features/`, `components/`, `hooks/`, `lib/`, `theme/`, `types/`).
- [ ] Repoint the `@/*` alias to `./src/*` in `tsconfig.json`.
- [ ] Reduce routes in `app/` to a minimal working shell: root layout + one empty
      Home route that renders a placeholder from `src/features/home`.
- [ ] Keep required Expo Router / navigation plumbing intact and running.

## Out of scope

- Any real UI, tokens, or logic (later tasks).
- Restyling the splash/app icon.

## Steps

- [ ] Inventory current files; mark each as keep / delete.
- [ ] Remove demo components, hooks, constants, and example screens.
- [ ] Add the `src/` folders (empty, with a short `index.ts` where useful).
- [ ] Update `tsconfig.json` path alias to `./src/*`.
- [ ] Wire a minimal Home route → `src/features/home/home-screen.tsx` (placeholder).
- [ ] Run the app; confirm it boots to a blank Home with no errors.

## Acceptance criteria

- [ ] No leftover Expo demo code (no sample text/graphics on screen).
- [ ] Folder tree matches `folder-structure.md`.
- [ ] `@/` resolves to `src`; imports use it (no `../../..`).
- [ ] App builds and boots clean; `npm run lint` and type checks pass.
- [ ] No out-of-scope changes; no new deps.

## Dependencies

- Packages: none.
- Other tasks: none (first task).

## Notes for the developer

- Confirm which Expo config (icons, splash, app name) you want kept vs reset.
- `// TODO(dev):` markers left in: none expected.
