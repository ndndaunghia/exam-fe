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
}
