import CourseCard from "../../components/CourseCard/CourseCard";
import Title from "../../components/Title";
import Header from "../../components/Header";
import SidebarItem from "../../components/SidebarItem/SidebarItem";
import { YEAR_ITEM } from "../../constants/SidebarItem";
import { PaginationNavPresentation } from "../../components/Pagination/Pagination";
import Footer from "../../components/Footer/Footer";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { useEffect } from "react";
import { getAllSubjectsAsync } from "../../services/subjects/subjectSlice";
import { getAllCoursesAsync } from "../../services/courses/courseSlice";

const CoursePage = () => {
  const dispatch = useAppDispatch();
  const { subjects } = useAppSelector((state) => state.subject);
  const { courses } = useAppSelector((state) => state.course);

  useEffect(() => {
    dispatch(getAllSubjectsAsync({ page: 1, limit: 10 }));
    dispatch(getAllCoursesAsync({ page: 1, limit: 10 }));
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="pt-16 dark:bg-dark min-h-screen">
        <Title title="Khóa học online" />
        <div className="md:px-4 lg:px-8 xl:px-16 2xl:px-0">
          <div className="grid grid-cols-12 px-4 gap-6 h-full">
            <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-2 text-center h-fit top-24">
              <div className="flex flex-col">
                <SidebarItem
                  title="Môn học"
                  type="subject"
                  labels={subjects.map((subject) => subject.name)}
                />
              </div>
            </div>
            <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-10 rounded-xl">
              <div className="grid 2xl:grid-cols-1 xl:grid-cols-1 lg:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-y-5">
                {courses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
              <div className="flex my-20 justify-center items-center">
                <PaginationNavPresentation />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CoursePage;
