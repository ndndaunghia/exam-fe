import axiosInstance from "../../utils/axiosInstance";
import { AuthRequest, AuthResponse } from "./auth.type";

export const login = async (authRequest: AuthRequest) => {
  const response = await axiosInstance.post<AuthResponse>(
    "/login",
    authRequest
  );
  return response.data;
};

export const register = async (authRequest: AuthRequest) => {
  const response = await axiosInstance.post<AuthResponse>(
    "/register",
    authRequest
  );
  return response.data;
};

export const getUserDetail = async (userId: string) => {
  const response = await axiosInstance.get(`/user-detail/${userId}`);
  return response.data;
};
