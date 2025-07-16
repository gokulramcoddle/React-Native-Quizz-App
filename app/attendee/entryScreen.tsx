import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText';
import { isValid } from '@/services/apiService';
import { router } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native';

export default function AttendInfoScreen() {
  const [form, setForm] = useState({ code: 'X_drL4', name: '', email: '' });
  const [errors, setErrors] = useState({ code: '', name: '', email: '' });
  const [loading, setLoading] = useState(false); //Add loading state

  const handleChange = (key: 'code' | 'name' | 'email', value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const validate = async () => {
    let valid = true;
    const newErrors = { code: '', name: '', email: '' };

    if (!form.code.trim()) {
      newErrors.code = 'Code is required';
      valid = false;
    } else {
      try {
        
        const res = await isValid(form.code);
        if (!res.success) {
          newErrors.code = 'Invalid code';
          valid = false;
        }
      } catch (error: any) {
        newErrors.code = `${error.message}`;
        valid = false;
      }
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

  const handleStart = async () => {
    setLoading(true); // Start loading
    const isValidForm = await validate();
    if (!isValidForm) {
      setLoading(false); // stop loading if invalid
      return;
    }

    router.push({
      pathname: '/attendee/questionsScreen',
      params: {
        code: form.code,
        name: form.name,
        email: form.email,
      },
    });
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Enter Your Details</AppText>
      
      <Text style={styles.text}>Code:</Text>
      <TextInput
        placeholder="Code"
        style={styles.input}
        value={form.code}
        onChangeText={(text) => handleChange('code', text)}
      />
      {errors.code ? <Text style={styles.error}>{errors.code}</Text> : null}

      <Text style={styles.text}>Name:</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={form.name}
        onChangeText={(text) => handleChange('name', text)}
      />
      {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}

      <Text style={styles.text}>Email:</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={form.email}
        onChangeText={(text) => handleChange('email', text)}
        keyboardType="email-address"
      />
      {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

      {loading ? (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size="small" color="#007AFF" />
        </View>
      ) : (
        <AppButton title="Start" variant='primary' onPress={handleStart} disabled={loading} />
      )}
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
    color: "white",
    borderColor: '#a811bfff',
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
   text: {
    color: '#a811bfff'
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
  loadingWrapper: {
    marginTop: 10,
    alignItems: 'center',
  },
  // startBtn: {
  //  backgroundColor: "#a811bfff",
  // },
});
