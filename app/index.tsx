import { View, Text, Button, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quizz</Text>
      <View style={styles.buttons}>
        <View style={styles.buttonWrapper}>
        <Button title="✅ Attend Quizz" onPress={() => router.push('/attendee/entryScreen')} />
        </View>
        <View style={styles.buttonWrapper}>
        <Button title="🔐 Create Quizz" color='grey' onPress={() => router.push('/auth/Login')} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
    gap: 50,
    padding: 20,
  },
  title: {
    fontSize: 54,
    fontWeight: "500",
    marginBottom: 20,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "column",
    padding: 40,
    gap: 10,
  },
  buttonWrapper: {
    marginBottom: 10, 
  },
});
