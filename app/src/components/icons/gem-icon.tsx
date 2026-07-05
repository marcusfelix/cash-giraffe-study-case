import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = { size?: number };

export function GemIcon({ size = 24 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2L17 8H7L12 2Z" fill="#4ADE80" />
      <Path d="M7 8L12 22L17 8H7Z" fill="#22C55E" />
      <Path d="M7 8L2 13L12 22L7 8Z" fill="#16A34A" />
      <Path d="M17 8L22 13L12 22L17 8Z" fill="#15803D" />
      <Path d="M2 13L7 8H17L22 13L12 22L2 13Z" fill="none" />
    </Svg>
  );
}
