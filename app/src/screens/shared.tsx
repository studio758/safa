import { forwardRef, type ReactNode } from 'react';
import { Pressable, ScrollView, Text, View, type ScrollViewInstance, type StyleProp, type ViewStyle } from 'react-native';
import type { PressState } from '../ds/Button';
import { Icon } from '../ds/Icon';
import { IconBadge } from '../ds/almanac';
import { color, font, radius, type } from '../theme/tokens';

/** Vertical scroller with hidden indicators — the prototype's `.safa-scroll`. */
export const Scroller = forwardRef<ScrollViewInstance, { children: ReactNode; contentStyle?: StyleProp<ViewStyle> }>(function Scroller(
  { children, contentStyle },
  ref,
) {
  return (
    <ScrollView
      ref={ref}
      style={{ flex: 1 }}
      contentContainerStyle={contentStyle}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
});

/** Content under the absolute tab bar needs 120px of bottom room, as in the design. */
export const TAB_CONTENT = { paddingTop: 12, paddingHorizontal: 24, paddingBottom: 120 } as const;

export function ScreenTitle({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={style}>
      <Text accessibilityRole="header" style={[type.h1, { color: color.textHeading }]}>{children}</Text>
    </View>
  );
}

type ListRowProps = {
  icon: string;
  tint: string;
  badgeBg?: string;
  title: string;
  note: string;
  leading?: string;
  chevron?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  hoverBg?: string;
};

/** Icon badge + title/caption row with an optional chevron (Almanac list, observance link). */
export function ListRow({ icon, tint, badgeBg, title, note, leading, chevron, onPress, style, hoverBg }: ListRowProps) {
  return (
    <Pressable accessibilityRole={onPress ? 'button' : undefined} disabled={!onPress} onPress={onPress}>
      {(st: PressState) => (
        <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 14 }, style, hoverBg && (st.hovered || st.pressed) ? { backgroundColor: hoverBg } : null]}>
          {leading ? <Text style={[type.caption, { width: 52, color: color.textMuted }]}>{leading}</Text> : null}
          <IconBadge icon={icon} tint={tint} bg={badgeBg} />
          <View style={{ flex: 1, gap: 3 }}>
            <Text style={{ ...font('sans', 500, 15, 1.3), color: color.textHeading }}>{title}</Text>
            <Text style={[type.caption, { color: color.textMuted }]}>{note}</Text>
          </View>
          {chevron ? <Icon name="chevron-right" size={12} color={color.stone500} style={{ width: undefined }} /> : null}
        </View>
      )}
    </Pressable>
  );
}

export const card = {
  backgroundColor: color.surfaceCard,
  borderWidth: 1,
  borderColor: color.borderSubtle,
  borderRadius: radius.md,
} as const;
