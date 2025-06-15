// app/index.tsx
import { View, Text, Button, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quizz</Text>
      <View style={styles.buttons}>
        <View style={styles.buttonWrapper}>
          <Button title="Login" onPress={() => router.push("/auth/Login")} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Sign Up" onPress={() => router.push("/auth/Signup")} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 50,
    padding: 20,
  },
  title: {
    fontSize: 54,
    fontWeight: 500,
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
  }
});
