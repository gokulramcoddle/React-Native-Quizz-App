// import { View, Text, Button, TextInput, StyleSheet, Modal, Pressable } from "react-native";
// import { useState } from "react";
// import { useLocalSearchParams } from "expo-router";

// export default function CreateQuestions() {
//   const { title } = useLocalSearchParams();
//   const [showModal, setShowModal] = useState(false);
//   const [questionText, setQuestionText] = useState("");
//   const [options, setOptions] = useState(["", "", "", ""]);
//   const [correctIndex, setCorrectIndex] = useState<number | null>(null);

//   const handleOptionChange = (value: string, index: number) => {
//     const newOptions = [...options];
//     newOptions[index] = value;
//     setOptions(newOptions);
//   };

//   const handleAddQuestion = () => {
//     if (!questionText.trim() || correctIndex === null || options.some(o => !o.trim())) return;

//     console.log({
//       question: questionText,
//       options: options.map((opt, i) => ({
//         text: opt,
//         is_correct: i === correctIndex
//       }))
//     });

//     // Reset after adding
//     setQuestionText("");
//     setOptions(["", "", "", ""]);
//     setCorrectIndex(null);
//     setShowModal(false);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{title}</Text>

//       <Button title="➕ Add Question" onPress={() => setShowModal(true)} />

//       <Modal visible={showModal} animationType="slide" transparent>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>New Question</Text>

//             <TextInput
//               placeholder="Question title"
//               style={styles.input}
//               value={questionText}
//               onChangeText={setQuestionText}
//             />

//             {options.map((opt, i) => (
//               <View key={i} style={styles.optionRow}>
//                 <TextInput
//                   placeholder={`Option ${i + 1}`}
//                   value={opt}
//                   onChangeText={(text) => handleOptionChange(text, i)}
//                   style={styles.optionInput}
//                 />
//                 <Pressable onPress={() => setCorrectIndex(i)} style={styles.radio}>
//                   <View style={[styles.radioOuter, correctIndex === i && styles.radioSelected]}>
//                     {correctIndex === i && <View style={styles.radioInner} />}
//                   </View>
//                 </Pressable>
//               </View>
//             ))}

//             <View style={styles.buttonRow}>
//               <Button title="Cancel" onPress={() => setShowModal(false)} />
//               <Button title="Add" onPress={handleAddQuestion} />
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     justifyContent: "flex-start",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "600",
//     marginBottom: 20,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "#00000099",
//     justifyContent: "center",
//     padding: 20,
//   },
//   modalContent: {
//     backgroundColor: "white",
//     borderRadius: 12,
//     padding: 20,
//     gap: 10,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   input: {
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 6,
//     marginBottom: 10,
//   },
//   optionRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     marginBottom: 8,
//   },
//   optionInput: {
//     flex: 1,
//     borderWidth: 1,
//     padding: 8,
//     borderRadius: 6,
//   },
//   radio: {
//     padding: 5,
//   },
//   radioOuter: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: "#333",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   radioInner: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: "#333",
//   },
//   radioSelected: {
//     borderColor: "#007bff",
//   },
//   buttonRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
// });
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
} from "react-native";

export default function CreateQuestions() {
  const defaultQuestions = [
    {
      text: "What is 2 + 2?",
      options: [
        { text: "3", is_correct: false },
        { text: "4", is_correct: true },
        { text: "5", is_correct: false },
        { text: "22", is_correct: false },
      ],
    },
    {
      text: "Which is the capital of France?",
      options: [
        { text: "Berlin", is_correct: false },
        { text: "Madrid", is_correct: false },
        { text: "Paris", is_correct: true },
        { text: "Rome", is_correct: false },
      ],
    },
  ];

  const [questions, setQuestions] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
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

  const handleSave = () => {
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
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz: My Sample Quiz</Text>

      <Button title="+ Add Question" onPress={() => { resetForm(); setShowModal(true); }} />

      <ScrollView style={{ marginTop: 20 }}>
        {[...defaultQuestions, ...questions].map((q, index) => (
          <View key={index} style={styles.questionItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.questionText}>{index + 1}. {q.text}</Text>
              {q.options.map((o: any, i: number) => (
                <Text key={i} style={{ marginLeft: 10 }}>
                  {o.is_correct ? "✅" : "▫️"} {o.text}
                </Text>
              ))}
            </View>
            {index >= defaultQuestions.length && (
              <View style={styles.qButtons}>
                <Button title="✏️" onPress={() => handleEdit(index - defaultQuestions.length)} />
                <Button title="🗑️" color="red" onPress={() => handleDelete(index - defaultQuestions.length)} />
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <Modal visible={showModal} animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>{editIndex !== null ? "Edit Question" : "New Question"}</Text>

          <TextInput
            placeholder="Enter question text"
            value={questionText}
            onChangeText={setQuestionText}
            style={styles.input}
          />

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
              <TouchableOpacity onPress={() => setCorrectIndex(i)}>
                <Text style={styles.radio}>
                  {correctIndex === i ? "🔘" : "⚪"}
                </Text>
              </TouchableOpacity>
            </View>
          ))}

          <View style={styles.modalButtons}>
            <Button title="Cancel" onPress={() => { setShowModal(false); resetForm(); }} />
            <Button title="Save" onPress={handleSave} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 60, flex: 1 },
  title: { fontSize: 22, marginBottom: 20, textAlign: "center", fontWeight: "bold" },
  questionItem: {
    borderWidth: 1, borderColor: "#ddd", padding: 12, borderRadius: 8,
    marginBottom: 12, backgroundColor: "#f9f9f9", flexDirection: "row"
  },
  questionText: { fontWeight: "bold", marginBottom: 4 },
  qButtons: { justifyContent: "space-between", marginLeft: 10 },
  modal: { padding: 20, paddingTop: 60, flex: 1 },
  modalTitle: { fontSize: 20, marginBottom: 20, textAlign: "center", fontWeight: "bold" },
  input: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 20 },
  optionRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  optionInput: { borderWidth: 1, padding: 10, flex: 1, borderRadius: 5 },
  radio: { fontSize: 24, marginLeft: 10 },
  modalButtons: { marginTop: 30, flexDirection: "row", justifyContent: "space-between" },
});
