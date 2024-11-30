import axiosInstance from "../../utils/axiosInstance";
import {
  AnswerQuestionRequest,
  AnswerQuestionResponse,
  CheckedLessonResponse,
} from "./learnCourse.type";

export const checkedLesson = async (lessonId: string) => {
  const response = await axiosInstance.post<CheckedLessonResponse>(
    `/lessons/${lessonId}/check`
  );
  return response.data;
};

export const answerQuestion = async (questionId: string, options: string) => {
  const response = await axiosInstance.post<AnswerQuestionResponse>(
    `/questions/${questionId}/answer`,
    { options }
  );
  return response.data;
};
