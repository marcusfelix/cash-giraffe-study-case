import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = { size?: number };

export function FlameIcon({ size = 24 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Outer body — deep red base */}
      <Path
        d="M12 2C10 5 6 8.5 6 13.5C6 18.1 8.7 22 12 22C15.3 22 18 18.1 18 13.5C18 8.5 14 5 12 2Z"
        fill="#EF4444"
      />
      {/* Main orange flame */}
      <Path
        d="M12 5C10.5 7.5 8 10.5 8 14C8 17.3 9.8 20 12 20C14.2 20 16 17.3 16 14C16 10.5 13.5 7.5 12 5Z"
        fill="#F97316"
      />
      {/* Bright amber inner flame */}
      <Path
        d="M12 9C11 11 10 13 10 15C10 17 10.9 19 12 19C13.1 19 14 17 14 15C14 13 13 11 12 9Z"
        fill="#FBBF24"
      />
      {/* Hot yellow core */}
      <Path
        d="M12 13C11.2 14.5 11 15.5 11 16.5C11 17.9 11.4 19 12 19C12.6 19 13 17.9 13 16.5C13 15.5 12.8 14.5 12 13Z"
        fill="#FEF08A"
      />
      {/* Bright tip highlight */}
      <Path
        d="M12 16C11.5 17 11.5 18 12 18.5C12.5 18 12.5 17 12 16Z"
        fill="#FFFBEB"
      />
    </Svg>
  );
}
