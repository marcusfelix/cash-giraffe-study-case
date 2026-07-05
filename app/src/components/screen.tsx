import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color, spacing } from '@/theme';

type Props = ViewProps & {
  children: React.ReactNode;
  padded?: boolean;
};

export function Screen({ children, padded = false, style, ...rest }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.container, padded && styles.padded, style]} {...rest}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: color.bg,
  },
  container: {
    flex: 1,
    backgroundColor: color.bg,
  },
  padded: {
    paddingHorizontal: spacing[4],
  },
});
