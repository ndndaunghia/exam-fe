import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SubjectState } from "./subject.type";
import { getAllSubjects, getDetailSubject } from "./subjectAPI";

const initialState: SubjectState = {
  subjects: [], // Mảng môn học khởi tạo rỗng
  total: 0,
  currentPage: 1,
  lastPage: 1,
  loading: false,
  error: null,
  success: false,
};

export const getAllSubjectsAsync = createAsyncThunk(
  "subject/getAllSubjects",
  async (params: { page: number; limit: number }, { rejectWithValue }) => {
    try {
      const response = await getAllSubjects(params.page, params.limit);
      return response.data.subjects;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lấy danh sách môn học thất bại"
      );
    }
  }
);

export const getDetailSubjectAsync = createAsyncThunk(
  "subject/getDetailSubject",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await getDetailSubject(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lấy chi tiết môn học thất bại"
      );
    }
  }
);

const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    resetSubjectState(state) {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSubjectsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAllSubjectsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.subjects = action.payload.data;
        state.total = action.payload.total;
        state.currentPage = action.payload.current_page;
        state.lastPage = action.payload.last_page;
      })
      .addCase(getAllSubjectsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getDetailSubjectAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getDetailSubjectAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.subjects = [action.payload];
      })
      .addCase(getDetailSubjectAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSubjectState } = subjectSlice.actions;

export default subjectSlice.reducer;
