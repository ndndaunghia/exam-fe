import { FiMessageCircle } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailCourseAsync } from "../../services/courses/courseSlice";

import { FaVideo, FaQuestion, FaArrowLeft } from "react-icons/fa";
import { FaLock, FaLockOpen } from "react-icons/fa";
import Colors from "../../config/colors";
import {
  answeredQuestionAsync,
  checkLessonAsync,
} from "../../services/learn_course/learnCourseSlice";

interface QuestionOption {
  id: number;
  content: string;
  is_correct_string: string | null;
}

const CoursePlayer = () => {
  const { courseId } = useParams();
  const { courses } = useAppSelector((state) => state.course);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContent, setSelectedContent] = useState<{
    type: "lesson" | "question" | null;
    data: any;
  }>({ type: null, data: null });
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

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

  const course = courses[0];
  const handleContentSelect = (type: "lesson" | "question", data: any) => {
    // Chỉ cho phép chọn nếu lesson/question đã mở khóa
    if (!data.is_unlocked) return;

    setSelectedContent({ type, data });

    if (type === "lesson") {
      // Chỉ gọi checkLessonAsync khi lesson chưa được check
      if (!data.is_checked && courseId) {
        dispatch(checkLessonAsync(data.id.toString()));
        dispatch(getDetailCourseAsync(parseInt(courseId)));
      }
    }
  };

  const renderContent = () => {
    if (!selectedContent.type) {
      return (
        <div className="p-4">
          <h2 className="text-xl font-medium">Chọn bài học để bắt đầu</h2>
        </div>
      );
    }

    if (selectedContent.type === "lesson") {
      return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="relative bg-gray-900 aspect-video">
            <iframe
              width="100%"
              height="100%"
              // src={selectedContent.data.video_url}
              src="https://www.youtube.com/embed/ht6yPQd8Al4?si=N66BfKMIdfaxSBV4"
              title={selectedContent.data.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0"
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-medium">{selectedContent.data.name}</h2>
            <p>{selectedContent.data.description}</p>
          </div>
        </div>
      );
    }

    if (selectedContent.type === "question") {
      const correctOptionsCount = selectedContent.data.count_correct_option;

      const inputType = correctOptionsCount > 1 ? "checkbox" : "radio";

      const handleOptionChange = (optionId: number) => {
        if (inputType === "checkbox") {
          setSelectedOptions((prev) =>
            prev.includes(optionId)
              ? prev.filter((id) => id !== optionId)
              : [...prev, optionId]
          );
        } else {
          setSelectedOptions([optionId]);
        }
      };

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedOptions.length === 0) {
          alert("Vui lòng chọn ít nhất một câu trả lời");
          return;
        }

        const optionsString = selectedOptions.join(","); // "49" nếu chỉ có một lựa chọn, hoặc "49,50" nếu có nhiều lựa chọn

        console.log("Submitting answer...", optionsString);

        try {
          const result = await dispatch(
            answeredQuestionAsync({
              questionId: selectedContent.data.id.toString(),
              options: optionsString, // Truyền đúng format
            })
          ).unwrap();

          if (result.code === 200) {
            alert("Chúc mừng! Bạn đã trả lời đúng");
            if (courseId) {
              await dispatch(getDetailCourseAsync(parseInt(courseId)));
            }
          } else {
            alert("Rất tiếc, câu trả lời chưa chính xác");
          }
        } catch (error) {
          alert(error instanceof Error ? error.message : "Có lỗi xảy ra");
        }
      };

      return (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-medium mb-4">
            {selectedContent.data.name}
          </h2>
          <p className="mb-4">{selectedContent.data.description}</p>

          <form onSubmit={handleSubmit}>
            {selectedContent.data.options.map((option: QuestionOption) => (
              <div key={option.id} className="mb-2">
                <label className="flex items-center">
                  <input
                    type={inputType}
                    name="question-options"
                    checked={selectedOptions.includes(option.id)}
                    onChange={() => handleOptionChange(option.id)}
                    className="mr-2"
                  />
                  {option.content}
                </label>
              </div>
            ))}
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Nộp bài
            </button>
          </form>
        </div>
      );
    }
  };

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
        {/* Video/Question Section */}
        <div className="lg:w-2/3">{renderContent()}</div>

        {/* Course Content Sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium">Nội dung khóa học</h3>
            </div>
            <div className="divide-y">
              {course?.module?.map((module) => (
                <div key={module.id} className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{module.name}</h4>
                  </div>

                  {module?.lesson?.map((lesson) => (
                    <div key={lesson.id}>
                      <div
                        className={`p-2 rounded-lg flex items-center justify-center border-t cursor-pointer 
                          ${
                            lesson.is_unlocked
                              ? "hover:bg-gray-100"
                              : "opacity-50 cursor-not-allowed"
                          }
                        `}
                        onClick={() => handleContentSelect("lesson", lesson)}
                      >
                        <FaVideo color={Colors.secondaryLightColor} />
                        <span className="mx-4 flex-1">{lesson.name}</span>
                        {lesson.is_checked ? (
                          <FaLockOpen color={Colors.primaryColor} />
                        ) : (
                          <FaLock color={Colors.primaryColor} />
                        )}
                      </div>

                      {lesson?.question?.map((question) => (
                        <div
                          key={question.id}
                          className={`p-2 rounded-lg flex items-center border-t ml-4 
                            ${
                              question.is_unlocked
                                ? "hover:bg-gray-100 cursor-pointer"
                                : "opacity-50 cursor-not-allowed"
                            }
                          `}
                          onClick={() =>
                            handleContentSelect("question", question)
                          }
                        >
                          <FaQuestion color={Colors.secondaryLightColor} />
                          <span className="mx-4 flex-1">{question.name}</span>
                          {question.is_checked ? (
                            <FaLockOpen color={Colors.primaryColor} />
                          ) : (
                            <FaLock color={Colors.primaryColor} />
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
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
