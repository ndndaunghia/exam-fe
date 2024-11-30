export interface CheckedLessonResponse {
  msg: string;
  code: number;
  data: string;
}

export interface AnswerQuestionResponse {
  msg: string;
  code: number;
  message: string;
}

export interface AnswerQuestionRequest {
  options: string;
}

export interface LearnCourseState {
  isCheckingLesson: boolean;
  isAnsweringQuestion: boolean;
  checkedLesson: CheckedLessonResponse | null;
  answeredQuestion: AnswerQuestionResponse | null;
}
