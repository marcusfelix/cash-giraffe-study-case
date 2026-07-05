# TypeScript & code quality

## TypeScript

- [ ] `strict` on. No `any` — use `unknown` and narrow, or write the type.
- [ ] No non-null `!` except right after an explicit guard.
- [ ] Type props and hook returns explicitly. Let inference handle locals.
- [ ] Prefer `type` aliases; use `interface` only for extendable public shapes.
- [ ] Model states as discriminated unions, not many optional booleans.
- [ ] Derive types from one source of truth; don't duplicate shapes.

## Imports

- [ ] Use the `@/` alias for `src` (point `@/*` at `./src/*` in `tsconfig.json`). No `../../..` chains.
- [ ] No unused imports or vars. No default exports for components/hooks — named only.

## Quality gates (before done)

- [ ] `npm run lint` passes.
- [ ] No type errors (`tsc` clean / IDE clean).
- [ ] No `console.log` left in committed code.
- [ ] New logic is small enough to read without a diagram; if not, split it.

## Errors & async

- [ ] Handle the error path in every async hook (`status: 'error'`).
- [ ] Never swallow errors silently. Surface via state or an error boundary.
- [ ] Clean up subscriptions/tim/listeners in `useEffect` cleanup.
