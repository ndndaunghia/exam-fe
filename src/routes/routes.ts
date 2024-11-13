import { lazy } from "react";

const ExamPage = lazy(() => import("../pages/ExamPage"));
const ListTestPage = lazy(() => import("../pages/ListTestPage/ListTestPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const CoursePage = lazy(() => import("../pages/CoursePage/CoursePage"));
const CourseDetailPage = lazy(() => import("../pages/CourseDetailPage/CourseDetailPage"));
const ErrorPage = lazy(() => import("../pages/ErrorPage/ErrorPage"));

export const routes = [
  {
    path: "/",
    element: HomePage,
    isPrivate: false,
  },
  {
    path: "/exam",
    element: ExamPage,
    isPrivate: true,
  },
  {
    path: "/list-test",
    element: ListTestPage,
    isPrivate: false,
  },
  {
    path: "/course",
    element: CoursePage,
    isPrivate: false,
  },
  {
    path: "/course-detail",
    element: CourseDetailPage,
    isPrivate: false,
  },
  {
    path: "*",
    element: ErrorPage,
    isPrivate: false,
  },
]