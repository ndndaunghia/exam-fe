import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LearnCourseState } from "./learnCourse.type";
import { answerQuestion, checkedLesson } from "./learnCourseApi";

const initialState: LearnCourseState = {
  isCheckingLesson: false,
  isAnsweringQuestion: false,
  checkedLesson: null,
  answeredQuestion: null,
};

export const checkLessonAsync = createAsyncThunk(
  "learnCourse/checkLesson",
  async (lessonId: string, { rejectWithValue }) => {
    try {
      const response = await checkedLesson(lessonId);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Kiểm tra bài học thất bại"
      );
    }
  }
);

export const answeredQuestionAsync = createAsyncThunk(
  "learnCourse/answeredQuestion",
  async (
    { questionId, options }: { questionId: string; options: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await answerQuestion(questionId, options);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Trả lời câu hỏi thất bại"
      );
    }
  }
);

const learnCourseSlice = createSlice({
  name: "learnCourse",
  initialState,
  reducers: {
    resetLearnCourseState(state) {
      state.checkedLesson = null;
      state.answeredQuestion = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkLessonAsync.pending, (state) => {
        state.isCheckingLesson = true;
      })
      .addCase(checkLessonAsync.fulfilled, (state, action) => {
        state.isCheckingLesson = false;
        state.checkedLesson = action.payload;
      })
      .addCase(checkLessonAsync.rejected, (state) => {
        state.isCheckingLesson = false;
      })
      .addCase(answeredQuestionAsync.pending, (state) => {
        state.isAnsweringQuestion = true;
      })
      .addCase(answeredQuestionAsync.fulfilled, (state, action) => {
        state.isAnsweringQuestion = false;
        state.answeredQuestion = action.payload;
      })
      .addCase(answeredQuestionAsync.rejected, (state) => {
        state.isAnsweringQuestion = false;
      });
  },
});

export const { resetLearnCourseState } = learnCourseSlice.actions;

export default learnCourseSlice.reducer;
