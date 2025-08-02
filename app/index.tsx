import React, { useState, useCallback, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import AppButton from "@/components/AppButton";
import { getStoredToken } from "@/services/api";
import { getUser } from "@/services/authenticatedUser";
import AppTitle from "@/components/AppTitle";

export default function Index() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isCreator, setIsCreator] = useState(false);
  // Wait until fonts are loaded and auth is checked
  useFocusEffect(
    useCallback(() => {
      const prepare = async () => {
        try {
          const token = await getStoredToken();
          const user = await getUser();
          setIsCreator(!!(token && user));
        } catch (e) {
          console.warn(e);
        } finally {
          setCheckingAuth(false);
        }
      };

      prepare();
    }, [])
  );
  
  if (checkingAuth) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#a811bfff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
  <Image
    source={require("@/assets/images/quizz-logo-removebg-preview.png")}
    style={styles.img}
  />
  <AppTitle style={styles.title}>uizGo</AppTitle>
  </View>
      <View style={styles.buttons}>
        <AppButton
          style={styles.attendBtn}
          title="Attend Quizz"
          onPress={() => router.push("/attendee/entryScreen")}
        />
        <AppButton
          style={styles.createBtn}
          title={isCreator ? "Create Quizz" : "Creator Login"}
          onPress={() =>
            router.push(isCreator ? "/home/homeScreen" : "/auth/Login")
          }
        />
      </View>
      <View style={styles.footer}>
  <AppTitle style={styles.footerText}>Developed by Gokul Ram Tamil</AppTitle>
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 50,
  },
  buttons: {
    padding: 40,
    marginTop: 120,
    gap: 20,
  },
  attendBtn: {
    backgroundColor: "#a811bfff",
    paddingVertical: 15,
  },
  createBtn: {
    backgroundColor: "transparent",
    elevation: 0,
    borderWidth: 1,
    borderColor: "#a811bfff",
    paddingVertical: 15,
  }, 
 titleContainer: {
  marginTop: 50,
  flexDirection: "row",
  alignItems: "center",
  marginRight: 53,
  justifyContent: "center",
},
img: {
  width: 200, // or any responsive value
  height: 200,
  resizeMode: "contain",
  marginRight: -50, // space between image and text
},
title: {
  color: "#fff",
  fontFamily: "RussoOne",
  fontSize: 85,
}, 
footer: {
  position: 'absolute',
  bottom: 0,
  right: 10,
},
footerText: {
  padding: 5,
  marginRight:3,
  fontSize: 7.3,
  color: '#efa3fba5',
},

});
