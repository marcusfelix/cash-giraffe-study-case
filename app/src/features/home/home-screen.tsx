import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Screen } from '@/components/screen';
import { Text } from '@/components/text';
import { Button } from '@/components/button';
import { color, spacing } from '@/theme';
import { CounterBar } from './components/counter-bar';
import { Banner } from './components/banner';
import { Trail } from './components/trail';
import { BottomNav } from './components/bottom-nav';
import { GameSheet } from './components/game-sheet';
import { useCounters } from './hooks/use-counters';
import { useGames } from './hooks/use-games';
import { useUser } from './hooks/use-user';
import type { GemTransaction, Task, User } from '@/types';

type SheetTarget = { gameId: string; task: Task };

export function HomeScreen() {
  const counters = useCounters();
  const games = useGames();
  const user = useUser();
  const [bannerH, setBannerH] = useState(96);
  const [sheetTarget, setSheetTarget] = useState<SheetTarget | null>(null);
  const [sheetVisible, setSheetVisible] = useState(false);

  // Local state that mirrors server state, updated optimistically after task completion
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [gemsBalance, setGemsBalance] = useState<number | null>(null);

  useEffect(() => {
    if (user.data) setCompletedTaskIds(user.data.completedTaskIds);
  }, [user.data]);

  const isLoading =
    counters.status === 'idle' || counters.status === 'loading' ||
    games.status === 'idle' || games.status === 'loading';
  const hasError = counters.status === 'error' || games.status === 'error';

  function handleNodePress(gameId: string, task: Task) {
    setSheetTarget({ gameId, task });
    setSheetVisible(true);
  }

  function handleSheetClose() {
    setSheetVisible(false);
  }

  function handleTaskComplete(_taskId: string, result: { user: User; transaction: GemTransaction }) {
    setCompletedTaskIds(result.user.completedTaskIds);
    setGemsBalance(result.user.gemBalance);
  }

  if (isLoading) {
    return (
      <Screen style={styles.centered}>
        <ActivityIndicator size="large" color={color.accent} />
      </Screen>
    );
  }

  if (hasError) {
    return (
      <Screen style={styles.centered} padded>
        <Text preset="subheading">Something went wrong</Text>
        <Text preset="body" muted>Could not load data.</Text>
        <Button
          label="Retry"
          onPress={() => { counters.refetch(); games.refetch(); }}
          style={styles.retryBtn}
        />
      </Screen>
    );
  }

  const displayCounters = counters.data
    ? { ...counters.data, gems: gemsBalance ?? counters.data.gems }
    : null;

  const currentTaskCompleted = sheetTarget
    ? completedTaskIds.includes(sheetTarget.task.id)
    : false;

  return (
    <Screen>
      <CounterBar counters={displayCounters!} />
      <View style={styles.trail}>
        <Trail
          games={games.data!}
          completedTaskIds={completedTaskIds}
          topPadding={bannerH + spacing[4]}
          onNodePress={handleNodePress}
        />
        <View
          style={styles.bannerFloat}
          onLayout={e => setBannerH(e.nativeEvent.layout.height)}
          pointerEvents="box-none"
        >
          <Banner />
        </View>
      </View>
      <BottomNav />

      <GameSheet
        gameId={sheetTarget?.gameId ?? null}
        task={sheetTarget?.task ?? null}
        visible={sheetVisible}
        isCompleted={currentTaskCompleted}
        onClose={handleSheetClose}
        onComplete={handleTaskComplete}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[3],
  },
  trail: {
    flex: 1,
  },
  bannerFloat: {
    position: 'absolute',
    top: spacing[4],
    left: 0,
    right: 0,
    zIndex: 10,
  },
  retryBtn: {
    marginTop: spacing[4],
  },
});
