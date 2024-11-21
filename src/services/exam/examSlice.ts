import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ExamSliceState } from "./exam.type";
import { getAllExams, getDetailExam, submitExam } from "./examApi";

const initialState: ExamSliceState = {
  exams: [],
  currentExam: null,
  total: 0,
  currentPage: 1,
  lastPage: 1,
  loading: false,
  error: null,
  success: false,
  submissionResult: null,
};
export const getAllExamsAsync = createAsyncThunk(
  "exam/getAllExams",
  async (
    params: { page?: number; limit?: number } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await getAllExams(params.page, params.limit);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lấy danh sách đề thi thất bại"
      );
    }
  }
);

export const getDetailExamAsync = createAsyncThunk(
  "exam/getDetailExam",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await getDetailExam(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lấy chi tiết đề thi thất bại"
      );
    }
  }
);

export const submitExamAsync = createAsyncThunk(
  "exam/submitExam",
  async (
    { examId, answers }: { examId: number; answers: any[] },
    { rejectWithValue }
  ) => {
    try {
      const response = await submitExam(examId, answers);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Nộp bài thi thất bại"
      );
    }
  }
);

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    resetExamState(state) {
      state.success = false;
      state.error = null;
      state.submissionResult = null;
    },
  },
  extraReducers: (builder) => {
    // Get All Exams
    builder
      .addCase(getAllExamsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAllExamsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.exams = action.payload.data;
        state.total = action.payload.total;
        state.currentPage = action.payload.current_page;
        state.lastPage = action.payload.last_page;
      })
      .addCase(getAllExamsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get Exam Detail
      .addCase(getDetailExamAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getDetailExamAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.currentExam = action.payload;
      })
      .addCase(getDetailExamAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Submit Exam
      .addCase(submitExamAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitExamAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.submissionResult = action.payload;
      })
      .addCase(submitExamAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetExamState } = examSlice.actions;

export default examSlice.reducer;
