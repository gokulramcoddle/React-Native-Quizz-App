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

export const getQuizzQuestions = async ( code: string, page: number, limit: number) => {
  const res = await apiRequest({
    method: 'GET',
    url: `/quizz/code/${code}?page=${page}&limit=${limit}`,
    withAuth: false,
  })
  return res;
}

export const submitQuizResult = async ({
  name,
  email,
  score,
  total_questions,
  quizz_id,
}: {
  name: string;
  email: string;
  score: number;
  total_questions: number;
  quizz_id: number;
}) => {
  return await apiRequest({
    method: 'POST',
    url: '/quizz/submit',
    data: {
      name,
      email,
      score,
      total_questions,
      quizz_id,
    },
    withAuth: false,
  });
};

export const isValid = async(code: string) => {
const res = await apiRequest({
  method: 'POST',
  url: '/quizz/isvalid',
  data: { code },
  withAuth: false,
 })
 return res;
}