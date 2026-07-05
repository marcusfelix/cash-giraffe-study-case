import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { color, fontSize, fontFamily } from '@/theme';

type Preset = 'heading' | 'subheading' | 'body' | 'caption' | 'label';

type Props = TextProps & {
  preset?: Preset;
  muted?: boolean;
  bold?: boolean;
};

export function Text({ preset = 'body', muted = false, bold = false, style, ...rest }: Props) {
  return (
    <RNText
      style={[
        styles.base,
        styles[preset],
        muted && styles.muted,
        bold && styles.bold,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    color: color.text,
    fontFamily: fontFamily.regular,
  },
  heading: {
    fontSize: fontSize['2xl'],
    fontFamily: fontFamily.bold,
  },
  subheading: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.semibold,
  },
  body: {
    fontSize: fontSize.base,
    fontFamily: fontFamily.regular,
  },
  caption: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
  },
  label: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
  },
  muted: {
    color: color.textMuted,
  },
  bold: {
    fontFamily: fontFamily.bold,
  },
});
