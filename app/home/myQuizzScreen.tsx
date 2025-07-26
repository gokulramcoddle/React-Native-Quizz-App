import { formatFullDateWithAgo } from '@/helper/formatter';
import { getUserQuizz } from '@/services/apiService';
import { getUser } from '@/services/authenticatedUser';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

export default function MyQuizz() {
  const [quizzes, setQuizzes] = useState<
    { id: number; title: string; createdAt: string; questions: number; code: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const authenticatedUser = await getUser();
      if (!authenticatedUser) return;                // no user, no call

      const res = await getUserQuizz(authenticatedUser.id);
      console.log('fetching quizz', res)
      setQuizzes(res.quizzes || []);
    } catch (err) {
      console.error('error fetching quizzes', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  /* ---------- UI ---------- */
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Quizzes</Text>
{loading ? (
  <ActivityIndicator style={styles.centered} size="large" color="#a811bfff" />
) : ( 
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {quizzes.length > 0 ? (quizzes.map((quiz) => (
          <TouchableOpacity key={quiz.id} style={styles.card} activeOpacity={0.8}   
          onPress={() => 
               router.push({pathname: '/home/attendees', params: { quizId: quiz.id.toString() },})
                }
               >
            <Text style={styles.quizTitle}>{quiz.title}</Text>
            <Text>
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Code: </Text>
              <Text style={styles.quizCode}>{quiz.code}</Text>
            </Text>
            <Text>
              <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>Total Questions: {''}</Text>
              <Text style={styles.quizInfo}>{quiz.questions}</Text>
            </Text>
            <Text style={styles.quizDate}>
              {formatFullDateWithAgo(quiz.createdAt)}
            </Text>
          </TouchableOpacity>
        ))
      ) : (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            No quizzes found.
          </Text>
        )}
      </ScrollView>
)}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 50,
    marginTop: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 60,
    color: '#ffffffff',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#a811bfa7',
    borderRadius: 30,
    padding: 35,
    marginBottom: 35,
  },
  quizTitle: {
    fontSize: 25,
    fontWeight: '800',
    marginBottom: 4,
    color: '#f9d4ffff',
  },
  quizInfo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#f6ff77ff',
  },
  quizCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7eff8dd0',
  },
  quizDate: {
    fontSize: 13,
    color: '#bfb3fdff',
    marginTop: 4,
  },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },

});
