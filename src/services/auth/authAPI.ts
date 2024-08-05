import axios from "axios";
import { LoginCredentials, LoginResponse } from "./auth.type";

const API_URL = "http://localhost:8080/api/v1/user";

// Tạo một instance của axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const loginUser = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>(
      "/login",
      credentials
    );
    console.log("Login response:", response);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
