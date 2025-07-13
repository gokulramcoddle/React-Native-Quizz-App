import { Text, TextProps, StyleSheet } from 'react-native';

export default function AppText({ style, ...props }: TextProps) {
  return (
    <Text
      {...props}
      style={[styles.default, style]}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
});
