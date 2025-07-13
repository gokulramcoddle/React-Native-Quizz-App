// components/AppButton.tsx
import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
} from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  pressedColor?: string;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export default function AppButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  pressedColor,
  containerStyle,
  textStyle,
}: Props) {
  // pick colors by variant
  const palette: Record<typeof variant, { bg: string; text: string }> = {
    primary: { bg: '#a811bfff', text: '#fff' },
    secondary: { bg: '#ffffffff', text: '#000' },
    danger: { bg: '#d32f2f', text: '#fff' },
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: palette[variant].bg },
        pressed &&
  (pressedColor
    ? { backgroundColor: pressedColor }
    : styles.pressed),
        disabled && styles.disabled,
        containerStyle,
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          { color: palette[variant].text },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.8, // subtle feedback
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});
