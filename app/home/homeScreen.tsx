import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import AppButton from '@/components/AppButton';
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>     
      <StatusBar barStyle="light-content" />

      {/* Hero banner */}
      <View style={styles.heroWrapper}>
        <Text style={styles.title}>Quiz Creator 🛠️</Text>
        <Text style={styles.subtitle}>Design, publish, and track your quizzes effortlessly.</Text>
      </View>

      {/* Navigation section */}
      <ScrollView
        contentContainerStyle={styles.navWrapper}
        showsVerticalScrollIndicator={false}
      >
        {/* Primary creator action */}
        <AppButton title="Create Quiz" onPress={() => router.push('/creator/createQuestion')} />
        <AppButton title="My Quizzes" onPress={() => router.push('/')} />

        {/* Danger zone */}
       <AppButton style= {styles.logoutBtn} title='Log out' onPress={() => router.replace('/')} />
      </ScrollView>
    </SafeAreaView>
  );
}

const WHITE = '#FFFFFF';
const DARK_BG = '#1E1E24';
const GRAY = '#9CA3AF';

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: DARK_BG,
  },
  heroWrapper: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  title: {
    marginTop: 12,
    fontSize: 32,
    fontWeight: '700',
    color: WHITE,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: GRAY,
    textAlign: 'center',
  },
  navWrapper: {
    flex: 1,
    flexDirection: 'column',
    gap:20,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  logoutBtn: {
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: 'red',
    alignSelf: 'center',
    paddingHorizontal: 40    
  }
});
