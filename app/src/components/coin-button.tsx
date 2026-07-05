import React, { useId } from 'react';
import Svg, { Circle, Defs, G, Mask, Path } from 'react-native-svg';
import { color } from '@/theme/tokens';

// ─── Geometry (matches the design SVG exactly) ────────────────────────────────

export const COIN_W = 80;
export const COIN_H = 82;

const FACE_PATH =
  'M44.4849 11.4564C63.8148 11.4564 79.4849 25.3356 79.4849 42.4564C79.4849 59.5772 63.8148 73.4564 44.4849 73.4564C25.1549 73.4564 9.48486 59.5772 9.48486 42.4564C9.48486 25.3356 25.1549 11.4564 44.4849 11.4564Z';
const EXTRUSION_PATH =
  'M9.48486 42.4564C9.48486 59.5772 25.1549 73.4564 44.4849 73.4564C63.8148 73.4564 79.4849 59.5772 79.4849 42.4564V50.9564C79.4849 68.0772 63.8148 81.9564 44.4849 81.9564C25.1549 81.9564 9.48486 68.0772 9.48486 50.9564V42.4564Z';

// Diagonal shine streaks (mask) and the inner-face ellipse they reveal
const SHINE_MASK_A = 'M36.7951 0L56.4495 14.3502L19.6544 60.7503L0 46.4001L36.7951 0Z';
const SHINE_MASK_B = 'M63.1058 18.6423L73.7558 26.4181L36.9607 72.8183L26.3107 65.0424L63.1058 18.6423Z';
const SHINE_FILL   = 'M73.331 42.4564C73.331 56.2635 60.4161 67.4564 44.4849 67.4564C28.5536 67.4564 15.6387 56.2635 15.6387 42.4564C15.6387 28.6493 28.5536 17.4564 44.4849 17.4564C60.4161 17.4564 73.331 28.6493 73.331 42.4564Z';

// Depth of the extrusion (face bottom 73.4564 → extrusion bottom 81.9564)
const EXTRUSION_H = 8.5;

// Icon paths were designed for a face centered at (35, 31); new face center is (44.485, 42.456)
const ICON_TX = 9.485;
const ICON_TY = 11.456;

// ─── Icons ────────────────────────────────────────────────────────────────────

export type CoinIcon = 'star' | 'rocket' | 'share' | 'prize';
type InternalIcon = CoinIcon | 'lock' | 'check';

// Star — exact path from the design SVG
const STAR =
  'M34.1348 19.4933C34.52 18.8284 35.48 18.8284 35.8652 19.4933L39.6424 26.012C39.802 26.2874 40.0832 26.4704 40.3997 26.5048L48.7204 27.4081C49.6127 27.5049 49.9355 28.6373 49.2284 29.1901L43.4209 33.7301C43.1164 33.9681 42.9764 34.3602 43.0611 34.7373L44.5547 41.3798C44.7353 42.1829 43.9225 42.848 43.171 42.5122L35.4081 39.0424C35.1484 38.9263 34.8516 38.9263 34.5919 39.0424L26.829 42.5122C26.0775 42.848 25.2647 42.1829 25.4453 41.3798L26.9389 34.7373C27.0236 34.3602 26.8836 33.9681 26.5791 33.7301L20.7716 29.1901C20.0645 28.6373 20.3873 27.5049 21.2796 27.4081L29.6003 26.5048C29.9168 26.4704 30.198 26.2874 30.3576 26.012L34.1348 19.4933Z';

// TODO(dev): refine rocket, share, prize art
const ROCKET_BODY   = 'M35,12 C40,12 43,18 43,28 L43,40 L27,40 L27,28 C27,18 30,12 35,12 Z';
const ROCKET_FIN_L  = 'M27,32 L20,42 L27,42 Z';
const ROCKET_FIN_R  = 'M43,32 L50,42 L43,42 Z';
const ROCKET_FLAME  = 'M30,40 Q35,48 40,40 Z';

const SHARE_ARROW   = 'M35,11 L42,20 L38,20 L38,32 L32,32 L32,20 L28,20 Z';
const SHARE_BOX     = 'M24,35 L24,48 L46,48 L46,35 L43,35 L43,45 L27,45 L27,35 Z';

const TROPHY_CUP    = 'M23,14 L23,30 C23,40 28,45 35,47 C42,45 47,40 47,30 L47,14 Z';
const TROPHY_STEM   = 'M31,47 L31,52 L28,54 L42,54 L39,52 L39,47 Z';
const TROPHY_BASE   = 'M26,54 L44,54 L44,57 L26,57 Z';
const TROPHY_HDL_L  = 'M23,20 L16,20 L16,29 C16,34 20,36 23,36';
const TROPHY_HDL_R  = 'M47,20 L54,20 L54,29 C54,34 50,36 47,36';

// Lock — small, centered at (35, 30) so it sits cleanly in the upper-center of the face
const LOCK_BODY    = 'M29,29 L29,41 Q29,42 30,42 L40,42 Q41,42 41,41 L41,29 Z';
const LOCK_SHACKLE = 'M31,29 L31,24 Q31,19 35,19 Q39,19 39,24 L39,29';

const CHECK         = 'M17,31 L29,44 L53,19';

function IconShape({ icon, color }: { icon: InternalIcon; color: string }) {
  switch (icon) {
    case 'star':
      return <Path d={STAR} fill={color} />;

    case 'rocket':
      return (
        <G>
          <Path d={ROCKET_BODY} fill={color} />
          <Path d={ROCKET_FIN_L} fill={color} />
          <Path d={ROCKET_FIN_R} fill={color} />
          <Circle cx={35} cy={25} r={5} fill="black" fillOpacity={0.2} />
          <Path d={ROCKET_FLAME} fill={color} fillOpacity={0.75} />
        </G>
      );

    case 'share':
      return (
        <G>
          <Path d={SHARE_ARROW} fill={color} />
          <Path d={SHARE_BOX} fill={color} />
        </G>
      );

    case 'prize':
      return (
        <G>
          <Path d={TROPHY_CUP} fill={color} />
          <Path d={TROPHY_HDL_L} stroke={color} strokeWidth={3.5} fill="none" strokeLinecap="round" />
          <Path d={TROPHY_HDL_R} stroke={color} strokeWidth={3.5} fill="none" strokeLinecap="round" />
          <Path d={TROPHY_STEM} fill={color} />
          <Path d={TROPHY_BASE} fill={color} />
        </G>
      );

    case 'lock':
      return (
        <G>
          <Path d={LOCK_BODY} fill={color} />
          <Path d={LOCK_SHACKLE} stroke={color} strokeWidth={3} fill="none" strokeLinecap="round" />
          <Circle cx={35} cy={35} r={2.5} fill="black" fillOpacity={0.25} />
        </G>
      );

    case 'check':
      return (
        <Path
          d={CHECK}
          stroke={color} strokeWidth={5}
          strokeLinecap="round" strokeLinejoin="round"
          fill="none"
        />
      );
  }
}

// ─── CoinButton ───────────────────────────────────────────────────────────────

type Props = {
  icon: InternalIcon;
  faceColor?: string;
  extrusionColor?: string;
  iconColor?: string;
  showExtrusion?: boolean;
  iconScale?: number;
};

export function CoinButton({
  icon,
  faceColor = color.stepActive,
  extrusionColor = color.stepActiveDark,
  iconColor = '#FFFFFF',
  showExtrusion = true,
  iconScale = 1,
}: Props) {
  // Unique mask ID per instance to avoid collisions when multiple coins render
  const uid = useId().replace(/:/g, '');
  const maskId = `coinMask_${uid}`;
  // When pressed (no extrusion), drop the face down by the extrusion depth
  const pressOffset = showExtrusion ? 0 : EXTRUSION_H;

  return (
    <Svg width={COIN_W} height={COIN_H} viewBox="0 0 80 82" fill="none">
      <Defs>
        <Mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="74" height="73">
          <Path d={SHINE_MASK_A} fill="white" />
          <Path d={SHINE_MASK_B} fill="white" />
        </Mask>
      </Defs>

      {/* Extrusion — the coin's visible side; removed in pressed state */}
      {showExtrusion && <Path d={EXTRUSION_PATH} fill={extrusionColor} />}

      {/* Face + icon + shine shift down by extrusion depth when pressed */}
      <G transform={pressOffset > 0 ? `translate(0, ${pressOffset})` : undefined}>
        <Path d={FACE_PATH} fill={faceColor} />
        <Path d={FACE_PATH} stroke={extrusionColor} />

        <G transform={`translate(${ICON_TX}, ${ICON_TY}) translate(35, 31) scale(${iconScale}) translate(-35, -31)`}>
          <IconShape icon={icon} color={iconColor} />
        </G>

        <G mask={`url(#${maskId})`}>
          <Path d={SHINE_FILL} fill="white" fillOpacity={0.5} />
        </G>
      </G>
    </Svg>
  );
}
