import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from './ds/Icon';
import { TabBar, type TabItem } from './ds/TabBar';
import { JournalField } from './ds/forms';
import { Sheet, Toast } from './ds/feedback';
import { Button } from './ds/Button';
import { eventTypeLabel } from './data/engine';
import { Onboarding } from './screens/Onboarding';
import { GreetingComposer, ObservanceDetail } from './screens/Overlays';
import { Almanac, Journal, You } from './screens/Tabs';
import { Today } from './screens/Today';
import { SafaProvider, useSafa, type SafaConfig, type Tab } from './state/SafaState';
import { clip, color, font, type, wrap } from './theme/tokens';

const TABS: TabItem<Tab>[] = [
  { id: 'today', label: 'Today', icon: 'sun' },
  { id: 'almanac', label: 'Almanac', icon: 'calendar' },
  { id: 'journal', label: 'Journal', icon: 'bookmark' },
  { id: 'you', label: 'You', icon: 'user' },
];

/** Design-frame bottom gap under the tab bar (stands in for the home indicator area). */
const FRAME_BOTTOM = 26;

function AppBody({ bottomInset }: { bottomInset: number }) {
  const { state: s, day, setTab, closeLearn, closeJournal, setDraft, saveEntry, openObs } = useSafa();
  if (s.screen === 'onboarding') return <Onboarding bottomInset={bottomInset} />;

  return (
    <View style={[{ flex: 1, minHeight: 0 }, clip]}>
      {s.tab === 'today' ? <Today /> : s.tab === 'almanac' ? <Almanac /> : s.tab === 'journal' ? <Journal /> : <You />}

      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 20 }}>
        <TabBar items={TABS} value={s.tab} onChange={setTab} bottomInset={Math.max(FRAME_BOTTOM, bottomInset)} />
      </View>

      <ObservanceDetail bottomInset={bottomInset} />
      <GreetingComposer bottomInset={bottomInset} />

      <Sheet open={s.learnOpen} onClose={closeLearn} title={`About ${day.short}`}>
        <View style={{ gap: 18, marginBottom: 24 }}>
          {day.events.map(e => (
            <Pressable key={e.id} accessibilityRole="button" onPress={() => openObs(e.id)} style={{ gap: 4 }}>
              <Text style={{ ...font('sans', 500, 15, 1.3), color: color.textHeading }}>{e.name}</Text>
              <Text style={[type.caption, { color: color.textMuted }]}>{e.tradition} · {eventTypeLabel(e)}</Text>
              <Text style={[type.small, wrap.pretty, { color: color.textBody }]}>{e.meaning}</Text>
            </Pressable>
          ))}
          {day.moon ? (
            <View style={{ gap: 4 }}>
              <Text style={{ ...font('sans', 500, 15, 1.3), color: color.textHeading }}>{day.moon.moonPhase}</Text>
              <Text style={[type.small, { color: color.textBody }]}>{day.moon.meaning}</Text>
            </View>
          ) : null}
          <View style={{ gap: 4 }}>
            <Text style={{ ...font('sans', 500, 15, 1.3), color: color.textHeading }}>{day.nature.title}</Text>
            <Text style={[type.small, { color: color.textBody }]}>{day.nature.text}</Text>
          </View>
          <Text style={[type.caption, { color: color.textMuted }]}>
            {day.events.length ? 'Safa offers context respectfully. Read more from the communities who keep these days.' : 'On quiet days Safa follows the moon and the season.'}
          </Text>
        </View>
        <Button variant="secondary" fullWidth onPress={closeLearn}>Close</Button>
      </Sheet>

      <Sheet open={s.journalOpen} onClose={closeJournal} title="Reflect">
        <JournalField prompt={day.reflect} value={s.draft} onChange={setDraft} rows={6} />
        <View style={{ height: 20 }} />
        <Button fullWidth disabled={!s.draft.trim()} onPress={() => saveEntry(day.reflect)}>Save to journal</Button>
      </Sheet>

      <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, bottom: 104 + Math.max(0, bottomInset - FRAME_BOTTOM), zIndex: 60, alignItems: 'center' }}>
        <Toast message={s.toast} visible={s.toastOn} />
      </View>
    </View>
  );
}

/** The 9:41 / notch / signal row drawn inside the desktop phone frame. */
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

function PhoneFrame() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: color.linen300 }} contentContainerStyle={styles.page}>
      <View style={styles.device} accessibilityLabel="Safa phone">
        <View style={styles.screen}>
          <FakeStatusBar />
          <View style={{ flex: 1, minHeight: 0 }}>
            <AppBody bottomInset={0} />
          </View>
          <View pointerEvents="none" style={styles.homeIndicator} />
        </View>
      </View>
    </ScrollView>
  );
}

function DeviceApp() {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: color.bgCanvas }}>
      <StatusBar style="dark" />
      <AppBody bottomInset={insets.bottom} />
    </SafeAreaView>
  );
}

/**
 * Safa. On a desktop browser the app sits in a 390×844 phone frame, as in the
 * design; on phones (native, or a narrow browser) it fills the screen.
 */
export function SafaApp({ config }: { config?: SafaConfig }) {
  const { width } = useWindowDimensions();
  const framed = Platform.OS === 'web' && width >= 520;
  return <SafaProvider config={config}>{framed ? <PhoneFrame /> : <DeviceApp />}</SafaProvider>;
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
});
