import { View, StyleSheet, ActivityIndicator } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { getStoredToken } from "@/services/api";
import { getUser } from "@/services/authenticatedUser";
import AppButton from "@/components/AppButton";
import AppText from "@/components/AppText";

export default function Index() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isCreator, setIsCreator] = useState(false);
  const { skipAuthCheck } = useLocalSearchParams();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getStoredToken();
      const user = await getUser();

      if (token && user) {
        setIsCreator(true);
        if (skipAuthCheck !== 'true') {
          router.replace("/home/homeScreen");
          return;
        }
      }

      setCheckingAuth(false);
    };

    checkAuth();
  }, []);

  if (checkingAuth) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Quizz</AppText>
      <View style={styles.buttons}>
        <View style={styles.buttonWrapper}>
          <AppButton
            style={styles.attendBtn}
            title="Attend Quizz"
            onPress={() => router.push("/attendee/entryScreen")}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <AppButton
            style={styles.createBtn}
            title={isCreator ? "Create Quizz" : "Creator Login"}
            onPress={() =>
              router.push(isCreator ? "/home/homeScreen" : "/auth/Login")
            }
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 70,
    fontWeight: "500",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Inter-Bold",
  },
  buttons: {
    flexDirection: "column",
    padding: 40,
    marginTop: 120,
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
  },
});

