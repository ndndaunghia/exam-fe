import axiosInstance from "../../utils/axiosInstance";
import {
  DetailExamResponse,
  ExamHistoryReview,
  ExamHistoryReviewResponse,
  ExamResponse,
  ExamResult,
  ExamSubmissionRequest,
  ExamSubmissionResponse,
  ListExamResponse,
} from "./exam.type";

export const getAllExams = async (page: number = 1, limit: number = 10) => {
  const response = await axiosInstance.get<ListExamResponse>("exams", {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};

export const getDetailExam = async (id: number) => {
  const response = await axiosInstance.get<DetailExamResponse>(
    `exams/${id}/detail`
  );
  return response.data;
};

export const submitExam = async (
  examId: number,
  answers: ExamSubmissionRequest["answers"]
) => {
  const response = await axiosInstance.post<ExamSubmissionResponse>(
    `do-exam/${examId}`,
    { answers }
  );
  return response.data;
};

export const getAllExamsHistory = async (
  page: number = 1,
  limit: number = 10
) => {
  const response = await axiosInstance.get<ExamResponse>("exam-histories", {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};

export const getExamHistoryReview = async (historyId: number) => {
  const response = await axiosInstance.get<ExamHistoryReviewResponse>(
    `exam-histories/${historyId}`
  );
  return response.data;
};
