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
            <Text style={styles.quizInfo}> Total Questions: {quiz.questions}</Text>
            <Text style={styles.quizInfo}>Code: {quiz.code}</Text>
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
    backgroundColor: '#f4f6fa',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1e1e1e',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  quizInfo: {
    fontSize: 14,
    color: '#666',
  },
  quizDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});
