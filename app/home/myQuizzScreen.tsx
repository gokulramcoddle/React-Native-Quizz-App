import { getStoredToken } from '@/services/api';
import { getUserQuizz } from '@/services/apiService';
import { getUser } from '@/services/authenticatedUser';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function MyQuizz() {
  const [quizzes, setQuizzes] = useState<
    { id: number; title: string; createdAt: string; questions: number; code: string }[]
  >([]);

  const fetchQuizzes = async () => {
    try {

      const authenticatedUser = await getUser();
      if (!authenticatedUser) return;                // no user, no call

      const res = await getUserQuizz(authenticatedUser.id);
      console.log('fetching quizz', res)
      setQuizzes(res.quizzes || []);
    } catch (err) {
      console.error('error fetching quizzes', err);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  /* ---------- UI ---------- */
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Quizzes</Text>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {quizzes.length > 0 ? (quizzes.map((quiz) => (
          <TouchableOpacity key={quiz.id} style={styles.card} activeOpacity={0.8}>
            <Text style={styles.quizTitle}>{quiz.title}</Text>
            <Text style={styles.quizCode}>Code: {quiz.code}</Text>
            <Text style={styles.quizInfo}>Total Questions: {quiz.questions}</Text>
            <Text style={styles.quizDate}>
              Created on {new Date(quiz.createdAt).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        ))
      ) : (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            No quizzes found.
          </Text>
        )}
      </ScrollView>
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
    fontSize: 48,
    marginTop: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffffff',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#a811bfff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
  },
  quizTitle: {
    fontSize: 25,
    fontWeight: '600',
    marginBottom: 4,
    color: '#ffffffff',
  },
  quizInfo: {
    fontSize: 16,
    color: 'white',
  },
  quizCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  quizDate: {
    fontSize: 12,
    color: 'white',
    marginTop: 4,
  },
});
