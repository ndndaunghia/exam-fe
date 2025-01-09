import { Module } from "../modules/module.type";
import { Subject } from "../subjects/subject.type";

export interface Course {
  id: number;
  subject_id: number;
  name: string;
  thumbnail_url: string | null;
  author_id: string;
  total_purchases: number;
  description: string | null;
  price: string;  // Thay đổi từ number sang string vì API trả về price dạng string
  duration: number;
  status: number;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
  status_string: string;
  subject: Subject;
  module: Module[];
}

export interface PaginatedData<T> {
  data: T[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  has_more_pages: boolean;
}

export interface ListCourseResponse {
  msg: string;
  code: number;
  data: {
    courses: PaginatedData<Course>;
  };
}

export interface DetailCourseResponse {
  msg: string;
  code: number;
  data: {
    course: Course;  // Thêm key course vì API response có nested course
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