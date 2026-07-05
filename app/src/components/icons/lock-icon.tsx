import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

type Props = { size?: number };

export function LockIcon({ size = 24 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="5" y="11" width="14" height="10" rx="3" fill="#9CA3AF" />
      <Path
        d="M8 11V7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7V11"
        stroke="#9CA3AF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <Rect x="11" y="14" width="2" height="4" rx="1" fill="white" />
    </Svg>
  );
}
