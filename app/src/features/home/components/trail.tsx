import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { spacing } from '@/theme';
import { TrailGroup } from './trail-group';
import type { Game, Task } from '@/types';

type Props = {
  games: Game[];
  completedTaskIds: string[];
  topPadding?: number;
  onNodePress: (gameId: string, task: Task) => void;
};

export function Trail({ games, completedTaskIds, topPadding = spacing[4], onNodePress }: Props) {
  return (
    <ScrollView
      contentContainerStyle={[styles.content, { paddingTop: topPadding }]}
      showsVerticalScrollIndicator={false}
    >
      {games.map((game, i) => (
        <View key={game.id} style={i > 0 && styles.groupSpacer}>
          <TrailGroup
            game={game}
            completedTaskIds={completedTaskIds}
            arcDirection={i % 2 === 0 ? 'left' : 'right'}
            onNodePress={(task: Task) => onNodePress(game.id, task)}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing[12],
    overflow: 'hidden',
  },
  groupSpacer: {
    marginTop: 24,
  },
});
