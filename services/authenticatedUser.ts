import * as SecureStore from 'expo-secure-store';

const USER_KEY = 'auth_user';

export const saveUser = async (user: any) => {
  try {
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
  } catch (err) {
    console.error('Failed to save user:', err);
  }
};

export const getUser = async () => {
  try {
    const userJson = await SecureStore.getItemAsync(USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  } catch (err) {
    console.error('Failed to get user from SecureStore:', err);
    return null;
  }
};

export const clearUser = async () => {
  try {
    await SecureStore.deleteItemAsync(USER_KEY);
  } catch (err) {
    console.error('Failed to clear user:', err);
  }
};
