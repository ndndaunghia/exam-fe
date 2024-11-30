import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserDetail, login, register } from "./authAPI";
import { AuthRequest, AuthState } from "./auth.type";

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (authRequest: AuthRequest, { rejectWithValue }) => {
    try {
      const response = await login(authRequest);
      const data = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id.toString());

      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Đăng nhập thất bại"
      );
    }
  }
);

export const registerAsync = createAsyncThunk(
  "auth/register",
  async (authRequest: AuthRequest, { rejectWithValue }) => {
    try {
      const response = await register(authRequest);
      const data = response.data;

      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Đăng ký thất bại"
      );
    }
  }
);

export const getUserDetailAsync = createAsyncThunk(
  "auth/getUserDetail",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await getUserDetail(userId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lấy thông tin người dùng thất bại"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload.user;
        state.token = null;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getUserDetailAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetailAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getUserDetailAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
