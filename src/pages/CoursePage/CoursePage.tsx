import CourseCard from "../../components/CourseCard/CourseCard";
import Title from "../../components/Title";
import Header from "../../components/Header";
import SidebarItem from "../../components/SidebarItem/SidebarItem";
import Footer from "../../components/Footer/Footer";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { useCallback, useEffect, useState } from "react";
import { getAllSubjectsAsync } from "../../services/subjects/subjectSlice";
import { getAllCoursesAsync } from "../../services/courses/courseSlice";
import Pagination from "../../components/Pagination/Pagination";
import Loading from "../../components/Loading";

const CoursePage = () => {
  const dispatch = useAppDispatch();
  const { subjects } = useAppSelector((state) => state.subject);
  const {
    courses,
    total,
    currentPage,
    lastPage, // Số trang cuối cùng
    loading,
  } = useAppSelector((state) => state.course);

  const [searchParams, setSearchParams] = useState({
    page: 1,
    limit: 10,
    subject_id: new Set<string>(),
    name: "",
  });

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleSearch = (keyword: string) => {
    setSearchParams((prev) => ({
      ...prev,
      name: keyword,
      page: 1,
    }));
  };

  const handleSubjectSelect = (label: string, checked: boolean) => {
    const selectedSubject = subjects.find((s) => s.name === label);
    if (selectedSubject) {
      setSearchParams((prev) => {
        const newSubjectIds = new Set(prev.subject_id);
        if (checked) {
          newSubjectIds.add(selectedSubject.id);
        } else {
          newSubjectIds.delete(selectedSubject.id);
        }

        return {
          ...prev,
          subject_id: newSubjectIds,
          page: 1,
        };
      });
    }
  };

  const getApiParams = useCallback(() => {
    return {
      page: searchParams.page,
      limit: searchParams.limit,
      name: searchParams.name,
      subject_id: Array.from(searchParams.subject_id).join(","), // Chuyển Set thành string
    };
  }, [searchParams]);

  useEffect(() => {
    dispatch(getAllCoursesAsync(getApiParams()));
  }, [dispatch, getApiParams, searchParams]);

  useEffect(() => {
    dispatch(getAllSubjectsAsync({ page: 1, limit: 10 }));
  }, [dispatch]);

  console.log("courses", courses);

  return (
    <>
      <Header />
      <div className="pt-16 dark:bg-dark min-h-screen">
        <Title
          title="Khóa học online"
          onSearch={(keyword) =>
            setSearchParams((prev) => ({
              ...prev,
              name: keyword,
              page: 1, // Reset về trang 1 khi tìm kiếm
            }))
          }
        />
        <div className="md:px-4 lg:px-8 xl:px-16 2xl:px-0">
          <div className="grid grid-cols-12 px-4 gap-6 h-full">
            <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-2 text-center h-fit top-24">
              <div className="flex flex-col">
                <SidebarItem
                  title="Môn học"
                  type="subject"
                  labels={subjects.map((subject) => subject.name)}
                  onSelect={handleSubjectSelect}
                />
              </div>
            </div>
            <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-10 rounded-xl">
              <div className="grid 2xl:grid-cols-1 xl:grid-cols-1 lg:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-y-5">
                {loading ? (
                  <Loading />
                ) : courses.length > 0 ? (
                  courses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                  ))
                ) : (
                  <div>Không tìm thấy khóa học nào</div>
                )}
              </div>
              <div className="flex my-20 justify-center items-center">
                {total > 0 && (
                  <div className="mt-8 mb-16">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={lastPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
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
