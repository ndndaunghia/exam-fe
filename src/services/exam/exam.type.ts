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
  exams: Exam[];
  currentExam: Exam | null;
  total: number;
  currentPage: number;
  lastPage: number;
  loading: boolean;
  error: string | null;
  success: boolean;
  submissionResult: ExamSubmissionResponse["data"] | null;
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
