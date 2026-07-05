import React from 'react';
import { Image, StyleSheet, View, useWindowDimensions } from 'react-native';
import { TrailNode, COIN_HEIGHT } from './trail-node';
import { Text } from '@/components/text';
import { color, fontSize, fontFamily, radius, spacing } from '@/theme';
import { formatGems } from '@/lib/format';
import type { Game, Task } from '@/types';

const GROUP_SIZE = 5;
const VERTICAL_GAP = 92 - COIN_HEIGHT;
const BASE = 0.30;
const PEAK_IDX = Math.floor(GROUP_SIZE / 2);
const ICON_SIZE = 64;
// Coin width from CoinButton — used for label placement
const COIN_W = 80;

const PEAK_CENTER_Y = PEAK_IDX * (COIN_HEIGHT + VERTICAL_GAP) + COIN_HEIGHT / 2;
const ICON_TOP = PEAK_CENTER_Y - ICON_SIZE / 2;

function arcFactor(i: number, total: number): number {
  const t = i / (total - 1);
  const u = t <= 0.5 ? 2 * t : 2 * (1 - t);
  const curve = 1 - (1 - u) * (1 - u);
  return BASE + (1 - BASE) * curve;
}

type Props = {
  game: Game;
  completedTaskIds: string[];
  arcDirection: 'left' | 'right';
  onNodePress: (task: Task) => void;
};

export function TrailGroup({ game, completedTaskIds, arcDirection, onNodePress }: Props) {
  const { width } = useWindowDimensions();
  const refWidth = Math.min(width, 430);
  const maxOffset = refWidth * 0.20;

  const hasStartedGame = game.tasks.some(t => completedTaskIds.includes(t.id));
  const nodes = Array.from({ length: GROUP_SIZE }, (_, i) => game.tasks[i] ?? null);

  // Icon sits on the OPPOSITE side of the arc — more open space there.
  // Offset inward by ICON_SIZE so it's closer to the trail rather than the outer edge.
  const iconOnLeft = arcDirection === 'right';

  // Task labels sit on the open-space side (opposite to arc, same side as the game icon).
  const labelOnLeft = arcDirection === 'right';

  return (
    <View style={styles.group}>
      {nodes.map((task, i) => {
        const factor = arcFactor(i, GROUP_SIZE);
        const offset = factor * maxOffset * (arcDirection === 'left' ? -1 : 1);
        const completed = task ? completedTaskIds.includes(task.id) : false;
        const locked = task === null;
        const inactive = !locked && !completed && !hasStartedGame;

        return (
          <View
            key={i}
            style={[
              styles.nodeWrapper,
              i > 0 && { marginTop: VERTICAL_GAP },
              { transform: [{ translateX: offset }] },
            ]}
          >
            <TrailNode
              completed={completed}
              locked={locked}
              inactive={inactive}
              onPress={task ? () => onNodePress(task) : undefined}
            />

            {/* Task label — arc side, won't conflict with game icon on opposite side */}
            {task && (
              <View
                pointerEvents="none"
                style={[styles.taskLabel, labelOnLeft ? styles.taskLabelLeft : styles.taskLabelRight]}
              >
                <Text style={styles.taskTitle} numberOfLines={2}>{task.title}</Text>
                <Text style={styles.taskReward}>+{formatGems(task.reward)}</Text>
              </View>
            )}
          </View>
        );
      })}

      {/* Game icon — opposite side of arc, offset inward toward the trail */}
      <View
        pointerEvents="none"
        style={[
          styles.gameLabel,
          iconOnLeft
            ? { left: ICON_SIZE }
            : { right: ICON_SIZE },
          { top: ICON_TOP },
        ]}
      >
        <Image source={{ uri: game.iconUrl }} style={styles.gameIcon} />
        <Text style={styles.gameName} numberOfLines={2}>{game.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  nodeWrapper: {
    alignItems: 'center',
  },
  taskLabel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 68,
    justifyContent: 'center',
    gap: 2,
  },
  taskLabelLeft: {
    // Right edge 8px from coin's left edge
    right: COIN_W + 8,
    alignItems: 'flex-end',
  },
  taskLabelRight: {
    // Left edge 8px from coin's right edge
    left: COIN_W + 8,
    alignItems: 'flex-start',
  },
  taskTitle: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    color: color.stepDeactivatedDark,
    lineHeight: 15,
  },
  taskReward: {
    fontSize: 10,
    fontFamily: fontFamily.semibold,
    color: color.gem,
  },
  gameLabel: {
    position: 'absolute',
    alignItems: 'center',
    width: 72,
    gap: spacing[1],
  },
  gameIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: radius.lg,
  },
  gameName: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.semibold,
    textAlign: 'center',
    color: color.textMuted,
  },
});
