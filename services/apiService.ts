import { apiRequest, saveToken } from './api';

export const loginUser = async (email: string, password: string) => {
  const data = await apiRequest({
    method: 'POST',
    url: '/auth/login',
    data: { email, password },
    withAuth: false,
  });

  if (data?.token) {
    await saveToken(data.token);
  }
  console.log(data);

  return data;
};


export const signUpUser = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await apiRequest({
    method: 'POST',
    url: '/auth/signup',
    data: { name, email, password },
    withAuth: false, // Signup doesn't need token
  });

  return response;
};