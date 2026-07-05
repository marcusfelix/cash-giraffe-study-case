import React from 'react';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';

type Props = { size?: number };

export function BoostIcon({ size = 24 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Flask neck */}
      <Rect x="10" y="3" width="4" height="9" rx="1" fill="#6D28D9" />
      {/* Rim/opening */}
      <Rect x="9" y="2" width="6" height="3" rx="1.5" fill="#7C3AED" />
      {/* Flask body */}
      <Circle cx="12" cy="16" r="7" fill="#6D28D9" />
      {/* Liquid fill */}
      <Path
        d="M5.2,17 C5.7,20.6 8.6,23 12,23 C15.4,23 18.3,20.6 18.8,17 Z"
        fill="#A855F7"
      />
      {/* Mid liquid layer */}
      <Path
        d="M5.1,15.5 C5,15.8 5,16.1 5,16.4 L19,16.4 C19,16.1 19,15.8 18.9,15.5 Z"
        fill="#C084FC"
      />
      {/* Neck liquid */}
      <Rect x="11" y="4" width="2" height="8" rx="0.5" fill="#A855F7" />
      {/* Body highlight */}
      <Ellipse
        cx="9" cy="13"
        rx="2" ry="1.5"
        fill="white" fillOpacity={0.25}
        transform="rotate(-25, 9, 13)"
      />
      {/* Neck highlight */}
      <Rect x="11.5" y="4" width="1" height="7" rx="0.5" fill="white" fillOpacity={0.2} />
      {/* Bubbles */}
      <Circle cx="10.5" cy="18" r="1.1" fill="#E9D5FF" fillOpacity={0.75} />
      <Circle cx="14" cy="20" r="0.8" fill="#F3E8FF" fillOpacity={0.7} />
      <Circle cx="12.5" cy="15.5" r="0.6" fill="#F5F3FF" fillOpacity={0.9} />
    </Svg>
  );
}
