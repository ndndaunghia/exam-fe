import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Title from "../../components/Title";
import CourseCard from "../../components/CourseCard";
import Footer from "../../components/Footer/Footer";
import { Subject } from "../../services/subjects/subject.type";
import { Module } from "../../services/modules/module.type";

interface PurchasedCourse {
  id: number;
  user_id: number;
  course_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  courses: {
    id: number;
    subject_id: number;
    name: string;
    thumbnail_url: string;
    author_id: string;
    total_purchases: number;
    description: string | null;
    price: string;
    duration: number;
    status: number;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
    status_string: string;
  };
}

interface PaginationInfo {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  has_more_pages: boolean;
}

const MyCoursePage = () => {
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const userId = localStorage.getItem("userId");

        if (!userId) {
          throw new Error("User ID not found");
        }

        const response = await axios.get<{
          msg: string;
          code: number;
          data: {
            courses: PurchasedCourse[];
            pagination: PaginationInfo;
          };
        }>(
          `http://127.0.0.1:8000/api/v1.0/my-courses/${userId}?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.code === 200) {
          // Transform the API response to match the Course interface
          const transformedCourses: Course[] = response.data.data.courses.map(
            (purchasedCourse) => ({
              id: purchasedCourse.courses.id,
              subject_id: purchasedCourse.courses.subject_id,
              name: purchasedCourse.courses.name,
              thumbnail_url: purchasedCourse.courses.thumbnail_url,
              author_id: purchasedCourse.courses.author_id,
              total_purchases: purchasedCourse.courses.total_purchases,
              description: purchasedCourse.courses.description,
              price: purchasedCourse.courses.price,
              duration: purchasedCourse.courses.duration,
              status: purchasedCourse.courses.status,
              created_at: purchasedCourse.courses.created_at,
              updated_at: purchasedCourse.courses.updated_at,
              deleted_at: purchasedCourse.courses.deleted_at,
              status_string: purchasedCourse.courses.status_string,
              subject: {} as Subject, // You might want to fetch this separately if needed
              module: [] as Module[], // You might want to fetch this separately if needed
            })
          );

          setMyCourses(transformedCourses);
          setPagination(response.data.data.pagination);
        } else {
          throw new Error("Failed to fetch courses");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Có lỗi xảy ra khi tải khóa học"
        );
        console.error("Error fetching courses:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyCourses();
  }, [currentPage]);

  const handleSearch = (keyword: string) => {
    // Implement search functionality if needed
    console.log("Searching for:", keyword);
  };

  return (
    <>
      <Header />
      <div className="pt-16 dark:bg-dark min-h-screen">
        <Title title="Khóa học của tôi" onSearch={handleSearch} />
        <div className="md:px-4 lg:px-8 xl:px-16 2xl:px-0">
          <div className="grid grid-cols-12 px-4 gap-6 h-full items-center justify-center">
            <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-10 rounded-xl">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
              ) : error ? (
                <div className="text-center text-red-500 py-8">{error}</div>
              ) : myCourses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Bạn chưa có khóa học nào</p>
                </div>
              ) : (
                <div className="grid 2xl:grid-cols-1 xl:grid-cols-1 lg:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-y-5">
                  {myCourses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyCoursePage;
