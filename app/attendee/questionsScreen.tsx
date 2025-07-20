// screens/QuizScreen.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getQuizzQuestions, submitQuizResult } from '@/services/apiService';
import AppButton from '@/components/AppButton';

interface Option {
  id: number;
  text: string;
  is_correct?: boolean;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

interface QuizData {
  id: number;
  title: string;
  questions: Question[];
  total_questions: number;
  page: number;
  per_page: number;
}

const QuizScreen = () => {
  const { code, name, email } = useLocalSearchParams();
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const fetchQuiz = async (code: string, page: number) => {
    try {
      setLoading(true);
      const res = await getQuizzQuestions(code,page,1);
      setQuizData(res.quiz);
    } catch (error) {
      console.error('Failed to fetch quiz', error);
      Alert.alert('Error', 'Failed to load quiz question');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof code === 'string') {
      fetchQuiz(code, page);
    }
  }, [code, page]);

  const handleOptionSelect = (questionId: number, optionId: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

 const handleSubmit = async () => {
  let total = 0;

  try {
    const res = await getQuizzQuestions(Array.isArray(code) ? code[0] : code, 1, 1000);
    const allQuestions: Question[] = res.quiz.questions;
    const quizId = res.quiz.id;

    for (const question of allQuestions) {
      const selectedOptionId = selectedOptions[question.id];
      const correctOption = question.options.find((opt) => opt.is_correct);

      if (correctOption && selectedOptionId === correctOption.id) {
        total++;
      }
    }

    // Submit using service
    await submitQuizResult({
      name: Array.isArray(name) ? name[0] : name,
      email: Array.isArray(email) ? email[0] : email,
      score: total,
      total_questions: allQuestions.length,
      quizz_id: quizId,
    });

    setScore(total);
    setShowResult(true);
  } catch (error: any) {
    console.error('Error while submitting quiz', error?.response || error);
    Alert.alert('Error', 'Could not submit quiz.');
  }
};



  if (loading || !quizData) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const currentQuestion = quizData.questions[0];

  if (showResult) {
    return (
      <View style={styles.centered}>
        <Text style={styles.title}>Quiz Completed!</Text>
        <Text
  style={[
    styles.scoreText,
    {
      color:
        Number(score) / Number(quizData.total_questions) >= 0.45
          ? 'green'
          : 'red',
    },
  ]}
>
  Your Score: {score} / {quizData.total_questions}
</Text>


      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{quizData.title}</Text>

      <Text style={styles.questionText}>{currentQuestion.text}</Text>

      {currentQuestion.options.map((opt) => {
        const isSelected = selectedOptions[currentQuestion.id] === opt.id;
        return (
          <TouchableOpacity
            key={opt.id}
            style={[styles.option, isSelected && styles.selectedOption]}
            onPress={() => handleOptionSelect(currentQuestion.id, opt.id)}
          >
            <Text style={styles.optionText}>{opt.text}</Text>
          </TouchableOpacity>
        );
      })}

      <View style={styles.buttonRow}>
        <AppButton
          title="Previous"
          disabled={page === 1}
          onPress={() => setPage((prev) => prev - 1)}
        />
        <Text style={styles.pageText}>
          {page} / {quizData.total_questions}
        </Text>
        {page < quizData.total_questions ? (
  <AppButton title="Next" onPress={() => setPage((prev) => prev + 1)} />
    ) : (
     loading ? (
       <View style={styles.loadingWrapper}>
        <ActivityIndicator size="small" color="#007AFF" />
       </View>
    ) : (
       <AppButton title="Submit" onPress={handleSubmit} disabled={loading} />
       )
    )}
      </View>
    </View>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 100,
    textAlign: 'center',
  },
  questionText: {
    color: '#a811bfff',
    fontSize: 20,
    fontWeight:'600',
    marginBottom: 20,
    marginTop: 50,
  },
  option: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
  },
  selectedOption: {
    backgroundColor: '#da76e9ff',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    alignItems: 'center',
  },
  pageText: {
    fontSize: 16,
  },
  scoreText: {
    fontSize: 25,
    fontWeight: '600',
    marginTop: 20,
  },
  loadingWrapper: {
  justifyContent: 'center',
  alignItems: 'center',
  height: 40,
  flex: 1,
}
});
