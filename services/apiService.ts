import { apiRequest, saveToken } from './api';
import { saveUser } from './authenticatedUser';

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

  if(data?.user){
    await saveUser(data.user);
  }
  return {message: data.message,success: data.success, userName: data?.user?.name};
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


type Option = {
  text: string;
  is_correct: boolean;
};

type CreateQuestionPayload = {
  quizzId: number;
  text: string;
  options: Option[];
};

export const createQuestion = async (data: CreateQuestionPayload) => {
  const res = await apiRequest({
    method: 'POST',
    url: '/quizz/qacreate',
    data: {
      quizz_id: data.quizzId,
      text: data.text,
      options: data.options,
    },
    withAuth: false,
  });

  return res;
};

export const createQuizz = async ( title: string, user_id: number) => {
  const res = await apiRequest({
    method: 'POST',
    url: '/quizz/create',
    data: {
      title, user_id
    },
    withAuth: true,
  })

  return res;
}