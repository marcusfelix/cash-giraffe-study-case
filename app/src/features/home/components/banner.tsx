import React from 'react';
import { StyleSheet, View } from 'react-native';
import { color, spacing, radius } from '@/theme';
import { Text } from '@/components/text';

// TODO(dev): replace placeholder with real banner content
export function Banner() {
  return (
    <View style={styles.banner}>
      <Text preset="label" style={styles.text}>Featured</Text>
      <Text preset="subheading" style={styles.text}>Play & Earn Today</Text>
      <Text preset="caption" style={{...styles.text, ...{ color: color.accentLight }}}>Complete tasks to earn gems redeemable for real value.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    marginHorizontal: spacing[4],
    padding: spacing[4],
    borderRadius: radius.md,
    backgroundColor: color.accent,
    gap: spacing[1],
    borderWidth: 2,
    borderBottomWidth: 6,
    borderColor: color.accentDark,
  },
  text: {
    color: color.bg,
  },
});
