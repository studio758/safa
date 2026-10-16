import { useState, type ReactNode } from 'react';
import { Animated, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTween } from '../lib/useTween';
import { color, font, motion, shadow, type } from '../theme/tokens';
import { Icon } from './Icon';

type SheetProps = { open: boolean; onClose: () => void; title?: string; children: ReactNode };

/** Bottom sheet that rises over the app (scrim 32% charcoal, 24px top radius). */
export function Sheet({ open, onClose, title, children }: SheetProps) {
  const [h, setH] = useState(1000);
  const scrim = useTween(open ? 1 : 0, { duration: motion.base, easing: motion.calm });
  const rise = useTween(open ? 0 : 1, { duration: motion.slow, easing: motion.settle });
  return (
    <View style={[StyleSheet.absoluteFill, { zIndex: 50 }]} pointerEvents={open ? 'auto' : 'none'}>
      <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: color.overlayScrim, opacity: scrim }]}>
        <Pressable accessibilityLabel="Close" style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.sheetWrap} pointerEvents="box-none">
        <Animated.View
          onLayout={e => setH(e.nativeEvent.layout.height)}
          style={[styles.sheet, { transform: [{ translateY: rise.interpolate({ inputRange: [0, 1], outputRange: [0, h * 1.04] }) }] }]}
        >
          <ScrollView bounces={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingTop: 12, paddingHorizontal: 24, paddingBottom: 36 }}>
            <View style={styles.grabber} />
            {title ? <Text style={[type.h2, { color: color.textHeading, marginBottom: 16 }]}>{title}</Text> : null}
            {children}
          </ScrollView>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}

export function Toast({ message, icon = 'check', visible = true }: { message: string; icon?: string; visible?: boolean }) {
  const v = useTween(visible ? 1 : 0, { duration: motion.base, easing: motion.calm });
  return (
    <Animated.View
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 999,
        backgroundColor: color.surfaceInverse,
        boxShadow: shadow.md,
        opacity: v,
        transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) }],
      }}
    >
      {icon ? <Icon name={icon} size={12} color={color.sage300} style={{ width: undefined }} /> : null}
      <Text style={{ ...font('sans', 400, 14, 1.2), color: color.textInverse }}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sheetWrap: { position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, justifyContent: 'flex-end' },
  sheet: {
    maxHeight: '86%',
    backgroundColor: color.bgCanvas,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    boxShadow: shadow.lg,
    overflow: 'hidden',
  },
  grabber: { width: 36, height: 4, borderRadius: 2, backgroundColor: color.stone300, alignSelf: 'center', marginBottom: 20 },
});
