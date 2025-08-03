import AppAlert from "@/components/AppAlert";
import AppButton from "@/components/AppButton";
import AppTitle from "@/components/AppTitle";
import { loginUser } from "@/services/apiService";
import { Link, router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [screenError, setScreenError] = useState('');
  const [loading, setLoading] = useState(false);
    const [alertContent, setAlertContent] = useState({ 
        visiblity: false,
        title: '',
        message: '', 
        });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!form.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

 const handleLogin = async () => {
  if (!validate()) return;

  try {
    setLoading(true);
    await loginUser(form.email, form.password);
      router.replace('/home/homeScreen');
  } catch (err: any) {
   if (err.response?.status === 401) {
   setScreenError(`${err.response.data.error}`);
    } else {
      setScreenError("Something went wrong. Please try again.");
    }  
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>
     <AppTitle style={styles.header}>Login</AppTitle>
     { screenError && (
  <Text style={styles.screenError}>{screenError}</Text>
  )}
      <Text style={styles.text}>Email:</Text>
      <TextInput
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
        style={styles.input}
        keyboardType="email-address"
      />
      {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}
      
      <Text style={styles.text}>Password:</Text>
      <TextInput
        placeholder="Password"
        value={form.password}
        onChangeText={(text) => handleChange("password", text)}
        style={styles.input}
        secureTextEntry
      />
      {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}
     {loading ? (
            <View style={styles.loadingWrapper}>
              <ActivityIndicator size="small" color="#a811bfff" />
            </View>
          ) : ( 
          <AppButton title="Login" onPress={handleLogin} />)}
      <Text style={styles.message}>
  Don’t have an account?{' '}
  <Text style={styles.link} onPress={() => router.replace('/auth/Signup')}>
    Sign up
  </Text>
</Text>
<AppAlert
  visible={alertContent.visiblity}
  title={alertContent.title}
  message={alertContent.message}
  onClose={() =>
    setAlertContent({ visiblity: false, title: '', message: '' })
  }
/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flex: 1,
  },
  text: {
    color: '#a811bfff'
  },
  header: {
    color: "white",
    fontSize: 28,
    marginBottom: 25,
    textAlign: "center",
  },
  input: {
    borderColor: '#a811bfff',
    color: "white",
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  message: {
   textAlign: "center",
   color: "white",
    marginTop: 15,
  },

  link: {
    color: '#a811bfff',
    textDecorationLine: 'underline',
  }, 
  loadingWrapper: {
    marginTop: 10,
    alignItems: 'center',
  },
   screenError : {
    marginBottom:15,
     color: "red",
     textAlign: 'center',
  }
});
