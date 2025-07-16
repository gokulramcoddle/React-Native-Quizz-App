import { apiRequest, saveToken } from './api';
import { clearUser, saveUser } from './authenticatedUser';

export const loginUser = async (email: string, password: string) => {
  try {
    const data = await apiRequest({ method: 'POST', url: '/auth/login', data: { email, password } });
    console.log('[login] API response:', data);

    if (data?.token) await saveToken(data.token);
    if (data?.user) {
      const { password: _omit, ...safeUser } = data.user;
      await saveUser(safeUser);
      
console.log('[login] saved user', safeUser);    }

    return data;
  } catch (err) {
    console.error('[login] error', err);
    throw err;
  } 
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
  })

  return res;
}

export const getQuizzQuestions = async ( code: string, page: number, limit: number) => {
  const res = await apiRequest({
    method: 'GET',
    url: `/quizz/code/${code}?page=${page}&limit=${limit}`,
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
  });
};

export const isValid = async(code: string) => {
const res = await apiRequest({
  method: 'POST',
  url: '/quizz/isvalid',
  data: { code },
 })
 return res;
}

export const getUserQuizz = async (userId: number) => {
 try{
   const res = await apiRequest({
    method: 'GET',
    url: `/quizz/${userId}`,
  })
  return res;
} catch (err) {
  console.error('Failed to load');
}
}