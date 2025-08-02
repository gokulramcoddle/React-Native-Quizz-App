import { useFonts } from 'expo-font';
import { Text, TextProps, StyleSheet } from 'react-native';

export default function AppTitle({ style, ...props }: TextProps) {
  const [fontsLoaded] = useFonts({
    RussoOne: require('@/assets/fonts/RussoOne-Regular.ttf'),
  });

  if (!fontsLoaded) return null; // Or return a fallback loader/text

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
    fontSize: 30,
    fontFamily: 'RussoOne',
  },
});
