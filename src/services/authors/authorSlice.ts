import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthorState } from "./author.type";
import { getAllAuthors, getDetailAuthor } from "./authorApi";

const initialState: AuthorState = {
  authors: [],
  total: 0,
  currentPage: 1,
  lastPage: 1,
  loading: false,
  error: null,
  success: false,
};

export const getAllAuthorsAsync = createAsyncThunk(
  "author/getAllAuthors",
  async (params: { page: number; limit: number }, { rejectWithValue }) => {
    try {
      const response = await getAllAuthors(params.page, params.limit);
      return response.data.authors;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lấy danh sách tác giả thất bại"
      );
    }
  }
);

export const getDetailAuthorAsync = createAsyncThunk(
  "author/getDetailAuthor",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await getDetailAuthor(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Lấy chi tiết tác giả thất bại"
      );
    }
  }
);

const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    resetAuthorState(state) {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAuthorsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getAllAuthorsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.authors = action.payload.data;
        state.total = action.payload.total;
        state.currentPage = action.payload.current_page;
        state.lastPage = action.payload.last_page;
        state.success = true;
      })
      .addCase(getAllAuthorsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getDetailAuthorAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getDetailAuthorAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.authors = [action.payload.author];
        state.success = true;
      })
      .addCase(getDetailAuthorAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetAuthorState } = authorSlice.actions;

export default authorSlice.reducer;
