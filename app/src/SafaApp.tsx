import type { ReactNode } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from './ds/Icon';
import { Toast } from './ds/feedback';
import { useSafa } from './state/SafaState';
import { clip, color, font } from './theme/tokens';

/** The 9:41 / notch / signal row drawn inside the desktop phone frame. Decorative only. */
function FakeStatusBar() {
  return (
    <View style={styles.status}>
      <Text style={{ ...font('sans', 600, 15, 1), lineHeight: 18, color: color.textHeading }}>9:41</Text>
      <View style={styles.notch} />
      <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
        <Icon name="signal" size={13} color={color.textHeading} style={{ width: undefined }} />
        <Icon name="wifi" size={13} color={color.textHeading} style={{ width: undefined }} />
        <Icon name="battery-full" size={16} color={color.textHeading} style={{ width: undefined }} />
      </View>
    </View>
  );
}

/** A 390×844 phone frame, shown only in a wide desktop browser (review). */
function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: color.linen300 }} contentContainerStyle={styles.page}>
      <View style={styles.device} accessibilityLabel="Safa phone">
        <View style={styles.screen}>
          <FakeStatusBar />
          <View style={{ flex: 1, minHeight: 0 }}>{children}</View>
          <View pointerEvents="none" style={styles.homeIndicator} />
        </View>
      </View>
    </ScrollView>
  );
}

/**
 * Wraps every screen: the phone frame on desktop, safe areas on devices, and the
 * toast. Renders nothing until the saved data has loaded, so no screen flashes.
 */
export function AppFrame({ children }: { children: ReactNode }) {
  const { state: s } = useSafa();
  const { width } = useWindowDimensions();
  if (!s.ready) return null;

  const content = (
    <>
      {children}
      <View pointerEvents="none" style={styles.toastWrap}>
        <Toast message={s.toast} visible={s.toastOn} />
      </View>
    </>
  );

  if (Platform.OS === 'web' && width >= 520) return <PhoneFrame>{content}</PhoneFrame>;
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={[{ flex: 1, backgroundColor: color.bgCanvas }, clip]}>
      <StatusBar style="dark" />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 32, paddingHorizontal: 16 },
  device: { width: 390, height: 844, borderRadius: 54, backgroundColor: color.charcoal900, padding: 11, boxShadow: '0px 30px 60px rgba(43,42,39,0.18)' },
  screen: { flex: 1, borderRadius: 44, backgroundColor: color.bgCanvas, ...clip },
  status: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 36,
    paddingRight: 30,
    backgroundColor: color.bgCanvas,
    zIndex: 80,
  },
  notch: { position: 'absolute', left: '50%', top: 11, marginLeft: -60, width: 120, height: 34, borderRadius: 20, backgroundColor: '#111' },
  homeIndicator: { position: 'absolute', left: '50%', bottom: 8, marginLeft: -67, width: 134, height: 5, borderRadius: 3, backgroundColor: color.charcoal900, zIndex: 90 },
  toastWrap: { position: 'absolute', left: 0, right: 0, bottom: 112, zIndex: 60, alignItems: 'center' },
});
