import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../services/auth/authSlice";
import subjectSlice from "../services/subjects/subjectSlice";
import courseSlice from "../services/courses/courseSlice";
import authorSlice from "../services/authors/authorSlice";

// Import other reducers as needed

export const store = configureStore({
  reducer: {
    auth: authSlice,
    subject: subjectSlice,
    course: courseSlice,
    author: authorSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
