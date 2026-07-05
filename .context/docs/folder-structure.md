# Folder structure

Stable, feature-first layout. Routes stay at the Expo Router root; everything
else lives under `src/`.

## Tree

```
app/
  app/                     # Expo Router routes ONLY — thin screens
    _layout.tsx
    (tabs)/
    modal.tsx
  src/
    features/              # one folder per product area
      <feature>/
        <feature>-screen.tsx
        components/        # feature-only UI
        hooks/            # feature state + data
        api.ts            # feature endpoints
        types.ts
    components/            # shared presentational primitives
    hooks/                # shared hooks
    lib/                  # api client, utils, formatters (pure)
    theme/                # design tokens + helpers
    types/                # cross-cutting types
  assets/
```

## Rules

- [ ] Everything importable lives under `src/`. `app/` holds routes only.
- [ ] One feature = one folder under `src/features/`. Self-contained.
- [ ] Promote code to `src/components` or `src/lib` only when a second feature needs it.
- [ ] Barrel `index.ts` per feature is optional; if used, keep it explicit.
- [ ] Use the `@/` path alias for `src`; no deep `../../..`. The starter maps
      `@/*` → `./*` in `tsconfig.json`; repoint it to `./src/*` once `src/` exists.

## Naming

- [ ] Files: `kebab-case.ts` / `kebab-case.tsx`.
- [ ] Components: `PascalCase`. Hooks: `useCamelCase`. Vars/functions: `camelCase`.
- [ ] Types & interfaces: `PascalCase`, no `I` prefix.
- [ ] One component per file; file name matches the component in kebab-case.

## Delete the boilerplate

- [ ] The starter's `components/`, `hooks/`, `constants/` at the app root are
      throwaway. Move real code into `src/` following the tree above.
