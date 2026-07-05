import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = { size?: number; filled?: boolean };

export function StarIcon({ size = 24, filled = false }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill={filled ? '#FBBF24' : '#E5E7EB'}
        stroke={filled ? '#F59E0B' : '#D1D5DB'}
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
