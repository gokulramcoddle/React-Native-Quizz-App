import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL as string;
const TOKEN_KEY = 'auth_token';

/* ───────────────────────── SecureStore helpers ──────────────────── */
export const getStoredToken = async () =>
  SecureStore.getItemAsync(TOKEN_KEY).catch(() => null);

export const saveToken = async (token: string) =>
  SecureStore.setItemAsync(TOKEN_KEY, token).catch(() => {});

export const clearToken = async () =>
  SecureStore.deleteItemAsync(TOKEN_KEY).catch(() => {});

/* ───────────────────────── Axios instance  ───────────────────────── */
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
});

/* Attach token once for all requests */
api.interceptors.request.use(async (config) => {
  const token = await getStoredToken();

  if (token) {
    // Safe way to set Authorization header
    config.headers.set?.('Authorization', `Bearer ${token}`);
  }

  return config;
});



/* ───────────────────────── Wrapper  ──────────────────────────────── */
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ApiRequestOptions<T = any> {
  method?: HTTPMethod;
  url: string;
  data?: any;
  params?: any;
  headers?: Record<string, string>;
  contentType?: string;
}

export async function apiRequest<T = any>({
  method = 'GET',
  url,
  data,
  params,
  headers,
  contentType = 'application/json',
}: ApiRequestOptions<T>): Promise<T> {
  const config: AxiosRequestConfig = {
    method,
    url,
    params,
    headers: {
      'Content-Type': contentType,
      ...(headers || {}),
    },
    data,
  };

  const res: AxiosResponse<T> = await api(config);
  return res.data;
}
