import { FiMessageCircle } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailCourseAsync } from "../../services/courses/courseSlice";

import { FaVideo } from "react-icons/fa6";
import { FaQuestion, FaArrowLeft } from "react-icons/fa";

import { FaLock, FaLockOpen } from "react-icons/fa";
import Colors from "../../config/colors";

const CoursePlayer = () => {
  const { courseId } = useParams();
  const { courses } = useAppSelector((state) => state.course);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const handleNavigateBack = useCallback(() => {
    window.history.back();
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        if (courseId) {
          await dispatch(getDetailCourseAsync(parseInt(courseId)));
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, dispatch]);

  const course = courses[0]; // Assuming courses is an array with a single course

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="flex items-center p-4">
          <button onClick={handleNavigateBack}>
            <FaArrowLeft color={Colors.primaryColor} size="1.5rem" />
          </button>
          <h1 className="ml-4 text-xl font-medium">
            {course?.name || "Course Title"}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Video Section */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative bg-gray-900 aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/1IHZaElzcpc?si=7ATRtxgmF11XqeFB"
                title="Giới thiệu khóa học"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-medium">Giới thiệu khóa học</h2>
            </div>
          </div>
        </div>

        {/* Course Content Sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium">Nội dung khóa học</h3>
            </div>
            <div className="divide-y">
              {/* Render Module */}
              {course?.module?.map((module) => (
                <div key={module.id} className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{module.name}</h4>
                  </div>

                  {/* Render Lessons for the Module */}
                  {module?.lesson?.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="p-2 rounded-lg flex items-center justify-center border-t"
                    >
                      <FaVideo color={Colors.secondaryLightColor} />
                      <span className="mx-4 flex-1">{lesson.name}</span>
                      {lesson.is_checked ? (
                        <FaLockOpen color={Colors.primaryColor} />
                      ) : (
                        <FaLock color={Colors.primaryColor} />
                      )}
                    </div>
                  ))}

                  {/* Render Questions for the Lesson */}
                  {module?.lesson?.map((lesson) =>
                    lesson?.question?.map((question) => (
                      <div
                        key={question.id}
                        className="p-2 rounded-lg flex items-center border-t ml-0"
                      >
                        <FaQuestion color={Colors.secondaryLightColor} />
                        <span className="mx-4 flex-1">{question.name}</span>
                        {question.is_checked ? (
                          <FaLockOpen color={Colors.primaryColor} />
                        ) : (
                          <FaLock color={Colors.primaryColor} />
                        )}
                      </div>
                    ))
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between">
        <button className="flex items-center text-orange-500">
          <FiMessageCircle className="w-5 h-5 mr-2" />
          Hỏi đáp
        </button>
      </div>
    </div>
  );
};

export default CoursePlayer;
