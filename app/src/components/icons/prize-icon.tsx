import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { color } from '@/theme/tokens';

type Props = { size?: number; active?: boolean };

export function PrizeIcon({ size = 24, active = false }: Props) {
  const cup = active ? color.accent : '#9CA3AF';
  const detail = active ? color.accentLight : '#E5E7EB';
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6,3 L6,13 C6,17.4 8.7,20.5 12,21.2 C15.3,20.5 18,17.4 18,13 L18,3 Z"
        fill={cup}
      />
      <Path
        d="M6,6 L3,6 L3,11 C3,13.8 4.3,15.2 6,15.5"
        stroke={cup} strokeWidth={2} fill="none" strokeLinecap="round"
      />
      <Path
        d="M18,6 L21,6 L21,11 C21,13.8 19.7,15.2 18,15.5"
        stroke={cup} strokeWidth={2} fill="none" strokeLinecap="round"
      />
      <Path d="M10,21 L10,22.5 L14,22.5 L14,21" stroke={cup} strokeWidth={1.5} fill="none" />
      <Path d="M8,22.5 L16,22.5" stroke={cup} strokeWidth={2.5} strokeLinecap="round" />
      <Path
        d="M12,7 L12.7,9.1 L15,9.1 L13.2,10.4 L13.8,12.5 L12,11.2 L10.2,12.5 L10.8,10.4 L9,9.1 L11.3,9.1 Z"
        fill={detail}
      />
    </Svg>
  );
}
