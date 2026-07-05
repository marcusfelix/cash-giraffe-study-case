# 002 — Design tokens & design system

> Status: `done`

## Goal

Create the token-based design system all UI reads from — no hardcoded style values anywhere.

## Scope

- [ ] `src/theme/tokens.ts` with the groups in `design-system.md`:
      `spacing`, `radius`, `fontSize`, `fontWeight`, `color` (semantic names).
- [ ] Small style helpers if needed (e.g. a `text` preset per `fontSize`/`weight`).
- [ ] A `src/theme/index.ts` barrel exporting the tokens.
- [ ] One tiny sample (a `Screen` container or `Text` preset) proving usage.

## Out of scope

- Installing Tailwind / NativeWind (plain tokens only — see `principles.md`).
- Dark mode implementation (keep names swap-ready, don't branch yet).
- Feature components (later tasks).

## Steps

- [ ] Define token objects with `as const`, Tailwind-scale values.
- [ ] Pick a small semantic color set (`bg`, `surface`, `text`, `textMuted`,
      `border`, `accent`); mark brand colors `// TODO(dev):`.
- [ ] Export via `src/theme/index.ts`.
- [ ] Build one primitive that consumes tokens as the reference pattern.

## Acceptance criteria

- [ ] All values live in `tokens.ts`; nothing hardcoded elsewhere.
- [ ] Tokens referenced by name (`spacing[4]`, `color.text`), never raw numbers.
- [ ] Matches `design-system.md`; no Tailwind/NativeWind dependency added.
- [ ] `npm run lint` and type checks pass.

## Dependencies

- Packages: none.
- Other tasks: 001.

## Notes for the developer

- Final palette / brand colors are yours to set — placeholders marked `// TODO(dev):`.
- Confirm the type scale feels right before components lean on it.
