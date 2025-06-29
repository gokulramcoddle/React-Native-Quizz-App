import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function AttendInfoScreen() {
  const [form, setForm] = useState({ code: '', name: '', email: '' });
  const [errors, setErrors] = useState({ code: '', name: '', email: '' });

  const handleChange = (key: 'code' | 'name' | 'email', value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = { code: '', name: '', email: '' };

    
    if (!form.code.trim()) {
      newErrors.code = 'Code is required';
      valid = false;
    }

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

    setErrors(newErrors);
    return valid;
  };

  const handleStart = () => {
    if (!validate()) return;

    // Optionally store name/email in storage or context here

    // Redirect to quiz code input or quiz screen
    router.push('/attendee/entryScreen'); // change this to your actual route
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Details</Text>

<TextInput
        placeholder="Code"
        style={styles.input}
        value={form.code}
        onChangeText={(text) => handleChange('code', text)}
      />
      {errors.code ? <Text style={styles.error}>{errors.code}</Text> : null}

      <TextInput
        placeholder="Name"
        style={styles.input}
        value={form.name}
        onChangeText={(text) => handleChange('name', text)}
      />
      {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={form.email}
        onChangeText={(text) => handleChange('email', text)}
        keyboardType="email-address"
      />
      {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

      <Button title="Start" onPress={handleStart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});
