export interface Exam {
  id: number;
  subject_id: number;
  name: string;
  year: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  questions?: Question[];
}

export interface ExamSliceState {
  exams: Exam[]; // Danh sách đề thi
  history: ExamResult[]; // Danh sách lịch sử bài thi
  currentExam: Exam | null; // Đề thi hiện tại
  total: number;
  currentPage: number;
  lastPage: number;
  loading: boolean;
  error: string | null;
  success: boolean;
  submissionResult: ExamSubmissionResponse["data"] | null;
  answers: Answer[];
}

export interface Question {
  id: number;
  exam_id: number;
  name: string;
  image_url: string | null;
  description: string | null;
  status: number;
  difficulty: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  status_string: string;
  total_correct_option: number;
  difficulty_string: string;
  options: Option[];
}

export interface Option {
  id: number;
  question_id: number;
  content: string;
  explanation: string | null;
  is_correct: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  is_correct_string: string;
}

export interface DetailExamResponse {
  msg: string;
  code: number;
  data: Exam;
}

export interface ListExamResponse {
  msg: string;
  code: number;
  data: {
    data: Exam[];
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    has_more_pages: boolean;
  };
}

export interface ExamSubmissionRequest {
  answers: Array<{
    exam_question_id: number;
    options: string;
  }>;
}

// Types for exam submission response
export interface ExamSubmissionResponse {
  msg: string;
  code: number;
  data: {
    message: string;
    result: {
      total_questions: number;
      correct_answers: number;
      total_score: number;
    };
    exam_details: {
      id: number;
      subject_id: number;
      name: string;
      year: number;
      questions: Array<{
        id: number;
        name: string;
        description: string | null;
        image_url: string | null;
        status: number;
        difficulty: number;
        submitted_options: number[];
        correct_options: number[];
        is_correct: boolean;
        options: Array<{
          id: number;
          content: string;
          explanation: string | null;
          is_correct: number;
        }>;
      }>;
    };
  };
}

interface Answer {
  exam_question_id: number;
  options: string;
}

export interface ExamDetails extends Exam {
  questions: ExamQuestion[]; // Chi tiết câu hỏi
}

// Bổ sung thêm interface ExamQuestion từ Question
// Đây là phần được thêm mới và mở rộng từ interface Question
export interface ExamQuestion extends Question {
  submitted_options: number[]; // Các đáp án mà người dùng đã chọn
  correct_options: number[]; // Đáp án đúng của câu hỏi
  is_correct: boolean; // Câu hỏi có được trả lời đúng hay không
}

// Interface trả về cho danh sách kết quả bài thi
// Đây là phần được thêm mới
export interface ExamResponse {
  msg: string;
  code: number;
  data: {
    data: ExamResult[]; // Danh sách kết quả
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    has_more_pages: boolean;
  };
}

// Kết quả của từng bài thi
// Đây là phần được thêm mới
export interface ExamResult {
  id: number;
  exam_id: number;
  user_id: number;
  score: string;
  correct_answers: number;
  total_questions: number;
  submitted_answers: ExamSubmissionRequest["answers"]; // Dựa trên cấu trúc của câu trả lời
  exam_details: ExamDetails; // Chi tiết kỳ thi
  exam: {
    id: number;
    name: string;
    year: number;
    subject_id: number;
    subject: {
      id: number;
      name: string;
    };
  }; // Thông tin kỳ thi
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ExamHistoryReview {
  id: number;
  exam_id: number;
  score: string;
  correct_answers: number;
  total_questions: number;
  submitted_answers: {
    exam_question_id: number;
    options: string;
  }[];
  exam_details: {
    id: number;
    name: string;
    questions: {
      id: number;
      name: string;
      description: string | null;
      image_url: string | null;
      submitted_options: number[];
      correct_options: number[];
      is_correct: boolean;
      options: {
        id: number;
        content: string;
        explanation: string | null;
        is_correct: number;
      }[];
    }[];
  };
  exam: {
    name: string;
    subject: {
      name: string;
    };
  };
}

export interface ExamHistoryReviewResponse {
  msg: string;
  code: number;
  data: ExamHistoryReview;
}

export interface ExamReviewState {
  loading: boolean;
  error: string | null;
  success: boolean;
  examHistoryReview: ExamHistoryReview | null; // Hỗ trợ cả null và dữ liệu thực tế
}
