import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { getStoredToken } from '@/services/api';
import { getUser } from '@/services/authenticatedUser';

export default function StartScreen() {
  useEffect(() => {
    const checkAuth = async () => {
      const MINIMUM_SPLASH_TIME = 2000; // 2 seconds
      const startTime = Date.now();

      const token = await getStoredToken();
      const user = await getUser();

      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, MINIMUM_SPLASH_TIME - elapsed);

      setTimeout(() => {
        if (token && user?.id) {
          router.replace('/home/homeScreen'); // 👈 change as needed
        } else {
          router.replace('/');
        }
      }, remainingTime);
    };

    checkAuth();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#a811bfff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
