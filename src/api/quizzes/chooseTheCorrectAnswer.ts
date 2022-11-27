import axios from 'axios';
import notificationTypes from '@components/Notification/notificationTypes';
import { IQuestion } from '@interfaces/quizToChooseTheCorrectAnswer.interface';

type TData = {
  question: string;
  correctAnswer: string;
  answers: string[];
};

interface ICreateQuiz {
  moduleId: string;
  name: string;
  quizType: string;
  questions: TData[];
}

interface IGetQuiz {
  data: {
    questions: IQuestion[];
  };
}

export const getQuizById = async (id: string | undefined) => {
  try {
    const { data } = await axios.get<IGetQuiz>(
      `/quizzes/get-quiz-choose-the-correct-answer-by-id/${id}`,
    );

    return data.data.questions;
  } catch (error: any) {
    notificationTypes.notificationWarn(error.response.data.message);
  }
};

export const createQuiz = async (data: ICreateQuiz) => {
  try {
    await axios.post('/quizzes/add-quiz-choose-the-correct-answer', data);
    notificationTypes.notificationSuccess('Квіз додано!');
  } catch (error: any) {
    notificationTypes.notificationWarn(error.response.data.message);
  }
};
