import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { color, font, type, wrap } from '../theme/tokens';
import { Icon } from './Icon';

const EYEBROW_TONE = {
  terracotta: color.textAccentStrong,
  sage: color.textSage,
  mauve: color.textMauve,
  muted: color.textMuted,
} as const;

export function Eyebrow({ children, tone = 'terracotta' }: { children: ReactNode; tone?: keyof typeof EYEBROW_TONE }) {
  return <Text style={[type.eyebrow, { color: EYEBROW_TONE[tone] }]}>{children}</Text>;
}

const TAG_TONE = {
  neutral: [color.surfaceMuted, color.textBody],
  sage: [color.sage50, color.sage800],
  terracotta: [color.terracotta50, color.terracotta700],
  mauve: [color.mauve50, color.mauve700],
} as const;
export type TagTone = keyof typeof TAG_TONE;

type TagProps = { children: ReactNode; tone?: TagTone; icon?: string; selected?: boolean; onPress?: () => void };

export function Tag({ children, tone = 'neutral', icon, selected, onPress }: TagProps) {
  const [bg, fg] = selected ? [color.charcoal900, color.linen0] : TAG_TONE[tone];
  const body = (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        height: 28,
        paddingHorizontal: 12,
        borderRadius: 999,
        backgroundColor: bg,
        borderWidth: 1,
        borderColor: 'rgba(43,42,39,0.05)',
        alignSelf: 'flex-start',
      }}
    >
      {icon ? <Icon name={icon} size={11} color={fg} style={{ width: undefined }} /> : null}
      <Text numberOfLines={1} style={{ ...font('sans', 500, 12, 1.2), color: fg }}>{children}</Text>
    </View>
  );
  if (!onPress) return body;
  return (
    <Pressable accessibilityRole="button" accessibilityState={{ selected: !!selected }} onPress={onPress}>
      {body}
    </Pressable>
  );
}

export function PullQuote({ children, attribution, size = 26 }: { children: ReactNode; attribution?: string; size?: number }) {
  const markStyle = { ...font('display', 400, size * 1.8, 1), color: color.stone300, position: 'absolute' as const };
  return (
    <View style={{ alignSelf: 'stretch', paddingVertical: 8, paddingHorizontal: 40, alignItems: 'center' }}>
      <Text accessibilityElementsHidden importantForAccessibility="no" style={[markStyle, { left: 0, top: -6 }]}>{'“'}</Text>
      <Text style={[font('display', 400, size, 1.45), wrap.pretty, { color: color.textHeading, textAlign: 'center' }]}>{children}</Text>
      <Text
        accessibilityElementsHidden
        importantForAccessibility="no"
        style={[markStyle, attribution ? { right: 0, bottom: 22 } : { right: 0, bottom: -16 }]}
      >
        {'”'}
      </Text>
      {attribution ? <Text style={[type.eyebrow, { marginTop: 20, color: color.textAccentStrong, textAlign: 'center' }]}>{attribution}</Text> : null}
    </View>
  );
}
