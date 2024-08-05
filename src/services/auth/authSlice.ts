import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser, registerUser, fetchUserData } from './authActions';
import { AuthState, LoginResponse, RegisterResponse, UserData } from './auth.type';
import Cookies from 'js-cookie';

const initialState: AuthState = {
  user: null,
  userToken: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.userToken = null;
      localStorage.removeItem('userId');
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<RegisterResponse>) => {
        state.isLoading = false;
        // state.user = {
        //   _id: action?.payload?.data?._id,
        //   username: action?.payload?.data?.username,
        //   email: action?.payload?.data?.email,
        //   fullName: action?.payload?.data?.fullName,
        //   phone: action?.payload?.data?.phone,
        // };
        // state.userToken = action?.payload?.data?.userToken;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'An unknown error occurred';
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.isLoading = false;
        state.user = {
          _id: action.payload.data._id,
          username: action.payload.data.username,
          email: action.payload.data.email,
          fullName: action.payload.data.fullName,
          phone: action.payload.data.phone,
        };
        state.userToken = action.payload.data.userToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'An unknown error occurred';
      })
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.isLoading = false;
        state.user = {
          _id: action.payload.data._id,
          username: action.payload.data.username,
          email: action.payload.data.email,
          fullName: action.payload.data.fullName,
          phone: action.payload.data.phone,
        };
        // state.userToken = action.payload.data.userToken;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'An unknown error occurred';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
