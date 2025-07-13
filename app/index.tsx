import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import AppButton from "@/components/AppButton";
import AppText from "@/components/AppText";

export default function Index() {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Quizz</AppText>
      <View style={styles.buttons}>
        <View style={styles.buttonWrapper}>
          <AppButton
            style={styles.attendBtn}
            title="Attend Quizz"
            onPress={() => router.push('/attendee/entryScreen')}
          />
        </View>
        <View style={styles.buttonWrapper}>
        <AppButton
        style={styles.createBtn}
            title="Creator Login"
            onPress={() => router.push('/auth/Login')}
          />
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
    fontSize: 70,
    fontWeight: "500",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Inter-Bold"
  },
  buttons: {
    flexDirection: "column",
    padding: 40,
    marginTop:120,
    gap: 10,
  },
  buttonWrapper: {
    marginBottom: 10,
  },
  attendBtn: {
    backgroundColor: "#a811bfff",
    paddingVertical: 10,
  },
  createBtn: {
    backgroundColor: "transparent",
    elevation: 0,
    borderWidth: 1,
    borderColor: "#a811bfff",
    paddingVertical: 10,
  }
});


