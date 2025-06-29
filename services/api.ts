import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
const TOKEN_KEY = 'auth_token';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// 🔐 Get token from secure store before making API calls
export const getStoredToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch (err) {
    console.error('Failed to get token from SecureStore:', err);
    return null;
  }
};

// ✅ Store token securely after login
export const saveToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } catch (err) {
    console.error('Failed to save token:', err);
  }
};

// ❌ Clear token on logout
export const clearToken = async () => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (err) {
    console.error('Failed to clear token:', err);
  }
};

interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  data?: any;
  params?: any;
  headers?: Record<string, string>;
  contentType?: string;
  withAuth?: boolean;
}

// 🌐 Request wrapper
export const apiRequest = async ({
  method = 'GET',
  url,
  data = {},
  params = {},
  headers = {},
  contentType = 'application/json',
  withAuth = true,
}: ApiRequestOptions) => {
  try {
    const token = withAuth ? await getStoredToken() : null;

    const config: import('axios').AxiosRequestConfig = {
      method,
      url,
      headers: {
        'Content-Type': contentType,
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      params,
    };

    if (method !== 'GET' && method !== 'DELETE') {
      config.data = data;
    }

    const response = await api(config);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      // handle token expiry if needed
    }

    throw error.response?.data || error;
  }
};
