# How to create a task

We work task by task. Every unit of work gets a task file before any code.

## Rules

- [ ] One task = one file in `.context/tasks/`, named `NNN-short-slug.md`
      (e.g. `001-home-counter-bar.md`). Increment `NNN`.
- [ ] Two tracks share this folder: app tasks use `NNN-*`; backend (Go) tasks use
      `be-NNN-*`. Numbers are independent per track.
- [ ] Copy [TEMPLATE.md](./TEMPLATE.md). Fill every section. Delete nothing.
- [ ] Keep it as checklists and acceptance criteria — **no essays**.
- [ ] Scope small: one feature, one screen, or one clear change. Split if bigger.
- [ ] State intent and constraints; leave visual polish to the developer.

## A good task has

- [ ] **Goal** — one sentence, outcome-focused.
- [ ] **Scope / Out of scope** — explicit bullets so the agent won't drift.
- [ ] **Steps** — ordered todos the agent will check off.
- [ ] **Acceptance criteria** — testable statements; done = all true.
- [ ] **Dependencies** — new packages (with justification) or other tasks.
- [ ] **Notes for the developer** — what's left for their final touch.

## Agent rules while doing a task

- [ ] Read `app/AGENTS.md` and the linked docs first.
- [ ] Do only what's in scope. Anything new → a follow-up task, not scope creep.
- [ ] Follow the docs, not the Expo boilerplate.
- [ ] Update the task's checkboxes as you go; mark it done only when every
      acceptance criterion passes.
- [ ] Flag decisions that need a human with `// TODO(dev):` in code and a note in the task.

## Definition of done

- [ ] All acceptance criteria pass.
- [ ] Quality gates pass (see [../docs/typescript.md](../docs/typescript.md)).
- [ ] No out-of-scope changes.
- [ ] Developer notes written.
