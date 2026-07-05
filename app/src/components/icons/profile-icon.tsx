import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { color } from '@/theme/tokens';

type Props = { size?: number; active?: boolean };

export function ProfileIcon({ size = 24, active = false }: Props) {
  const fill = active ? color.accent : '#9CA3AF';
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="4" fill={fill} />
      <Path d="M4,21 C4,17.13 7.58,14 12,14 C16.42,14 20,17.13 20,21 Z" fill={fill} />
    </Svg>
  );
}
