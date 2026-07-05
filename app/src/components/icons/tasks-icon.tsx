import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';
import { color } from '@/theme/tokens';

type Props = { size?: number; active?: boolean };

export function TasksIcon({ size = 24, active = false }: Props) {
  const fill = active ? color.accent : '#9CA3AF';
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="4" y="3" width="16" height="18" rx="3" fill={fill} />
      <Path d="M8 8H16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M8 12H16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M8 16H12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  );
}
