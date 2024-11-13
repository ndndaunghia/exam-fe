// Định nghĩa Subject
export interface Subject {
  id: number;
  name: string;
  description: string | null;
  thumbnail_url: string | null;
  courses: null; // Để tạm thời
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// Định nghĩa SubjectsData cho danh sách môn học với phân trang
export interface SubjectsData {
  data: Subject[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  has_more_pages: boolean;
}

// Định nghĩa DetailSubjectResponse cho một môn học chi tiết
export interface DetailSubjectResponse {
  msg: string;
  code: number;
  data: Subject;
}

// Định nghĩa ListSubjectResponse cho danh sách môn học
export interface ListSubjectResponse {
  msg: string;
  code: number;
  data: {
    subjects: SubjectsData;
  };
}

export interface SubjectState {
  subjects: Subject[];
  total: number;
  currentPage: number;
  lastPage: number;
  loading: boolean;
  error: string | null;
  success: boolean;
}
