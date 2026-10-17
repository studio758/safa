import { useState } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button } from '../ds/Button';
import { Eyebrow } from '../ds/display';
import { Sheet } from '../ds/feedback';
import { SegmentedControl, TextField } from '../ds/forms';
import { IconButton } from '../ds/IconButton';
import { useSafa } from '../state/SafaState';
import { color, type } from '../theme/tokens';
import { Scroller, TAB_CONTENT } from './shared';

export function SettingsScreen() {
  const { state: s, setName, setHemisphere, replay, clearAll } = useSafa();
  const [confirming, setConfirming] = useState(false);

  const showWelcome = () => {
    replay();
    router.push('/onboarding');
  };

  const deleteEverything = async () => {
    setConfirming(false);
    const ok = await clearAll();
    if (ok) router.replace('/onboarding');
  };

  return (
    <View style={{ flex: 1, backgroundColor: color.bgCanvas }}>
      <View style={{ height: 52, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 8 }}>
        <IconButton icon="chevron-left" label="Back" onPress={() => router.back()} />
        <Text accessibilityRole="header" style={[type.h3, { color: color.textHeading }]}>Settings</Text>
      </View>

      <Scroller contentStyle={[TAB_CONTENT, { paddingTop: 8 }]}>
        <View style={{ marginBottom: 12 }}>
          <Eyebrow tone="muted">Profile</Eyebrow>
        </View>
        <TextField label="Name" value={s.name} onChange={setName} placeholder="First name (optional)" hint="Used only to greet you. Stored on this device." />

        <View style={{ height: 32 }} />
        <View style={{ marginBottom: 12 }}>
          <Eyebrow tone="muted">Hemisphere</Eyebrow>
        </View>
        <SegmentedControl
          options={['Northern', 'Southern']}
          value={s.settings.hemisphere}
          onChange={v => setHemisphere(v === 'Southern' ? 'Southern' : 'Northern')}
        />
        <Text style={[type.caption, { color: color.textMuted, marginTop: 10 }]}>
          Seasons follow this hemisphere until you choose a region in Stage 4.
        </Text>

        <View style={{ height: 32 }} />
        <View style={{ marginBottom: 12 }}>
          <Eyebrow tone="muted">Welcome</Eyebrow>
        </View>
        <Button variant="secondary" fullWidth icon="rotate-left" onPress={showWelcome}>
          Show welcome again
        </Button>

        <View style={{ height: 32 }} />
        <View style={{ marginBottom: 12 }}>
          <Eyebrow tone="muted">Your data</Eyebrow>
        </View>
        <Text style={[type.body, { color: color.textBody, marginBottom: 14 }]}>
          Everything you save stays on this device. Nothing is sent to a server.
        </Text>
        <Button variant="secondary" fullWidth icon="trash" onPress={() => setConfirming(true)}>
          Clear all my data
        </Button>
      </Scroller>

      <Sheet open={confirming} onClose={() => setConfirming(false)} title="Clear all your data?">
        <Text style={[type.body, { color: color.textBody, marginBottom: 24 }]}>
          This removes your name, saved days, reflections and completed practices from this device. It cannot be undone.
        </Text>
        <Button variant="warm" fullWidth onPress={deleteEverything}>
          Delete everything
        </Button>
        <View style={{ height: 12 }} />
        <Button variant="secondary" fullWidth onPress={() => setConfirming(false)}>
          Cancel
        </Button>
      </Sheet>
    </View>
  );
}
