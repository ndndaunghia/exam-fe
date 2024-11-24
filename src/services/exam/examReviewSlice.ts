import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getExamHistoryReview } from "./examApi";
import { ExamHistoryReview, ExamReviewState } from "./exam.type";

const initialState: ExamReviewState = {
  loading: false,
  error: null,
  success: false,
  examHistoryReview: null, // Ban đầu là null
};

export const getExamHistoryReviewAsync = createAsyncThunk<
  ExamHistoryReview, // Kiểu dữ liệu trả về
  number, // Kiểu tham số đầu vào
  {
    rejectValue: string; // Kiểu lỗi trả về
  }
>("exam/getExamHistoryReview", async (id: number, { rejectWithValue }) => {
  try {
    const response = await getExamHistoryReview(id);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Lấy chi tiết đề thi thất bại"
    );
  }
});

const examReviewSlice = createSlice({
  name: "examReview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getExamHistoryReviewAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getExamHistoryReviewAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.examHistoryReview = action.payload;
      })
      .addCase(getExamHistoryReviewAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default examReviewSlice.reducer;
