import { Course } from "../courses/course.type";

export interface Author {
  id: number;
  name: string;
  avatar_url: string | null;
  email: string;
  phone_number: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  courses_count: number;
  courses?: Course[]; // chỉ có trong chi tiết tác giả
}

export interface DetailAuthorResponse {
  msg: string;
  code: number;
  data: {
    author: Author;
  };
}

export interface AuthorsData {
  data: Author[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  has_more_pages: boolean;
}

export interface ListAuthorResponse {
  msg: string;
  code: number;
  data: {
    authors: AuthorsData;
  };
}

export interface AuthorState {
  authors: Author[];
  total: number;
  currentPage: number;
  lastPage: number;
  loading: boolean;
  error: string | null;
  success: boolean;
}
