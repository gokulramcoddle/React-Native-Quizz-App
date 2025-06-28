import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function AttendInfoScreen() {
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState('');

  const handleChange = (value: string) => {
    setCode(value);
    setErrors('');
  };

  const validate = () => {
    let valid = true;

    if (!code.trim()) {
          setErrors('Code is required');
      valid = false;
    }

    return valid;
  };

  const handleStart = () => {
    if (!validate()) return;
    router.push('/attendee/entryScreen');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Quizz Code"
        style={styles.input}
        value={code}
        onChangeText={(text) => handleChange(text)}
      />
      {errors ? <Text style={styles.error}>{errors}</Text> : null}
      <Button title="Submit" onPress={handleStart} />
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
