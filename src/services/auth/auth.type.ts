// export interface User {
//   _id: string;
//   username: string;
//   email: string;
//   fullName: string | null;
//   phone: string | null;
//   // userToken: string | null;
// }

// export interface AuthState {
//   user: User | null;
//   userToken: string | null;
//   isLoading: boolean;
//   error: string | null;
// }

// export interface LoginCredentials {
//   username: string;
//   password: string;
// }
// export interface RegisterCredentials extends LoginCredentials {
//   email: string;
//   confirmPassword: string | undefined;
// }

// export interface UserData {
//   _id: string;
//   username: string;
//   email: string;
//   fullName: string | null;
//   phone: string | null;
//   userToken: string;
// }

// export interface LoginResponse {
//   data: UserData;
// }

// export interface RegisterResponse {
//   data: UserData;
// }

export interface User {
  id: number,
  email: string,
  user_type: number,
  name: string,
  avatar_url: string | null,
  course_id: number | null,
  email_verified_at: string | null,
  createted_at: string | null,
  updated_at: string,
  created_at: string,
  type_string: string,
}

export interface AuthRequest {
  email: string,
  password: string,
  confirm_password?: string,
}

export interface AuthResponse {
  msg: string,
  code: number,
  data: AuthDataResponse,
}

export interface AuthDataResponse {
  message: string | null,
  user: User,
  token: string,
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}