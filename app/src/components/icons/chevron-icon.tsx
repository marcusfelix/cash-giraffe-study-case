import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = { size?: number; direction?: 'left' | 'right' | 'up' | 'down' };

const rotations: Record<NonNullable<Props['direction']>, string> = {
  right: 'rotate(0)',
  down: 'rotate(90)',
  left: 'rotate(180)',
  up: 'rotate(270)',
};

export function ChevronIcon({ size = 24, direction = 'right' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 6L15 12L9 18"
        stroke="#6B7280"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform={`translate(12,12) ${rotations[direction]} translate(-12,-12)`}
      />
    </Svg>
  );
}
