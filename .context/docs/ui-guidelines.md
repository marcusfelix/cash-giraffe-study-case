# UI guidelines

Flat and minimal. We are building our own visual language, not iOS or Android.

## Style rules

- [ ] Flat surfaces. No skeuomorphism, no heavy shadows, no gradients by default.
- [ ] Minimal chrome: generous whitespace, few borders, clear hierarchy by size/weight.
- [ ] Limited palette (see [design-system.md](./design-system.md)). Color is meaningful, not decoration.
- [ ] Consistent spacing rhythm from the spacing scale. No arbitrary gaps.
- [ ] Typography carries hierarchy — size and weight, not boxes and lines.

## Avoid OS design patterns

- [ ] Do **not** reach for platform-default look & feel (iOS grouped lists,
      Android ripples-as-identity, native segmented controls as the design).
- [ ] Build custom components from primitives (`View`, `Pressable`, `Text`)
      rather than importing pre-styled OS-flavored widgets.
- [ ] Same UI and behavior on iOS, Android, and web unless a task says otherwise.
- [ ] It is fine to keep platform-correct *mechanics* (safe areas, keyboard
      handling, haptics) — just not platform-default *aesthetics*.

## Components

- [ ] Presentational only — no data fetching (see [architecture.md](./architecture.md)).
- [ ] Typed props; sensible defaults; no required prop that could be defaulted.
- [ ] Compose small primitives; avoid one giant configurable component.
- [ ] Touch targets ≥ 44px. Use `Pressable` with a clear pressed state.

## Leave room for the developer

- [ ] Get structure, tokens, and behavior right; the developer refines visuals.
- [ ] Mark visual guesses with `// TODO(dev):` (exact color, motion, copy).
- [ ] Don't over-polish micro-interactions before the groundwork is reviewed.
