# Principles

How we work. Applies to every change.

## Simplicity first

- [ ] Solve the task, nothing more. No speculative abstractions or config.
- [ ] Prefer the boring, obvious solution over the clever one.
- [ ] Delete before you add. Fewer moving parts wins.
- [ ] If a file is getting hard to explain in one sentence, split it.

## Dependencies

- [ ] Do **not** install a package when a small amount of code does the job.
- [ ] Before adding any dependency, list: what it does, why the platform/stdlib
      can't, and its size/maintenance cost. Put this in the task.
- [ ] Never add state libraries (Redux, Zustand, MobX) or data-fetching libraries
      (React Query, SWR). We use custom hooks — see [state-management.md](./state-management.md).
- [ ] Prefer built-in React Native + Expo SDK APIs over third-party equivalents.

## Clean code

- [ ] Name things for what they do, not how. No abbreviations.
- [ ] Small functions, single responsibility, early returns over nesting.
- [ ] No commented-out code, no dead code, no TODO left unlinked to a task.
- [ ] Comments explain *why*, never *what*. Match the density of nearby code.

## Groundwork mindset

The agent lays the groundwork; the developer does the final UI touches.

- [ ] Leave clean seams: typed props, tokenized styles, isolated logic.
- [ ] No half-solutions that the developer has to unpick first.
- [ ] When a decision needs a human (visual detail, product copy), leave a
      clearly marked `// TODO(dev):` note instead of guessing.

## Boilerplate warning

- [ ] The current Expo starter files are **not** our patterns. Do not copy their
      structure, theming, or component style. Follow these docs instead.
