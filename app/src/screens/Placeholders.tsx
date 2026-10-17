import { Text } from 'react-native';
import { Eyebrow } from '../ds/display';
import { color, type } from '../theme/tokens';
import { ScreenTitle, Scroller, TAB_CONTENT } from './shared';

/**
 * Honest empty states for destinations whose content arrives in a later stage.
 * They describe what is coming and never pretend the feature exists yet.
 */
function Stage({ eyebrow, title, body, note, stage }: { eyebrow: string; title: string; body: string; note?: string; stage: number }) {
  return (
    <Scroller contentStyle={TAB_CONTENT}>
      <Eyebrow tone="muted">{eyebrow}</Eyebrow>
      <ScreenTitle style={{ marginTop: 8, marginBottom: 22 }}>{title}</ScreenTitle>
      <Text style={[type.body, { color: color.textBody }]}>{body}</Text>
      {note ? <Text style={[type.caption, { color: color.textMuted, marginTop: 16 }]}>{note}</Text> : null}
      <Text style={[type.caption, { color: color.textFaint, marginTop: 24 }]}>Arrives in Stage {stage}.</Text>
    </Scroller>
  );
}

export function MoonPlaceholder() {
  return (
    <Stage
      eyebrow="Moon"
      title="Moon"
      body="Current phase, the lunar cycle, a moon calendar and clearly labelled traditional interpretations."
      note="Demo content: the moon phases shown on Today are typed-in sample rows, not calculations. Stage 2 replaces them with verified lunar calculations."
      stage={3}
    />
  );
}

export function NaturePlaceholder() {
  return (
    <Stage
      eyebrow="Nature"
      title="Nature"
      body="Seasonal guidance for your region, planting and pruning windows, and wildlife notes."
      note="Nature guidance needs a region, which you will choose in Stage 4. Until then, Today shows general seasonal notes only."
      stage={4}
    />
  );
}

export function SleepPlaceholder() {
  return (
    <Stage
      eyebrow="Sleep"
      title="Sleep"
      body="Bedtime stories, nature soundscapes, calm music and an evening ritual, with a simple player and sleep timer."
      note="No licensed audio is included yet. Stage 7 adds clearly labelled placeholder tracks."
      stage={7}
    />
  );
}
