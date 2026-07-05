import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { color, radius, spacing } from '@/theme';

type Props = ViewProps & {
  children: React.ReactNode;
};

export function Card({ children, style, ...rest }: Props) {
  return (
    <View style={[styles.card, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing[4],
    borderRadius: radius.lg,
    backgroundColor: color.surface,
  },
});
