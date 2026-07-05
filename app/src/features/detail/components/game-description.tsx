import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '@/theme';
import { Text } from '@/components/text';

type Props = {
  title: string;
  description: string;
};

export function GameDescription({ title, description }: Props) {
  return (
    <View style={styles.container}>
      <Text preset="heading">{title}</Text>
      <Text preset="body" muted style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[5],
    gap: spacing[3],
  },
  description: {
    lineHeight: 24,
  },
});
