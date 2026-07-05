import React from 'react';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { color } from '@/theme/tokens';

type Props = { size?: number; active?: boolean };

export function RewardsIcon({ size = 24, active = false }: Props) {
  const fill = active ? color.accent : '#9CA3AF';
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="4" y="11" width="16" height="10" rx="2" fill={fill} />
      <Rect x="3" y="8" width="18" height="4" rx="2" fill={fill} />
      <Path d="M12 8C12 8 9 5 9 4C9 3 10 2 12 4C14 2 15 3 15 4C15 5 12 8 12 8Z" fill={active ? color.accentLight : '#E5E7EB'} />
      <Circle cx="12" cy="15" r="2" fill="white" />
    </Svg>
  );
}
