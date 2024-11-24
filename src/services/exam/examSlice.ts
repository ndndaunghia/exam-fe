import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExamSliceState } from "./exam.type";
import {
  getAllExams,
  getAllExamsHistory,
  getDetailExam,
  submitExam,
} from "./examApi";

const initialState: ExamSliceState = {
  exams: [],
  currentExam: null,
  history: [],
  total: 0,
  currentPage: 1,
  lastPage: 1,
  loading: false,
  error: null,
  success: false,
  submissionResult: null,

  answers: [],
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
      console.log(response);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Nộp bài thi thất bại"
      );
    }
  }
);

export const getAllExamsHistoryAsync = createAsyncThunk(
  "exam/getAllExamsHistory",
  async (
    params: { page?: number; limit?: number } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await getAllExamsHistory(params.page, params.limit);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lấy lịch sử bài thi thất bại"
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
    setAnswer: (
      state,
      action: PayloadAction<{
        exam_question_id: number;
        optionId: number;
        isMultiple: boolean;
      }>
    ) => {
      const { exam_question_id, optionId, isMultiple } = action.payload;
      const existingAnswerIndex = state.answers.findIndex(
        (answer) => answer.exam_question_id === exam_question_id
      );

      if (existingAnswerIndex !== -1) {
        if (isMultiple) {
          // Xử lý cho câu hỏi nhiều đáp án
          const currentOptions = state.answers[existingAnswerIndex].options
            ? state.answers[existingAnswerIndex].options.split(", ").map(Number)
            : [];

          const optionIndex = currentOptions.indexOf(optionId);
          if (optionIndex === -1) {
            currentOptions.push(optionId);
          } else {
            currentOptions.splice(optionIndex, 1);
          }

          state.answers[existingAnswerIndex].options = currentOptions.length
            ? currentOptions.sort((a, b) => a - b).join(", ")
            : "";
        } else {
          // Xử lý cho câu hỏi một đáp án
          state.answers[existingAnswerIndex].options = optionId.toString();
        }
      } else {
        state.answers.push({
          exam_question_id,
          options: optionId.toString(),
        });
      }
    },

    // Reset answers
    resetAnswers: (state) => {
      state.answers = [];
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
      })

      // Get All Exams History
      .addCase(getAllExamsHistoryAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAllExamsHistoryAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.history = action.payload.data; // Lưu danh sách lịch sử bài thi
        state.total = action.payload.total; // Tổng số lịch sử
        state.currentPage = action.payload.current_page; // Trang hiện tại
        state.lastPage = action.payload.last_page; // Tổng số trang
      })
      .addCase(getAllExamsHistoryAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetExamState, setAnswer, resetAnswers } = examSlice.actions;

export default examSlice.reducer;
