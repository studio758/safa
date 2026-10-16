import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import type { StyleProp, TextStyle } from 'react-native';

export type IconStyle = 'solid' | 'regular';

type Props = {
  name: string;
  variant?: IconStyle;
  size?: number;
  color?: string;
  label?: string;
  style?: StyleProp<TextStyle>;
};

/** Font Awesome 6 Free glyph, matching the DS `<Icon>` (fixed-width box of 1.25em). */
export function Icon({ name, variant = 'solid', size = 16, color, label, style }: Props) {
  return (
    <FontAwesome6
      name={name}
      solid={variant === 'solid'}
      regular={variant === 'regular'}
      size={size}
      color={color}
      accessibilityLabel={label}
      accessibilityElementsHidden={!label}
      importantForAccessibility={label ? 'auto' : 'no-hide-descendants'}
      style={[{ width: size * 1.25, textAlign: 'center', lineHeight: size * 1.1 }, style]}
    />
  );
}
