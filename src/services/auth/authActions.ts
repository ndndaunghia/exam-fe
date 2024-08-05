import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  RegisterResponse,
  UserData,
} from "./auth.type";
import Cookies from "js-cookie";

const AUTH_URL = "http://localhost:8080/api/v1/user";

const axiosInstance = axios.create({
  baseURL: AUTH_URL,
  withCredentials: true,
});

interface CustomError {
  message: string;
}

// export const registerUser = createAsyncThunk<
//   UserData,
//   { username: string; email: string; password: string },
//   {
//     rejectValue: string;
//   }
// >(
//   "auth/register",
//   async ({ username, email, password }, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       const response = await axiosInstance.post<UserData>(
//         `${AUTH_URL}/registerUser`,
//         { username, email, password },
//         config
//       );
//       return response.data;
//     } catch (error) {
//       const err = error as AxiosError<CustomError>;
//       if (err.response && err.response.data.message) {
//         return rejectWithValue(err.response.data.message);
//       } else {
//         return rejectWithValue(err.message || "An unknown error occurred");
//       }
//     }
//   }
// );

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterCredentials,
  {
    rejectValue: string;
  }
>(
  "auth/register",
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axiosInstance.post<RegisterResponse>(
        `${AUTH_URL}/registerUser`,
        credentials,
        config
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError<CustomError>;
      if (err.response && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message || "An unknown error occurred");
      }
    }
  }
);

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  {
    rejectValue: string;
  }
>("auth/login", async (credentials: LoginCredentials, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<LoginResponse>(
      `${AUTH_URL}/login`,
      credentials
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError<CustomError>;
    if (err.response && err.response.data.message) {
      return rejectWithValue(err.response.data.message);
    } else {
      return rejectWithValue(err.message || "An unknown error occurred");
    }
  }
});

export const fetchUserData = createAsyncThunk<
  LoginResponse,
  string,
  {
    rejectValue: string;
  }
>("auth/fetchUserData", async (userId: string, { rejectWithValue }) => {
  try {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      return rejectWithValue("No access token found");
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axiosInstance.get<LoginResponse>(
      `${AUTH_URL}/getUserData/${userId}`,
      config
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError<CustomError>;
    if (err.response && err.response.data.message) {
      return rejectWithValue(err.response.data.message);
    } else {
      return rejectWithValue(err.message || "An unknown error occurred");
    }
  }
});
