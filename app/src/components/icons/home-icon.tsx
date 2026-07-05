import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { color } from '@/theme/tokens';

type Props = { size?: number; active?: boolean };

export function HomeIcon({ size = 24, active = false }: Props) {
  const fill = active ? color.accent : '#9CA3AF';
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 10L12 3L20 10V20C20 20.55 19.55 21 19 21H15V15H9V21H5C4.45 21 4 20.55 4 20V10Z" fill={fill} />
      <Rect x="10" y="15" width="4" height="6" rx="1" fill={active ? color.accentLight : '#E5E7EB'} />
    </Svg>
  );
}
