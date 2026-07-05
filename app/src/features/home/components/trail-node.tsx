import React from 'react';
import { Pressable } from 'react-native';
import { CoinButton, COIN_H, type CoinIcon } from '@/components/coin-button';
import { color } from '@/theme/tokens';

export { COIN_H as COIN_HEIGHT };

type Props = {
  icon?: CoinIcon;
  completed: boolean;
  locked: boolean;
  inactive?: boolean;
  onPress?: () => void;
};

export function TrailNode({ icon = 'star', completed, locked, inactive = false, onPress }: Props) {
  if (locked) {
    return (
      <CoinButton
        icon="lock"
        faceColor={color.stepDeactivated}
        extrusionColor={color.stepDeactivatedDark}
        iconColor="#FFFFFF"
      />
    );
  }

  if (inactive) {
    return (
      <Pressable onPress={onPress}>
        {({ pressed }) => (
          <CoinButton
            icon={icon}
            showExtrusion={!pressed}
            faceColor={color.stepDeactivated}
            extrusionColor={color.stepDeactivatedDark}
            iconColor="#FFFFFF"
          />
        )}
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <CoinButton
          icon={completed ? 'check' : icon}
          iconScale={completed ? 0.68 : 1}
          showExtrusion={!pressed}
          faceColor={color.stepActive}
          extrusionColor={color.stepActiveDark}
          iconColor="#FFFFFF"
        />
      )}
    </Pressable>
  );
}
