import { useEffect, type ReactNode } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Button } from '../ds/Button';
import { Eyebrow, PullQuote } from '../ds/display';
import { SegmentedControl, TextField } from '../ds/forms';
import { JourneySteps } from '../ds/almanac';
import { Wordmark } from '../ds/Wordmark';
import { useTween } from '../lib/useTween';
import { useSafa } from '../state/SafaState';
import { clip, color, type, wrap } from '../theme/tokens';

const JOURNEY = ['Welcome', 'You', 'Hemisphere'];

/** One onboarding page; fades and rises 12px in/out depending on which side of the current step it sits. */
function Step({ index, step, bottomPad, children }: { index: number; step: number; bottomPad: number; children: ReactNode }) {
  const v = useTween(index - step, { duration: 480 });
  return (
    <Animated.View
      pointerEvents={index === step ? 'auto' : 'none'}
      accessibilityElementsHidden={index !== step}
      importantForAccessibility={index === step ? 'auto' : 'no-hide-descendants'}
      style={[
        StyleSheet.absoluteFill,
        {
          paddingTop: 60,
          paddingHorizontal: 28,
          paddingBottom: bottomPad,
          opacity: v.interpolate({ inputRange: [-1, 0, 1], outputRange: [0, 1, 0], extrapolate: 'clamp' }),
          transform: [{ translateY: v.interpolate({ inputRange: [-1, 0, 1], outputRange: [-12, 0, 12], extrapolate: 'clamp' }) }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

export function Onboarding({ bottomInset }: { bottomInset: number }) {
  const { state: s, nextStep, endReplay, setName, setHemisphere } = useSafa();
  const bottomPad = Math.max(44, bottomInset + 16);
  const replaying = s.replaying;

  // When this flow was opened from Settings, closing it clears the replay flag so the gate behaves normally again.
  useEffect(() => () => endReplay(), [endReplay]);

  const finish = () => {
    nextStep();
    if (replaying) router.back();
  };

  return (
    <View style={[{ flex: 1 }, clip]}>
      <View style={{ position: 'absolute', top: 18, left: 28, right: 28, zIndex: 2 }}>
        <JourneySteps steps={JOURNEY} current={s.step} />
      </View>

      <Step index={0} step={s.step} bottomPad={bottomPad}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 48 }}>
          <Wordmark size={48} tagline />
          <PullQuote size={19} attribution="The Safa Promise">
            We are not here to change what you believe. We are here to share the beauty of how the world observes time.
          </PullQuote>
        </View>
        <View style={{ gap: 14, alignItems: 'center' }}>
          <Button size="lg" fullWidth onPress={nextStep}>Begin</Button>
          <Text style={[type.caption, { color: color.textMuted, textAlign: 'center' }]}>No religious affiliation or personal data required.</Text>
        </View>
      </Step>

      <Step index={1} step={s.step} bottomPad={bottomPad}>
        <View style={{ flex: 1, justifyContent: 'center', gap: 18 }}>
          <Eyebrow>You</Eyebrow>
          <Text accessibilityRole="header" style={[type.h1, wrap.balance, { color: color.textHeading }]}>What should we call you?</Text>
          <Text style={[type.body, { color: color.textBody, marginBottom: 8 }]}>
            Optional. Used only to greet you, and stored only on this device.
          </Text>
          <TextField label="Your name" value={s.name} onChange={setName} placeholder="First name (optional)" />
        </View>
        <Button size="lg" fullWidth onPress={nextStep}>Continue</Button>
      </Step>

      <Step index={2} step={s.step} bottomPad={bottomPad}>
        <View style={{ flex: 1, justifyContent: 'center', gap: 18 }}>
          <Eyebrow>Hemisphere</Eyebrow>
          <Text accessibilityRole="header" style={[type.h1, wrap.balance, { color: color.textHeading }]}>Where are you living through the seasons?</Text>
          <Text style={[type.body, { color: color.textBody, marginBottom: 8 }]}>One question, so autumn arrives for you when it actually arrives.</Text>
          <SegmentedControl
            options={['Northern', 'Southern']}
            value={s.settings.hemisphere}
            onChange={v => setHemisphere(v === 'Southern' ? 'Southern' : 'Northern')}
          />
        </View>
        <Button size="lg" fullWidth onPress={finish}>{replaying ? 'Done' : 'See today'}</Button>
      </Step>
    </View>
  );
}
