# Design system

A small, token-based system. Values follow Tailwind's scale so they are familiar
and consistent — but we do **not** install Tailwind/NativeWind unless a task
proves plain tokens are not enough (see [principles.md](./principles.md)).

## Rules

- [ ] Tokens live in `src/theme/tokens.ts`. Nothing else defines raw style values.
- [ ] Components read tokens — **no** hardcoded hex, px, or font sizes in JSX/StyleSheet.
- [ ] Reference tokens by name (`spacing[4]`, `color.text`), never by raw number.
- [ ] Add a token before using a new value; don't sneak one-off literals in.
- [ ] Keep the palette small and semantic. Add a shade only when a screen needs it.

## Token groups (Tailwind scale)

- [ ] `spacing` — 4px base: `1:4, 2:8, 3:12, 4:16, 5:20, 6:24, 8:32, 10:40, 12:48`.
- [ ] `radius` — `sm:6, md:10, lg:16, full:9999`.
- [ ] `fontSize` — `xs:12, sm:14, base:16, lg:18, xl:22, 2xl:28, 3xl:34`.
- [ ] `fontWeight` — `regular:'400', medium:'500', semibold:'600', bold:'700'`.
- [ ] `color` — semantic names, not raw palette, in components.

## Shape

```ts
// src/theme/tokens.ts
export const spacing = { 1:4, 2:8, 3:12, 4:16, 5:20, 6:24, 8:32, 10:40, 12:48 } as const;
export const radius  = { sm:6, md:10, lg:16, full:9999 } as const;
export const fontSize = { xs:12, sm:14, base:16, lg:18, xl:22, '2xl':28, '3xl':34 } as const;

export const color = {
  bg:        '#FFFFFF',
  surface:   '#F5F5F5',
  text:      '#111111',
  textMuted: '#6B7280',
  border:    '#E5E7EB',
  accent:    '#111111', // TODO(dev): brand color set later
} as const;
```

## Usage

- [ ] Style with `StyleSheet.create`, values from tokens only:

```ts
const styles = StyleSheet.create({
  card: {
    padding: spacing[4],
    borderRadius: radius.md,
    backgroundColor: color.surface,
  },
});
```

- [ ] Dark mode / theming: keep semantic names stable; swap the palette behind
      them later. Do not branch on color scheme inside components.
