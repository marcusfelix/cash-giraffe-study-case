import React from 'react';
import Svg, { Rect } from 'react-native-svg';
import { color } from '@/theme/tokens';

type Props = { size?: number; active?: boolean };

export function BalanceIcon({ size = 24, active = false }: Props) {
  const fill = active ? color.accent : '#9CA3AF';
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="2" y="5" width="20" height="14" rx="3" fill={fill} />
      <Rect x="2" y="9" width="20" height="4" fill={active ? color.accentLight : '#D1D5DB'} />
      <Rect x="5" y="14" width="4" height="2" rx="1" fill="white" />
    </Svg>
  );
}
