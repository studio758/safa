import { Animated, Image, Pressable, Text, View, type ImageSourcePropType } from 'react-native';
import { useTween } from '../lib/useTween';
import { color, font, motion, radius, type, wrap } from '../theme/tokens';
import { Icon } from './Icon';
import { Checkbox } from './forms';

export type ShapeKind = 'moon' | 'observance' | 'season' | 'nature';

/** Accent colour per kind of influence (moon → mauve, observance → terracotta, season → sage). */
export const KIND_COLOR: Record<ShapeKind, string> = {
  moon: color.mauve500,
  observance: color.terracotta500,
  season: color.sage500,
  nature: color.sage600,
};

type BlendHeroProps = { date: string; theme: string; blend: string; image?: ImageSourcePropType; cues?: string[] };

export function BlendHero({ date, theme, blend, image, cues = [] }: BlendHeroProps) {
  return (
    <View style={{ gap: 16 }}>
      {image ? <Image source={image} resizeMode="cover" style={{ height: 200, width: '100%', borderRadius: radius.lg }} /> : null}
      <Text style={[type.caption, { color: color.textMuted, letterSpacing: 12 * 0.02 }]}>{date}</Text>
      <Text accessibilityRole="header" style={[font('display', 500, 34, 1.12), wrap.balance, { color: color.textHeading, letterSpacing: -0.34 }]}>
        {theme}
      </Text>
      <Text style={[type.blend, wrap.pretty, { color: color.textBody }]}>{blend}</Text>
      {cues.length > 0 ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {cues.map(c => (
            <View
              key={c}
              style={{
                paddingVertical: 7,
                paddingHorizontal: 12,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: color.borderSubtle,
                backgroundColor: color.surfaceCard,
              }}
            >
              <Text style={{ ...font('sans', 500, 12, 1.2), color: color.textMuted }}>{c}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

/** Round 36px badge holding one tinted glyph — used by ShapesList and list rows. */
export function IconBadge({ icon, tint, bg = color.surfaceMuted }: { icon: string; tint: string; bg?: string }) {
  return (
    <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: bg, alignItems: 'center', justifyContent: 'center' }}>
      <Icon name={icon} size={14} color={tint} style={{ width: undefined }} />
    </View>
  );
}

export type Shape = { icon: string; kind: ShapeKind; title: string; detail?: string; tint?: string; onPress?: () => void };

export function ShapesList({ items }: { items: Shape[] }) {
  return (
    <View>
      {items.map((it, i) => (
        <Pressable
          key={`${it.kind}-${it.title}`}
          accessibilityRole={it.onPress ? 'button' : undefined}
          disabled={!it.onPress}
          onPress={it.onPress}
          style={{
            flexDirection: 'row',
            gap: 14,
            paddingVertical: 14,
            borderTopWidth: i ? 1 : 0,
            borderTopColor: color.borderSubtle,
            alignItems: 'flex-start',
          }}
        >
          <IconBadge icon={it.icon} tint={it.tint ?? KIND_COLOR[it.kind] ?? color.iconDefault} />
          <View style={{ flex: 1, gap: 3 }}>
            <Text style={{ ...font('sans', 500, 15, 1.3), color: color.textHeading }}>{it.title}</Text>
            {it.detail ? <Text style={[type.small, { color: color.textMuted }]}>{it.detail}</Text> : null}
          </View>
          {it.onPress ? <Icon name="chevron-right" size={12} color={color.stone500} style={{ width: undefined, marginTop: 12 }} /> : null}
        </Pressable>
      ))}
    </View>
  );
}

type PracticeItemProps = { title: string; category?: string; duration?: string; done: boolean; onToggle: (v: boolean) => void };

export function PracticeItem({ title, category, duration, done, onToggle }: PracticeItemProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 16,
        paddingHorizontal: 18,
        backgroundColor: color.surfaceCard,
        borderWidth: 1,
        borderColor: color.borderSubtle,
        borderRadius: radius.md,
      }}
    >
      <View style={{ flex: 1 }}>
        <Checkbox checked={done} onChange={onToggle} label={title} description={category} />
      </View>
      {duration ? <Text style={[type.caption, { color: color.textFaint }]}>{duration}</Text> : null}
    </View>
  );
}

type ReflectPromptProps = { label?: string; prompt: string; action?: string; onAction?: () => void };

export function ReflectPrompt({ label = 'Reflect', prompt, action = 'Write', onAction }: ReflectPromptProps) {
  return (
    <View
      style={{
        paddingVertical: 28,
        paddingHorizontal: 24,
        borderRadius: radius.lg,
        backgroundColor: color.surfaceMauve,
        borderWidth: 1,
        borderColor: color.mauve100,
        gap: 14,
      }}
    >
      <Text style={[type.eyebrow, { color: color.textMauve }]}>{label}</Text>
      <Text style={[font('serifItalic', 400, 21, 1.5), wrap.pretty, { color: color.textHeading }]}>{prompt}</Text>
      {onAction ? (
        <Pressable accessibilityRole="button" onPress={onAction} hitSlop={8} style={{ alignSelf: 'flex-start', marginTop: 4, flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <Text style={{ ...font('sans', 500, 14, 1.2), color: color.textMauve }}>{action}</Text>
          <Icon name="arrow-right" size={12} color={color.textMauve} style={{ width: undefined }} />
        </Pressable>
      ) : null}
    </View>
  );
}

function JourneyDot({ state }: { state: 'past' | 'current' | 'future' }) {
  const fill = useTween(state === 'past' ? 1 : 0, { duration: motion.slow, native: false });
  const ring = useTween(state === 'current' ? 1 : 0, { duration: motion.slow, native: false });
  const op = useTween(state === 'future' ? 0.45 : 1, { duration: motion.slow, native: false });
  return (
    <Animated.View
      style={{
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: color.sage500,
        opacity: op,
        backgroundColor: fill.interpolate({ inputRange: [0, 1], outputRange: ['transparent', color.sage500] }),
      }}
    >
      <Animated.View style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, borderRadius: 7, backgroundColor: color.surfaceCard, opacity: ring }} />
    </Animated.View>
  );
}

function JourneyLine({ on }: { on: boolean }) {
  const v = useTween(on ? 1 : 0, { duration: motion.slow, native: false });
  return <Animated.View style={{ flex: 1, height: 2, backgroundColor: v.interpolate({ inputRange: [0, 1], outputRange: [color.linen300, color.sage300] }) }} />;
}

export function JourneySteps({ steps, current }: { steps: string[]; current: number }) {
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={`Step ${current + 1} of ${steps.length}: ${steps[current]}`}
      style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}
    >
      {steps.map((s, i) => (
        <View key={s} style={[{ flexDirection: 'row', alignItems: 'center' }, i > 0 && { flex: 1 }]}>
          {i > 0 ? <JourneyLine on={i <= current} /> : null}
          <JourneyDot state={i < current ? 'past' : i === current ? 'current' : 'future'} />
        </View>
      ))}
    </View>
  );
}
