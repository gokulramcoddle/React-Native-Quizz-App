import { Stack } from 'expo-router';
import { ImageBackground, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Layout() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/images/background.jpeg')}
        style={styles.background}
        resizeMode="cover"
      >
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
        <View style={styles.overlay}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>
      </ImageBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
