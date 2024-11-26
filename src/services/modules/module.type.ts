export interface Question {
  id: number;
  lesson_id: number;
  name: string;
  image_url: string | null;
  description: string;
  status: number;
  is_unlocked: boolean;
  is_checked: boolean;
  difficulty: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  status_string: string;
  difficulty_string: string;
  is_unlocked_string: string;
  is_checked_string: string;
}

export interface Lesson {
  id: number;
  module_id: number;
  name: string;
  video_url: string;
  description: string;
  duration: number;
  order: number;
  status: number;
  is_unlocked: boolean;
  is_checked: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  status_string: string;
  is_unlocked_string: string;
  is_checked_string: string;
  question: Question[];
}

export interface Module {
  id: number;
  course_id: number;
  name: string;
  order: number;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  status_string: string;
  lesson: Lesson[];
}

export interface Subject {
  id: number;
  name: string;
  thumbnail_url: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Course {
  id: number;
  subject_id: number;
  name: string;
  thumbnail_url: string;
  author_id: string;
  total_purchases: number;
  description: string;
  price: string;
  duration: number;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  status_string: string;
  subject: Subject;
  module: Module[];
}

export interface ResponseData {
  msg: string;
  code: number;
  data: {
    course: Course;
  };
}
