import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CourseState } from "./course.type";
import { getAllCourses, getDetailCourse } from "./courseApi";

const initialState: CourseState = {
  courses: [], // Mảng môn học khởi tạo rỗng
  total: 0,
  currentPage: 1,
  lastPage: 1,
  loading: false,
  error: null,
  success: false,
};

export const getAllCoursesAsync = createAsyncThunk(
  "course/getAllCourses",
  async (params: { page: number; limit: number }, { rejectWithValue }) => {
    try {
      const response = await getAllCourses(params.page, params.limit);
      return response.data.courses;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lấy danh sách môn học thất bại"
      );
    }
  }
);

export const getDetailCourseAsync = createAsyncThunk(
  "course/getDetailCourse",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await getDetailCourse(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lấy chi tiết môn học thất bại"
      );
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    resetCourseState(state) {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoursesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAllCoursesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.data;
        state.total = action.payload.total;
        state.currentPage = action.payload.current_page;
        state.lastPage = action.payload.last_page;
        state.success = true;
      })
      .addCase(getAllCoursesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getDetailCourseAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getDetailCourseAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = [action.payload];
        state.success = true;
      })
      .addCase(getDetailCourseAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCourseState } = courseSlice.actions;

export default courseSlice.reducer;
