import React from 'react';
import { StyleSheet, View } from 'react-native';
import { color, spacing } from '@/theme';
import { Icon } from '@/components/icons';
import type { IconName } from '@/components/icons';

const NAV_ITEMS: { name: IconName }[] = [
  { name: 'home' },
  { name: 'tasks' },
  { name: 'prize' },
  { name: 'balance' },
  { name: 'profile' },
];

// TODO(dev): wire destinations when routes are defined
export function BottomNav() {
  return (
    <View style={styles.container}>
      {NAV_ITEMS.map((item, i) => (
        <View key={item.name} style={[styles.item, i !== 0 && styles.inactive]}>
          <Icon name={item.name} size={32} active={i === 0} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: color.border,
    backgroundColor: color.bg,
    paddingBottom: spacing[3],
    paddingTop: spacing[3],
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  inactive: {
    opacity: 0.4,
  },
});
