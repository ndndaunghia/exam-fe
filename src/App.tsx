import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import PrivateRoutes from "./routes/PrivateRoutes";
import Loading from "./components/Loading";
import CoursePlayer from "./pages/CoursePlayer";
import ExamResult from "./pages/ExamPage/ExamResult";
import ExamHistoriesPage from "./pages/ExamHistories/ExamHistoriesPage";
import ExamReviewPage from "./pages/ExamReview/ExamReviewPage";
import MyCoursePage from "./pages/MyCoursePage";

const ExamPage = lazy(() => import("./pages/ExamPage"));
const ListTestPage = lazy(() => import("./pages/ListTestPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const CoursePage = lazy(() => import("./pages/CoursePage"));
const CourseDetailPage = lazy(() => import("./pages/CourseDetailPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<ExamPage />} path="/exam/:examId" />
            <Route element={<ExamResult />} path="/exam-result" />
            <Route element={<ExamHistoriesPage />} path="/exam-histories" />
            <Route
              element={<ExamReviewPage />}
              path="/exam-histories/:historyId"
            />
            <Route element={<CoursePlayer />} path="/course-player/:courseId" />
            <Route element={<MyCoursePage />} path="/my-course" />
          </Route>
          <Route element={<HomePage />} path="/" />
          <Route element={<ListTestPage />} path="/list-exam" />
          <Route element={<CoursePage />} path="/course" />
          <Route element={<CourseDetailPage />} path="/course/:courseId" />

          <Route element={<ErrorPage />} path="*" />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
