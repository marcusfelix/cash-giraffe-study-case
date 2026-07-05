import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { spacing, radius } from '@/theme';
import { Icon } from '@/components/icons';

type Props = {
  bannerUrl: string;
  onBack: () => void;
};

export function GameBanner({ bannerUrl, onBack }: Props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: bannerUrl }} style={styles.image} resizeMode="cover" />
      <Pressable
        onPress={onBack}
        style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        hitSlop={8}
      >
        <Icon name="back" size={24} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 220,
    backgroundColor: '#E5E7EB',
  },
  backButton: {
    position: 'absolute',
    top: spacing[4],
    left: spacing[4],
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});
