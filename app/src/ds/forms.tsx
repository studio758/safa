import { useState } from 'react';
import { Animated, Platform, Pressable, Text, TextInput, View, type TextStyle } from 'react-native';
import { useTween } from '../lib/useTween';
import { color, font, motion, radius, shadow, type } from '../theme/tokens';
import { Icon } from './Icon';

/** Removes the browser focus outline; the focus ring is drawn with boxShadow instead. */
const noOutline = (Platform.OS === 'web' ? { outlineWidth: 0 } : {}) as TextStyle;

type ToggleLike = { checked: boolean; onChange?: (v: boolean) => void; label?: string; description?: string; disabled?: boolean };

export function Checkbox({ checked, onChange, label, description, disabled }: ToggleLike) {
  const toggle = () => !disabled && onChange?.(!checked);
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled: !!disabled }}
      accessibilityLabel={label}
      onPress={toggle}
      style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start', opacity: disabled ? 0.5 : 1 }}
    >
      <View
        style={{
          width: 22,
          height: 22,
          marginTop: 1,
          borderRadius: 11,
          borderWidth: 1.5,
          borderColor: checked ? color.sage600 : color.stone400,
          backgroundColor: checked ? color.sage600 : color.surfaceCard,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {checked ? <Icon name="check" size={11} color={color.linen0} style={{ width: undefined }} /> : null}
      </View>
      {label || description ? (
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={[type.body, { color: checked ? color.textMuted : color.textHeading }]}>{label}</Text>
          {description ? <Text style={[type.caption, { color: color.textMuted }]}>{description}</Text> : null}
        </View>
      ) : null}
    </Pressable>
  );
}

export function Toggle({ checked, onChange, label, description, disabled }: ToggleLike) {
  const knob = useTween(checked ? 1 : 0, { duration: motion.base, easing: motion.settle });
  const track = useTween(checked ? 1 : 0, { duration: motion.base, easing: motion.calm, native: false });
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled: !!disabled }}
      accessibilityLabel={label}
      disabled={disabled}
      onPress={() => onChange?.(!checked)}
      style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16, opacity: disabled ? 0.5 : 1 }}
    >
      {label || description ? (
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={[type.body, { color: color.textHeading }]}>{label}</Text>
          {description ? <Text style={[type.caption, { color: color.textMuted }]}>{description}</Text> : null}
        </View>
      ) : null}
      <Animated.View
        style={{
          width: 46,
          height: 28,
          borderRadius: 14,
          padding: 3,
          backgroundColor: track.interpolate({ inputRange: [0, 1], outputRange: [color.stone300, color.sage600] }),
        }}
      >
        <Animated.View
          style={{
            width: 22,
            height: 22,
            borderRadius: 11,
            backgroundColor: color.linen0,
            boxShadow: shadow.xs,
            transform: [{ translateX: knob.interpolate({ inputRange: [0, 1], outputRange: [0, 18] }) }],
          }}
        />
      </Animated.View>
    </Pressable>
  );
}

type SegOption = string | { value: string; label: string };

export function SegmentedControl({ options, value, onChange }: { options: SegOption[]; value: string; onChange?: (v: string) => void }) {
  return (
    <View
      accessibilityRole="radiogroup"
      style={{
        flexDirection: 'row',
        gap: 4,
        padding: 4,
        backgroundColor: color.surfaceMuted,
        borderWidth: 1,
        borderColor: color.borderSubtle,
        borderRadius: 999,
      }}
    >
      {options.map(o => {
        const val = typeof o === 'string' ? o : o.value;
        const lab = typeof o === 'string' ? o : o.label;
        const on = val === value;
        return (
          <Pressable
            key={val}
            accessibilityRole="radio"
            accessibilityState={{ checked: on }}
            onPress={() => onChange?.(val)}
            style={{
              flex: 1,
              minWidth: 0,
              height: 38,
              paddingHorizontal: 12,
              borderRadius: 999,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: on ? color.surfaceCard : 'transparent',
              boxShadow: on ? shadow.sm : undefined,
            }}
          >
            <Text numberOfLines={1} style={{ ...font('sans', on ? 500 : 400, 14, 1.2), color: on ? color.textHeading : color.textMuted }}>
              {lab}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

type TextFieldProps = { label?: string; value: string; onChange?: (v: string) => void; placeholder?: string; hint?: string; disabled?: boolean };

export function TextField({ label, value, onChange, placeholder, hint, disabled }: TextFieldProps) {
  const [focus, setFocus] = useState(false);
  return (
    <View style={{ gap: 8, alignSelf: 'stretch' }}>
      {label ? <Text style={[type.label, { color: color.textHeading }]}>{label}</Text> : null}
      <TextInput
        accessibilityLabel={label}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={color.textFaint}
        editable={!disabled}
        onChangeText={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={[
          type.body,
          noOutline,
          {
            height: 48,
            paddingHorizontal: 16,
            paddingVertical: 0,
            backgroundColor: color.surfaceCard,
            borderWidth: 1,
            borderColor: focus ? color.sage500 : color.borderSubtle,
            borderRadius: radius.md,
            boxShadow: focus ? `0px 0px 0px 3px ${color.focusRing}` : undefined,
            color: color.textHeading,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      />
      {hint ? <Text style={[type.caption, { color: color.textMuted }]}>{hint}</Text> : null}
    </View>
  );
}

type JournalFieldProps = { prompt?: string; value: string; onChange?: (v: string) => void; placeholder?: string; rows?: number };

export function JournalField({ prompt, value, onChange, placeholder = 'Write a few lines…', rows = 5 }: JournalFieldProps) {
  const [focus, setFocus] = useState(false);
  const text = font('serif', 400, 16, 1.75);
  return (
    <View style={{ gap: 12, alignSelf: 'stretch' }}>
      {prompt ? <Text style={{ ...font('serifItalic', 400, 18, 1.6), color: color.textHeading }}>{prompt}</Text> : null}
      <TextInput
        accessibilityLabel={prompt ?? placeholder}
        multiline
        value={value}
        placeholder={placeholder}
        placeholderTextColor={color.textFaint}
        onChangeText={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        textAlignVertical="top"
        style={[
          text,
          noOutline,
          {
            height: rows * (text.lineHeight ?? 28) + 34,
            padding: 16,
            backgroundColor: color.surfaceCard,
            borderWidth: 1,
            borderColor: focus ? color.sage500 : color.borderSubtle,
            borderRadius: radius.md,
            boxShadow: focus ? `0px 0px 0px 3px ${color.focusRing}` : undefined,
            color: color.textHeading,
          },
        ]}
      />
    </View>
  );
}
