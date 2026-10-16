import { BlurView } from 'expo-blur';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { color, font } from '../theme/tokens';
import { Icon } from './Icon';

export type TabItem<T extends string> = { id: T; label: string; icon: string; regular?: boolean };

type Props<T extends string> = { items: TabItem<T>[]; value: T; onChange: (id: T) => void; bottomInset: number };

/** Frosted linen tab bar (88% canvas + 14px blur). `bottomInset` replaces the design's 26px home-indicator gap. */
export function TabBar<T extends string>({ items, value, onChange, bottomInset }: Props<T>) {
  return (
    <View accessibilityRole="tablist" style={[styles.bar, { paddingBottom: bottomInset }]}>
      {Platform.OS === 'web' ? (
        <View style={[StyleSheet.absoluteFill, styles.webFrost]} />
      ) : (
        <BlurView intensity={40} tint="light" experimentalBlurMethod="dimezisBlurView" style={StyleSheet.absoluteFill} />
      )}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(247,245,240,0.88)' }]} />
      {items.map(it => {
        const on = it.id === value;
        const tint = on ? color.sage700 : color.stone500;
        return (
          <Pressable
            key={it.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            accessibilityLabel={it.label}
            onPress={() => onChange(it.id)}
            style={styles.item}
          >
            <Icon name={it.icon} variant={on || it.regular === false ? 'solid' : 'regular'} size={18} color={tint} style={{ width: undefined }} />
            <Text style={{ ...font('sans', on ? 500 : 400, 11, 1), lineHeight: 13, letterSpacing: 0.22, color: tint }}>{it.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: color.borderSubtle,
    overflow: 'hidden',
  },
  // react-native-web forwards unknown CSS; backdrop-filter gives the real frosted glass in the browser.
  webFrost: { backdropFilter: 'blur(14px)' } as object,
  item: { minWidth: 64, height: 48, alignItems: 'center', justifyContent: 'center', gap: 5 },
});
