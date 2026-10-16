import { Pressable, View } from 'react-native';
import { color } from '../theme/tokens';
import type { PressState } from './Button';
import { Icon } from './Icon';

// Glyphs that exist in Font Awesome Free "regular"; everything else falls back to solid.
const REGULAR = ['bookmark', 'heart', 'calendar', 'user', 'sun', 'moon', 'star', 'bell', 'share-from-square', 'circle', 'comment', 'envelope', 'clock', 'eye', 'image', 'file', 'folder', 'lightbulb', 'hand', 'square', 'compass'];

type Props = {
  icon: string;
  label: string;
  variant?: 'plain' | 'filled' | 'outline';
  size?: number;
  active?: boolean;
  onPress?: () => void;
};

export function IconButton({ icon, label, variant = 'plain', size = 44, active, onPress }: Props) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ selected: !!active }} onPress={onPress}>
      {(state: PressState) => {
        const bg =
          variant === 'filled' ? (active ? color.actionPrimary : color.surfaceMuted)
          : variant === 'outline' ? color.surfaceCard
          : state.hovered || state.pressed ? color.surfaceMuted : 'transparent';
        const fg = variant === 'filled' && active ? color.linen0 : active ? color.textAccent : color.textBody;
        const solid = active || variant === 'filled' || !REGULAR.includes(icon);
        return (
          <View
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: variant === 'outline' ? 1 : 0,
              borderColor: color.borderSubtle,
              backgroundColor: bg,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name={icon} variant={solid ? 'solid' : 'regular'} size={Math.round(size * 0.4)} color={fg} />
          </View>
        );
      }}
    </Pressable>
  );
}
