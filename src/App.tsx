import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExamPage from "./pages/ExamPage";
import ListTestPage from "./pages/ListTestPage";
import { HomePage } from "./pages/HomePage";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./hooks/useAuth";
import { CoursePage } from "./pages/CoursePage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<ExamPage />} path="/exam" />
          </Route>
          <Route element={<HomePage />} path="/" />
          <Route element={<ListTestPage />} path="list-test" />
          <Route element={<CoursePage />} path="course" />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
