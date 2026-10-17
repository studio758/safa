import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { IconButton } from '../ds/IconButton';
import { Eyebrow } from '../ds/display';
import { useSafa } from '../state/SafaState';
import { color, radius, type } from '../theme/tokens';
import { ScreenTitle, Scroller, TAB_CONTENT, card } from './shared';

/** "2026/10/17" → "Sat 17 Oct 2026". */
function formatKey(key: string) {
  const d = new Date(`${key.replace(/\//g, '-')}T12:00:00`);
  return Number.isNaN(d.getTime())
    ? key
    : d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

function formatWhen(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function Empty({ children }: { children: string }) {
  return <Text style={[type.small, { color: color.textMuted }]}>{children}</Text>;
}

export function Rituals() {
  const { state: s, showDay, removeSaved, deleteReflection } = useSafa();

  const savedDays = Object.keys(s.saved).filter(k => s.saved[k]).sort().reverse();
  const practices = Object.entries(s.practices).sort(([, a], [, b]) => b.at.localeCompare(a.at));

  const openDay = (key: string) => {
    showDay(key);
    router.navigate('/');
  };

  return (
    <Scroller contentStyle={TAB_CONTENT}>
      <Eyebrow tone="muted">Your rhythm</Eyebrow>
      <ScreenTitle style={{ marginTop: 8, marginBottom: 28 }}>Rituals</ScreenTitle>

      <View style={{ gap: 14 }}>
        <Eyebrow>Saved days</Eyebrow>
        {savedDays.length === 0 ? (
          <Empty>Tap the bookmark on Today to keep a day here.</Empty>
        ) : (
          savedDays.map(key => (
            <View key={key} style={[card, { flexDirection: 'row', alignItems: 'center', paddingLeft: 18, paddingRight: 6, paddingVertical: 6 }]}>
              <Pressable accessibilityRole="button" onPress={() => openDay(key)} style={{ flex: 1, paddingVertical: 10 }}>
                <Text style={[type.body, { color: color.textHeading }]}>{formatKey(key)}</Text>
              </Pressable>
              <IconButton icon="xmark" label="Remove from saved days" onPress={() => removeSaved(key)} />
            </View>
          ))
        )}
      </View>

      <View style={{ height: 36 }} />
      <View style={{ gap: 14 }}>
        <Eyebrow>Reflections</Eyebrow>
        {s.reflections.length === 0 ? (
          <Empty>Your written reflections from Today appear here, newest first. Nothing is written for you.</Empty>
        ) : (
          s.reflections.map(r => (
            <View key={r.id} style={[card, { padding: 18, gap: 10, borderRadius: radius.lg }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={[type.caption, { color: color.textMuted }]}>
                  {formatKey(r.dayKey)} · {formatWhen(r.createdAt)}
                </Text>
                <IconButton icon="trash" label="Delete reflection" onPress={() => deleteReflection(r.id)} />
              </View>
              {r.prompt ? <Text style={[type.small, { color: color.textSage }]}>{r.prompt}</Text> : null}
              <Text style={[type.blend, { color: color.textBody }]}>{r.text}</Text>
            </View>
          ))
        )}
      </View>

      <View style={{ height: 36 }} />
      <View style={{ gap: 14 }}>
        <Eyebrow>Ritual practices</Eyebrow>
        {practices.length === 0 ? (
          <Empty>Practices you complete on Today are recorded here, with the date you completed them.</Empty>
        ) : (
          practices.map(([key, p]) => (
            <View key={key} style={[card, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, paddingHorizontal: 18 }]}>
              <Text style={[type.body, { color: color.textHeading, flex: 1, paddingRight: 12 }]}>{p.title}</Text>
              <Text style={[type.caption, { color: color.textMuted }]}>{formatWhen(p.at)}</Text>
            </View>
          ))
        )}
      </View>
    </Scroller>
  );
}
