import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { spacing, fontSize, fontFamily, color } from '@/theme';
import { Icon } from '@/components/icons';
import { Text } from '@/components/text';
import { formatGems, formatBoost } from '@/lib/format';
import type { Counters } from '@/types';

type Props = { counters: Counters };

export function CounterBar({ counters }: Props) {
  return (
    <View style={styles.row}>
      <CounterItem
        icon={<Icon name="flame" size={36} />}
        value={String(counters.streak)}
        color="#F97316"
      />
      <CounterItem
        icon={<Icon name="boost" size={36} />}
        value={formatBoost(counters.boost)}
        color="#A855F7"
      />
      <AnimatedGemCounter gems={counters.gems} />
    </View>
  );
}

function AnimatedGemCounter({ gems }: { gems: number }) {
  const animRef = useRef(new Animated.Value(gems)).current;
  const [display, setDisplay] = useState(gems);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const listenerId = animRef.addListener(({ value }) => setDisplay(Math.round(value)));
    return () => animRef.removeListener(listenerId);
  }, [animRef]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      animRef.setValue(gems);
      setDisplay(gems);
      return;
    }
    Animated.timing(animRef, {
      toValue: gems,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [gems, animRef]);

  return (
    <CounterItem
      icon={<Icon name="gem" size={36} />}
      value={formatGems(display)}
      color="#22C55E"
    />
  );
}

function CounterItem({ icon, value, color }: { icon: React.ReactNode; value: string; color: string }) {
  return (
    <View style={styles.item}>
      {icon}
      <Text style={[styles.value, { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: color.border,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    minHeight: 44,
  },
  value: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.bold,
  },
});
