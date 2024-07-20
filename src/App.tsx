import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./hooks/useAuth";
import PrivateRoutes from "./utils/PrivateRoutes";
import Loading from "./components/Loading";

const ExamPage = lazy(() => import("./pages/ExamPage"));
const ListTestPage = lazy(() => import("./pages/ListTestPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const CoursePage = lazy(() => import("./pages/CoursePage"));
const CourseDetailPage = lazy(() => import("./pages/CourseDetailPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route element={<ExamPage />} path="/exam" />
            </Route>
            <Route element={<HomePage />} path="/"/>
            <Route element={<ListTestPage />} path="/list-test" />
            <Route element={<CoursePage />} path="/course" />
            <Route element={<CourseDetailPage />} path="/course-detail" />
            <Route element={<ErrorPage />} path="*" />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;