import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '@/theme';
import { Button } from '@/components/button';
import { Icon } from '@/components/icons';

type Props = {
  onPress: () => void;
};

export function AppStoreButton({ onPress }: Props) {
  return (
    <View style={styles.container}>
      <Button
        label="Get on App Store"
        onPress={onPress}
        icon={<Icon name="external-link" size={18} color="#FFFFFF" />}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[6],
  },
  button: {
    width: '100%',
  },
});
