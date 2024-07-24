import axios from 'axios';
import { LoginCredentials, LoginResponse } from './auth.type';

const API_URL = 'http://localhost:8080/api/v1/user';

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${API_URL}/login`, credentials);
  return response.data;
};