import { Subject } from "../subjects/subject.type";

export interface Course {
  id: number;
  subject_id: number;
  name: string;
  thumbnail_url: string | undefined | null;
  author_id: string;
  total_purchases: number;
  description: string | null;
  price: number;
  duration: number;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  status_string: string;
  subject: Subject;
  module: null; // Để tạm thời
}

export interface CoursesData {
  data: Course[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  has_more_pages: boolean;
}

export interface DetailCourseResponse {
  msg: string;
  code: number;
  data: Course;
}

export interface ListCourseResponse {
  msg: string;
  code: number;
  data: {
    courses: CoursesData;
  };
}

export interface CourseState {
  courses: Course[];
  total: number;
  currentPage: number;
  lastPage: number;
  loading: boolean;
  error: string | null;
  success: boolean;
}
