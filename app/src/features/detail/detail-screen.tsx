import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { Screen } from '@/components/screen';
import { Text } from '@/components/text';
import { Button } from '@/components/button';
import { color, spacing } from '@/theme';
import { GameBanner } from './components/game-banner';
import { GameDescription } from './components/game-description';
import { AppStoreButton } from './components/app-store-button';
import { useGame } from './hooks/use-game';

export function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const game = useGame(id);

  function handleBack() {
    router.back();
  }

  async function handleAppStore() {
    if (game.data?.appStoreUrl) {
      await WebBrowser.openBrowserAsync(game.data.appStoreUrl);
    }
  }

  if (game.status === 'idle' || game.status === 'loading') {
    return (
      <Screen style={styles.centered}>
        <ActivityIndicator size="large" color={color.accent} />
      </Screen>
    );
  }

  if (game.status === 'error' || !game.data) {
    return (
      <Screen style={styles.centered} padded>
        <Text preset="subheading">Could not load game</Text>
        <Button label="Go back" onPress={handleBack} variant="secondary" style={styles.btn} />
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <GameBanner bannerUrl={game.data.bannerUrl} onBack={handleBack} />
        <GameDescription title={game.data.title} description={game.data.description} />
        <AppStoreButton onPress={handleAppStore} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[3],
  },
  btn: {
    marginTop: spacing[4],
  },
});
