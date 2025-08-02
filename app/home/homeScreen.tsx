import React, { useEffect, useState } from 'react';
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
import { clearToken } from '@/services/api';
import { clearUser, getUser } from '@/services/authenticatedUser';
 import { Alert } from 'react-native'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppText from '@/components/AppText';
import AppTitle from '@/components/AppTitle';
import { formatName } from '@/helper/formatter';

export default function HomeScreen() {
const [userData, setUserData] = useState<any>({});

useEffect(()=>{
  async function fetchUser() {
    try{
      const user = await getUser();
      setUserData(user);
      console.log(user);
    } catch {
      Alert.alert('Failed to fetch user');
    }
  }
  fetchUser();
},[])

const handleLogout = () => {
  Alert.alert(
    'Confirm Logout',
    'Are you sure you want to log out?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await Promise.all([clearToken(), clearUser()]);
            router.replace('/');
          } catch (err) {
            console.error('Failed to log out:', err);
          }
        },
      },
    ],
    { cancelable: true }
  );
};


  return (
    <SafeAreaView style={styles.safe}>     
      <StatusBar barStyle="light-content" />

      {/* Hero banner */}
      <View style={styles.heroWrapper}>
<AppTitle style={styles.title}>
  QuizGo{'\n'}
  <Text style={{color:'#e45afaff', fontSize: 45}}>Creator</Text>
</AppTitle>
        <AppTitle style={styles.subtitle}>Design, publish, and track your quizzes effortlessly.</AppTitle>
      </View>
    <View style={styles.userGreeting}>
  <Icon name="person" size={24} color="#fff" style={styles.userIcon} />
  <AppText style={styles.greetingText}>
    Hi, {formatName(userData?.name ?? 'User')}!
  </AppText>
</View>

      {/* Navigation section */}
      <ScrollView
        contentContainerStyle={styles.navWrapper}
        showsVerticalScrollIndicator={false}
      >
        {/* Primary creator action */}
        <AppButton title="Create Quiz" onPress={() => router.push('/creator/createQuestion')} />
        <AppButton title="My Quiz" onPress={() => router.push('/home/myQuizzScreen')} />
        <AppButton
            title="← Back"
           onPress={() => router.replace('/?skipAuthCheck=true')} />
        {/* Danger zone */}
       <AppButton style={styles.logoutBtn} title='Log out' onPress={handleLogout} />
      </ScrollView>
    </SafeAreaView>
  );
}

const WHITE = '#FFFFFF';
const GRAY = '#9CA3AF';

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  heroWrapper: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  title: {
    marginTop: 100,
    fontSize: 65,
    lineHeight: 60,
    color: WHITE,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 15,
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
  }, 
  userGreeting: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 10,
  marginTop: 10,
},

userIcon: {
  marginRight: 8,
  color:'#a811bfff' ,
},

greetingText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '800',
  textAlign: 'center',
},
});
