import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabBar, type TabItem } from '../../ds/TabBar';
import { color } from '../../theme/tokens';

/** The five primary destinations, in order. Names match the route files in this folder. */
const TABS: TabItem<string>[] = [
  { id: 'index', label: 'Today', icon: 'sun' },
  { id: 'moon', label: 'Moon', icon: 'moon' },
  { id: 'nature', label: 'Nature', icon: 'leaf' },
  { id: 'rituals', label: 'Rituals', icon: 'hands-praying' },
  { id: 'sleep', label: 'Sleep', icon: 'bed' },
];

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: color.bgCanvas } }}
      tabBar={({ state, navigation }) => (
        <TabBar
          items={TABS}
          value={state.routes[state.index].name}
          onChange={id => navigation.navigate(id)}
          bottomInset={Math.max(insets.bottom, 26)}
        />
      )}
    >
      {TABS.map(t => (
        <Tabs.Screen key={t.id} name={t.id} />
      ))}
    </Tabs>
  );
}
