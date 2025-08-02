import { getUser } from "@/services/authenticatedUser";
import { createQuestion, createQuizz } from "@/services/apiService";
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Clipboard from 'expo-clipboard';
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import AppText from "@/components/AppText";
import AppButton from "@/components/AppButton";
import AppTitle from "@/components/AppTitle";

export default function CreateQuestions() {
  const [quizTitle, setQuizTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
const [generatedCode, setGeneratedCode] = useState<string | null>(null); 
  const [questions, setQuestions] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [copy, setCopy] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const resetForm = () => {
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectIndex(null);
    setEditIndex(null);
  };

  const handleCopy = () => {
  if (generatedCode) {
    Clipboard.setStringAsync(generatedCode);
    setCopy(true);
  }
}

  const handleSave = async() => {
    if (!questionText || correctIndex === null || options.some(o => !o.trim())) return;

    const newQuestion = {
      text: questionText,
      options: options.map((opt, i) => ({
        text: opt,
        is_correct: i === correctIndex,
      })),
    };

    const updated = [...questions];
    if (editIndex !== null) {
      updated[editIndex] = newQuestion;
    } else {
      updated.push(newQuestion);
    }

    setQuestions(updated);
    resetForm();
    setShowModal(false);
  };

  const handleEdit = (index: number) => {
    const q = questions[index];
    setQuestionText(q.text);
    setOptions(q.options.map((o: any) => o.text));
    setCorrectIndex(q.options.findIndex((o: any) => o.is_correct));
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index: number) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this question?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const updated = [...questions];
          updated.splice(index, 1);
          setQuestions(updated);
        },
      },
    ]);
  };

 const handlePublish = async () => {
  if (!quizTitle.trim() || questions.length === 0) {
    Alert.alert("Validation", "Please enter a quiz title and at least one question.");
    return;
  }

  try {
    setLoading(true);
    const userData = await getUser();
    if (!userData?.id) {
      throw new Error("User not found");
    }
    // 1. Create the quiz
    const quizResponse = await createQuizz(quizTitle, userData.id);
    const quizzId = quizResponse?.quiz.id || 0;

    if (!quizResponse|| !quizzId) {
      throw new Error("Quiz creation failed");
    }

    // 2. Create all questions for the created quiz
    for (const q of questions) {
     await createQuestion({
        quizzId,
        text: q.text,
        options: q.options,
      });
    }
setGeneratedCode(quizResponse?.quiz?.code || `QUIZZ-${quizzId}`);
setSuccessModalVisible(true);

    // Optional: Reset form
    setQuizTitle("");
    setQuestions([]);
  } catch (err) {
    console.error("Error publishing quiz:", err);
    Alert.alert("Error", "Failed to publish quiz. Please try again.");
  } finally {
     setLoading(false);
  }
};

  return (
    <View style={styles.container}>
      <AppTitle style={styles.title}>Create Quiz</AppTitle>
      <Text style={{color: '#a811bfff',fontWeight: 700}}>Quizz Title:</Text>
      <TextInput
        placeholder="Enter Quiz Title"
        value={quizTitle}
        onChangeText={setQuizTitle}
        style={styles.input}
        maxLength={40}
      />

      <AppButton title="+ Add Question" onPress={() => { resetForm(); setShowModal(true); }} />

      <ScrollView style={{ marginTop: 20, flex: 1}} showsVerticalScrollIndicator={false}>
        {questions.map((q, index) => (
          <View key={index} style={styles.questionItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.questionText}>{index + 1}. {q.text}</Text>
              {q.options.map((o: any, i: number) => (
  <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6 }}>
    <View
      style={[
        styles.optionCircle,
        o.is_correct && styles.optionCircleCorrect
      ]}
    >
      <Text style={[styles.optionNumber, o.is_correct && styles.optionNumberCorrect]}>
        {i + 1}
      </Text>
    </View>
    <Text style={styles.optionText}>{o.text}</Text>
  </View>
))}
            </View>
            <View style={styles.qButtons}>
  <TouchableOpacity onPress={() => handleEdit(index)}>
    <Icon name="edit" size={34} color="#007bffff" />
  </TouchableOpacity>

 <TouchableOpacity onPress={() => handleDelete(index)}>
    <Icon name="delete" size={34} color="#ff0000ff" />
  </TouchableOpacity>

</View>

          </View>
        ))}
      </ScrollView>

      <View style={{ marginTop: 30, marginBottom: 20 }}>
        {loading ? (
                    <View style={styles.loadingWrapper}>
                      <ActivityIndicator size="small" color="#a811bfff" />
                    </View>
                  ) : (
                  <AppButton title="🚀 Publish Quiz" onPress={handlePublish} /> )}
      </View>

      <Modal visible={showModal} animationType="slide">
        <View style={styles.modal}>
          <AppTitle style={styles.modalTitle}>{editIndex !== null ? "Edit Question" : "New Question"}</AppTitle>
          <AppText style={{color: '#a811bfff',fontWeight: 700}}>Enter Question:</AppText>
          <TextInput
            placeholder="Enter question text"
            value={questionText}
            onChangeText={setQuestionText}
            style={styles.input}
          />
          <AppText style={{color: '#a811bfff',fontWeight: 700}}>Options:</AppText>
          {options.map((opt, i) => (
            <View key={i} style={styles.optionRow}>
              <TextInput
                value={opt}
                onChangeText={text => {
                  const updated = [...options];
                  updated[i] = text;
                  setOptions(updated);
                }}
                placeholder={`Option ${i + 1}`}
                style={styles.optionInput}
              />
              <TouchableOpacity
  onPress={() => setCorrectIndex(i)}
  style={styles.radioWrapper}
  activeOpacity={0.7}
>
  <Icon
    name={correctIndex === i ? 'radio-button-checked' : 'radio-button-unchecked'}
    size={25}
    color={correctIndex === i ? '#a811bfff' : '#888'}
  />
</TouchableOpacity>

            </View>
          ))}

          <View style={styles.modalButtons}>
            <AppButton title="Cancel" onPress={() => { setShowModal(false); resetForm(); }} />
            <AppButton title="Save" onPress={handleSave} />
          </View>
        </View>
      </Modal>
      <Modal visible={successModalVisible} transparent animationType="fade">
  <View style={styles.overlay}>
    <View style={styles.successPopup}>
      <Text style={styles.successTitle}>✅ Success!</Text>
      <Text style={styles.successMessage}>Your quiz has been published.</Text>

      <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Quiz Code:</Text>
      {copy && <Text style={{ fontWeight: 'bold', marginTop: 5, fontSize: 10, color: 'green' }}>Copied successfully!!</Text>}
      <TouchableOpacity onPress={handleCopy}>
        <Text style={styles.codeText}>{generatedCode}</Text>
        <Text style={styles.copyHint}>Tap to copy</Text>
      </TouchableOpacity>

      <Button title="Close" onPress={() => setSuccessModalVisible(false)} />
    </View>
  </View>
</Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 60, flex: 1 },
  title: { fontSize: 22, marginBottom: 20, textAlign: "center" },
  input: {color: 'white', borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 20, borderColor: '#a811bfff', },
  questionItem: {
    borderWidth: 1, borderColor: "#ddd", padding: 12, borderRadius: 8,
    marginBottom: 12, backgroundColor: "#f9f9f9", flexDirection: "row"
  },
  questionText: { fontWeight: "bold", marginBottom: 4 },
  qButtons: { justifyContent: "space-between", marginLeft: 10 },
  modal: { padding: 20, justifyContent: "center", flex: 1,backgroundColor: '#0b0a2f' },
  modalTitle: { color: 'white',fontSize: 26, marginBottom: 20, textAlign: "center" },
  optionRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  optionInput: { color: 'white' ,borderColor: '#a811bfff',borderWidth: 1, padding: 10, flex: 1, borderRadius: 5 },
  radio: { fontSize: 24, marginLeft: 10 },
  modalButtons: { marginTop: 30, flexDirection: "row", justifyContent: "space-between" },
overlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},
successPopup: {
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 10,
  width: '80%',
  alignItems: 'center',
},
loadingWrapper: {
    marginTop: 10,
    alignItems: 'center',
  },
successTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
},
successMessage: {
  fontSize: 16,
  textAlign: 'center',
},
codeText: {
  fontSize: 18,
  marginVertical: 10,
  backgroundColor: '#f0f0f0',
  padding: 10,
  borderRadius: 8,
  textAlign: 'center',
},
copyHint: {
  fontSize: 12,
  color: 'gray',
  textAlign: 'center',
  marginBottom: 10,
},
 radioWrapper: {
  marginRight: 8,
  padding: 4,
  justifyContent: 'center',
  alignItems: 'center',
},
optionCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#c3c3c3ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  optionCircleCorrect: {
    backgroundColor: '#4CAF50', // green for correct
  },
  optionNumber: {
    color: '#000',
    fontWeight: 'bold',
  },
  optionNumberCorrect: {
    color: '#fff',
  },
  optionText: {
    fontSize: 16,
    flexShrink: 1,
  },

});
