export interface User {
    id: string;
    username: string;
    email: string;
  }
  
  export interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface LoginCredentials {
    username: string;
    password: string;
  }

  export interface UserData {
    username: string;
    id: string;
    token: string;
    email: string;
    fullname: string | null;
    phone: string | null;
  }
  
  export interface LoginResponse {
    data: UserData;
  }