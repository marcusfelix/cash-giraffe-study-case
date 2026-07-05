import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/text';
import { Icon } from '@/components/icons';
import { color, fontFamily, fontSize, radius, spacing } from '@/theme';
import { formatGems } from '@/lib/format';
import { useGame } from '../hooks/use-game';
import { completeTask } from '../api';
import type { Task, User, GemTransaction } from '@/types';

const PEEK_HEIGHT = 100;

type Props = {
  gameId: string | null;
  task: Task | null;
  visible: boolean;
  isCompleted?: boolean;
  onClose: () => void;
  onComplete?: (taskId: string, result: { user: User; transaction: GemTransaction }) => void;
};

export function GameSheet({ gameId, task, visible, isCompleted = false, onClose, onComplete }: Props) {
  const game = useGame(gameId);
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const backdropAnim = useRef(new Animated.Value(0)).current;
  const [completing, setCompleting] = useState(false);

  function handleModalShow() {
    backdropAnim.stopAnimation();
    Animated.timing(backdropAnim, {
      toValue: 1,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }

  useEffect(() => {
    if (!visible) {
      backdropAnim.stopAnimation();
      backdropAnim.setValue(0);
      setCompleting(false);
    }
  }, [visible, backdropAnim]);

  async function handleStartPlaying() {
    if (!task || completing || isCompleted) return;
    setCompleting(true);
    try {
      const result = await completeTask(task.id);
      onComplete?.(task.id, result);
      onClose();
    } catch {
      onClose();
    } finally {
      setCompleting(false);
    }
  }

  const isLoading = game.status === 'idle' || game.status === 'loading';

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      onShow={handleModalShow}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[StyleSheet.absoluteFillObject, styles.backdrop, { opacity: backdropAnim }]}
          pointerEvents="none"
        />

        <Pressable style={styles.peekArea} onPress={onClose} />

        <View style={[styles.sheet, { height: windowHeight - PEEK_HEIGHT, paddingBottom: insets.bottom }]}>
          {isLoading && (
            <View style={styles.loadingState}>
              <ActivityIndicator size="large" color={color.accent} />
            </View>
          )}

          {game.status === 'error' && (
            <View style={styles.loadingState}>
              <Text preset="body" muted>Could not load game details.</Text>
            </View>
          )}

          {game.status === 'success' && game.data && task && (
            <>
              <ScrollView showsVerticalScrollIndicator={false} bounces={false} style={styles.scroll}>
                <View style={styles.bannerContainer}>
                  <Image
                    source={{ uri: game.data.bannerUrl }}
                    style={styles.bannerImage}
                    resizeMode="cover"
                  />
                  <Pressable
                    onPress={onClose}
                    style={({ pressed }) => [styles.closeButton, pressed && styles.closePressed]}
                    hitSlop={8}
                  >
                    <Text style={styles.closeSymbol}>✕</Text>
                  </Pressable>
                </View>

                <View style={styles.content}>
                  <Text preset="heading">{game.data.title}</Text>
                  <Text preset="body" muted style={styles.description}>
                    {game.data.description}
                  </Text>

                  <View style={styles.rewardRow}>
                    <Text preset="label" muted style={styles.rewardLabel}>Task reward</Text>
                    <View style={styles.rewardValue}>
                      <Icon name="gem" size={18} color={color.gem} />
                      <Text style={styles.rewardAmount}>{formatGems(task.reward)}</Text>
                      {task.bonus && new Date(task.bonus.expiresAt) > new Date() && (
                        <Text style={styles.bonusAmount}>+{formatGems(task.bonus.reward)}</Text>
                      )}
                    </View>
                  </View>
                </View>
              </ScrollView>

              <Pressable
                style={({ pressed }) => [
                  styles.startButton,
                  (isCompleted || completing) && styles.startButtonDone,
                  pressed && !isCompleted && !completing && styles.startButtonPressed,
                ]}
                onPress={handleStartPlaying}
                disabled={isCompleted || completing}
              >
                {completing ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.startLabel}>
                    {isCompleted ? 'Completed' : 'Start playing'}
                  </Text>
                )}
              </Pressable>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  peekArea: {
    flex: 1,
  },
  sheet: {
    backgroundColor: color.bg,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    overflow: 'hidden',
  },
  loadingState: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
  },
  bannerContainer: {
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: 200,
    backgroundColor: color.border,
  },
  closeButton: {
    position: 'absolute',
    top: spacing[4],
    right: spacing[4],
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: 'rgba(0,0,0,0.40)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closePressed: {
    opacity: 0.75,
  },
  closeSymbol: {
    color: '#FFFFFF',
    fontSize: fontSize.sm,
    fontFamily: fontFamily.bold,
    lineHeight: 18,
  },
  content: {
    padding: spacing[5],
    gap: spacing[3],
  },
  description: {
    lineHeight: 24,
  },
  rewardRow: {
    marginTop: spacing[2],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    backgroundColor: color.surface,
    borderRadius: radius.md,
  },
  rewardLabel: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  rewardValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  rewardAmount: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: color.gem,
  },
  bonusAmount: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.semibold,
    color: color.warning,
  },
  startButton: {
    margin: spacing[4],
    paddingVertical: spacing[5],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.accent,
    borderRadius: radius.md,
    borderWidth: 2,
    borderBottomWidth: 6,
    borderColor: color.accentDark,
  },
  startButtonDone: {
    backgroundColor: color.stepDeactivated,
    borderColor: color.stepDeactivatedDark,
  },
  startButtonPressed: {
    opacity: 0.85,
  },
  startLabel: {
    fontSize: fontSize.lg,
    fontFamily: fontFamily.bold,
    color: '#FFFFFF',
  },
});
