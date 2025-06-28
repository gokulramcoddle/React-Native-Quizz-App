import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function CreateQuiz() {
  const [title, setTitle] = useState("");

  const handleNext = () => {
    if (!title.trim()) return;
    router.push({ pathname: "/creator/createQuestion", params: { title } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create a New Quiz</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Quiz Name"
        value={title}
        onChangeText={setTitle}
      />

      <Button title="Next ➡️" onPress={handleNext} disabled={!title.trim()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
});
