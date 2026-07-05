export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  full: 9999,
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 22,
  '2xl': 28,
  '3xl': 34,
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const fontFamily = {
  regular: 'Rubik_400Regular',
  medium: 'Rubik_500Medium',
  semibold: 'Rubik_600SemiBold',
  bold: 'Rubik_700Bold',
} as const;

export const color = {
  // ─── Surface ───────────────────────────────────────────────────────────────
  bg:          '#FFFFFF',
  surface:     '#F7F7F7',
  border:      '#E5E7EB',

  // ─── Text ──────────────────────────────────────────────────────────────────
  text:        '#111111',
  textMuted:   '#6B7280',

  // ─── Accent (primary blue) ─────────────────────────────────────────────────
  accent:      '#38bdf8',  // sky-400
  accentLight: '#e0f2fe',  // sky-100
  accentDark:  '#0369a1',  // sky-700

  // ─── Gem economy ──────────────────────────────────────────────────────────
  gem:         '#22C55E',

  // ─── Trail step states ────────────────────────────────────────────────────
  stepActive:          '#FFC800',  // coin face
  stepActiveDark:      '#B28B00',  // coin extrusion / border
  stepDeactivated:     '#D1D5DB',  // locked coin face
  stepDeactivatedDark: '#9CA3AF',  // locked coin extrusion

  // ─── Semantic ─────────────────────────────────────────────────────────────
  warning:     '#F59E0B',
  error:       '#EF4444',
} as const;
