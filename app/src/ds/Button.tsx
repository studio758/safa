import type { ReactNode } from 'react';
import { Pressable, Text, View, type PressableStateCallbackType } from 'react-native';
import { color, font, radius } from '../theme/tokens';
import { Icon } from './Icon';

const SIZES = { sm: { h: 36, px: 16, fs: 14 }, md: { h: 44, px: 22, fs: 15 }, lg: { h: 52, px: 28, fs: 16 } } as const;

export type ButtonVariant = 'primary' | 'warm' | 'secondary' | 'ghost';

type Props = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: keyof typeof SIZES;
  icon?: string;
  iconRight?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  onPress?: () => void;
};

/** RN Pressable state also carries `hovered` on web (react-native-web). */
export type PressState = PressableStateCallbackType & { hovered?: boolean };

function variantColors(variant: ButtonVariant, hover: boolean) {
  switch (variant) {
    case 'warm':
      return { bg: hover ? color.actionWarmHover : color.actionWarm, fg: color.linen0, bd: 'transparent' };
    case 'secondary':
      return { bg: hover ? color.surfaceMuted : color.surfaceCard, fg: color.textHeading, bd: color.borderStrong };
    case 'ghost':
      return { bg: hover ? color.surfaceMuted : 'transparent', fg: color.textSage, bd: 'transparent' };
    default:
      return { bg: hover ? color.actionPrimaryHover : color.actionPrimary, fg: color.actionOnPrimary, bd: 'transparent' };
  }
}

export function Button({ children, variant = 'primary', size = 'md', icon, iconRight, disabled, fullWidth, onPress }: Props) {
  const s = SIZES[size];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      style={fullWidth ? { alignSelf: 'stretch' } : { alignSelf: 'flex-start' }}
    >
      {(state: PressState) => {
        const v = variantColors(variant, !!state.hovered && !disabled);
        return (
          <View
            style={{
              height: s.h,
              paddingHorizontal: s.px,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              backgroundColor: v.bg,
              borderWidth: 1,
              borderColor: v.bd,
              borderRadius: radius.pill,
              opacity: disabled ? 0.45 : 1,
              transform: [{ scale: state.pressed && !disabled ? 0.98 : 1 }],
            }}
          >
            {icon ? <Icon name={icon} size={s.fs} color={v.fg} /> : null}
            <Text style={{ ...font('sans', 500, s.fs, 1), lineHeight: s.fs * 1.2, letterSpacing: s.fs * 0.01, color: v.fg }}>{children}</Text>
            {iconRight ? <Icon name={iconRight} size={s.fs - 2} color={v.fg} /> : null}
          </View>
        );
      }}
    </Pressable>
  );
}
