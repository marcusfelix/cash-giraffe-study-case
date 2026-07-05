# 007 — Icon system (colored SVG)

> Status: `done`

## Goal

A single `Icon` component plus a set of custom, colored SVG icons in a playful,
rounded, flat style — the app's own icon language.

## Style

- [ ] Playful and rounded: soft corners, friendly thick shapes, flat fills.
- [ ] **Colored** (multi-tone allowed), not flat monochrome line icons.
- [ ] Consistent grid (24×24 viewBox), consistent visual weight.
- [ ] Flat/minimal per [../docs/ui-guidelines.md](../docs/ui-guidelines.md) — no OS
      default icon sets, no gradients unless a token defines one.
- [ ] Palette comes from design tokens where semantic; brand colors marked
      `// TODO(dev):` for the developer to finalize.

## Scope

- [ ] `react-native-svg` added (justification below).
- [ ] `src/components/icons/` with:
  - [ ] `icon.tsx` — `<Icon name size color? />`; looks up a registry.
  - [ ] one file per icon (SVG as a React component).
  - [ ] `index.ts` — the name→component registry + exported `IconName` union.
- [ ] Enough icons to cover current screens (add more as needed):
  - Counters: `flame` (streak), `boost` (x2), `gem`.
  - Bottom nav (5): `home`, `tasks`, `rewards`, `balance`, `profile`.
  - Trail/tasks: `star`, `lock`, `check`, `chevron`.
  - Detail/nav: `back`, `external-link` (app store).

## Out of scope

- Wiring icons into screens (tasks 005/006 consume this).
- Final brand palette (developer).

## Steps

- [ ] Add `react-native-svg` via `npx expo install`.
- [ ] Build `Icon` with a typed `name` and a `size` (default 24); `color` tints
      monochrome icons, colored icons keep their own palette.
- [ ] Author each icon as an SVG component using token colors.
- [ ] Register all icons; export the `IconName` union for type-safe usage.

## Acceptance criteria

- [ ] `<Icon name="gem" />` renders; unknown names fail at compile time (`IconName`).
- [ ] Icons are colored SVG in the playful/rounded style, on a 24 grid.
- [ ] Colors come from tokens (brand placeholders marked `// TODO(dev):`); no
      hardcoded hex outside `tokens.ts` except within icon art where a token
      doesn't yet exist (mark it `// TODO(dev):`).
- [ ] Every icon listed in Scope exists; adding one is a single new file + registry line.
- [ ] `npm run lint` and type checks pass.

## Dependencies

- Packages: `react-native-svg` — the standard, Expo-supported way to render
  scalable multi-color vector icons in React Native. `@expo/vector-icons` are
  single-color icon fonts and can't express this custom style.
- Other tasks: 002 (tokens).

## Notes for the developer

- Final icon art / brand colors are yours to refine — shapes are groundwork.
- `// TODO(dev):` exact colors, any extra icons a later screen needs.
