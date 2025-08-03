import AppButton from '@/components/AppButton';
import AppTitle from '@/components/AppTitle';
import { signUpUser } from '@/services/apiService';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = { name: '', email: '', password: '' };

    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (!form.password || form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

const handleSignup = async () => {
  if (!validate()) return;
  try{
    setLoading(true);
  const response = await signUpUser(form.name, form.email, form.password);
  if (!response) {
    Alert.alert('Signup Failed', response.message);
  } else {
    Alert.alert('Signup Successful', 'You can now login');
    setForm({ name: '', email: '', password: '' });
    router.replace('/auth/Login');
  }
} catch (err) {
   Alert.alert('Somthing went wrong please try again.')
} finally {
  setLoading(false);
}
};

  return (
    <View style={styles.container}>
      <AppTitle style={styles.header}>Create Account</AppTitle>
       <Text style={styles.text}>Name:</Text>
      <TextInput
        placeholder="Name"
        value={form.name}
        onChangeText={(text) => handleChange('name', text)}
        style={styles.input}
      />
      {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}
   
      <Text style={styles.text}>Email:</Text>
      <TextInput
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => handleChange('email', text)}
        style={styles.input}
      />
      {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

      <Text style={styles.text}>Password:</Text>
      <TextInput
        placeholder="Password"
        value={form.password}
        secureTextEntry
        onChangeText={(text) => handleChange('password', text)}
        style={styles.input}
      />
      {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}
    {loading ? (
                <View style={styles.loadingWrapper}>
                  <ActivityIndicator size="small" color="#a811bfff" />
                </View>
              ) : ( 
                <AppButton title="Sign Up" onPress={handleSignup} />)}
       <Text style={styles.message}>
  Already have an account?{" "}
  <Text style={styles.link} onPress={() => router.replace("/auth/Login")}>
    Login
  </Text>
</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flex: 1,
  },
  header: {
    color: "white",
    fontSize: 28,
    marginBottom: 25,
    textAlign: "center",
  },
  text: {
    color: '#a811bfff'
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
  }
});
