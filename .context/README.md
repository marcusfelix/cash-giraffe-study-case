# .context

Shared agent context for the whole project. Lives at the repo root, next to the
`app/` (Expo) and future backend (Go) folders so both sides read the same rules.

## Layout

- `docs/` — guidelines an agent must follow. Referenced from `app/AGENTS.md`.
- `tasks/` — how to write a task, plus the task template. Work is done task by task.

## Rules for this folder

- [ ] Keep docs as rules / checklists / todos. No essays.
- [ ] Code examples only when a rule is unclear without one.
- [ ] One subject per file. `AGENTS.md` is the index — do not dump everything into it.
- [ ] When guidance changes, edit the doc, not the copy inside `AGENTS.md`.
