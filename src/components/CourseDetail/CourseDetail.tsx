import React, { useState, useEffect } from "react";
import ItemCourse from "../ItemCourse";
import Typography from "../Typography/Typography";
import { FiPlus, FiMinus, FiVideo } from "react-icons/fi";
import { BsClock } from "react-icons/bs";
import { IoMdPlayCircle } from "react-icons/io";
import { BsPersonVideo3 } from "react-icons/bs";
import Button from "../Button/Button";
import Colors from "../../config/colors";

interface Lesson {
  id: number;
  title: string;
  duration: string;
}

interface Chapter {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface CourseData {
  title: string;
  description: string;
  chapterCount: number;
  lessonCount: number;
  totalDuration: string;
  chapters: Chapter[];
}

const CourseDetail: React.FC = () => {
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [expandedChapters, setExpandedChapters] = useState<number[]>([]);

  useEffect(() => {
    // Giả lập việc lấy dữ liệu từ API hoặc cơ sở dữ liệu
    const fetchCourseData = async () => {
      // Thay thế bằng cuộc gọi API thực tế
      const data: CourseData = {
        title: "Lập trình C++ cơ bản, nâng cao",
        description:
          "Khóa học lập trình C++ từ cơ bản tới nâng cao dành cho người mới bắt đầu...",
        chapterCount: 11,
        lessonCount: 138,
        totalDuration: "10 giờ 29 phút",
        chapters: [
          {
            id: 1,
            title: "Giới thiệu",
            lessons: [
              { id: 1, title: "Giới thiệu khóa học", duration: "01:03" },
              { id: 2, title: "Cài đặt Dev - C++", duration: "01:03" },
              {
                id: 3,
                title: "Hướng dẫn sử dụng Dev - C++",
                duration: "01:03",
              },
            ],
          },
          {
            id: 2,
            title: "Biến và kiểu dữ liệu",
            lessons: [
              {
                id: 1,
                title: "Biến và nhập xuất kiểu dữ liệu",
                duration: "01:03",
              },
              { id: 2, title: "Biến là gì?", duration: "01:03" },
              { id: 3, title: "Kiểu dữ liệu thường gặp", duration: "01:03" },
              { id: 4, title: "Kiểu dữ liệu thường gặp", duration: "01:03" },
            ],
          },
          {
            id: 3,
            title: "Biến và kiểu dữ liệu",
            lessons: [
              {
                id: 1,
                title: "Biến và nhập xuất kiểu dữ liệu",
                duration: "01:03",
              },
              { id: 2, title: "Biến là gì?", duration: "01:03" },
              { id: 3, title: "Kiểu dữ liệu thường gặp", duration: "01:03" },
              { id: 4, title: "Kiểu dữ liệu thường gặp", duration: "01:03" },
            ],
          },
          // Thêm các chương khác ở đây
        ],
      };
      setCourseData(data);
    };

    fetchCourseData();
  }, []);

  const toggleChapter = (chapterId: number) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const toggleAllChapters = () => {
    if (courseData) {
      if (expandedChapters.length === courseData.chapters.length) {
        setExpandedChapters([]);
      } else {
        setExpandedChapters(courseData.chapters.map((chapter) => chapter.id));
      }
    }
  };

  if (!courseData) return <div>Loading...</div>;

  return (
    <div className="md:px-4 lg:px-8 xl:px-14 2xl:px-22 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 px-2">
          <Typography variant="h3" responsive className="text-black">
            {courseData.title}
          </Typography>
          <Typography variant="p" responsive className="text-gray-600 my-4">
            {courseData.description}
          </Typography>
          <div className="mt-10">
            <div>
              <Typography variant="h4" responsive>
                Nội dung khóa học
              </Typography>
            </div>
            <div className="flex justify-between my-2">
              <ul className="flex gap-2">
                <li className="hidden lg:block">
                  <strong>{courseData.chapterCount}</strong> chương
                </li>
                <li className="hidden lg:block">|</li>
                <li>
                  <strong>{courseData.lessonCount}</strong> bài học
                </li>
                <li className="hidden md:block">|</li>
                <li className="hidden md:block">
                  Thời lượng
                  <strong> {courseData.totalDuration}</strong>
                </li>
              </ul>
              <div>
                <span
                  className="text-primary font-bold cursor-pointer"
                  onClick={toggleAllChapters}
                >
                  {expandedChapters.length === courseData.chapters.length
                    ? "Thu gọn tất cả"
                    : "Mở rộng tất cả"}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-4">
            {courseData.chapters.map((chapter) => (
              <div key={chapter.id}>
                <ItemCourse
                  icon={
                    expandedChapters.includes(chapter.id) ? FiMinus : FiPlus
                  }
                  title={`${chapter.id}. ${chapter.title}`}
                  lessonCount={chapter.lessons.length}
                  backgroundColor="#f5f5f5"
                  onClick={() => toggleChapter(chapter.id)}
                />
                {expandedChapters.includes(chapter.id) &&
                  chapter.lessons.map((lesson) => (
                    <ItemCourse
                      key={lesson.id}
                      icon={IoMdPlayCircle}
                      title={`${lesson.id}. ${lesson.title}`}
                      lessonCount={lesson.duration}
                      backgroundColor="#ffffff"
                      hasBorderBottom
                      borderBottomColor="#f5f5f5"
                      isSubItemCourse
                    />
                  ))}
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-1 px-2 flex justify-center">
          <div className="">
            <div className="rounded-xl">
              <img
                src="https://files.fullstack.edu.vn/f8-prod/courses/7.png"
                alt=""
                className="w-full h-full object-cover hover:opacity-80 rounded-xl"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <Typography
                variant="h4"
                responsive
                className="text-primary-light my-4"
              >
                299.000đ
              </Typography>
              <Button
                backgroundColor={Colors.secondaryLightColor}
                backgroundHover={Colors.secondaryColor}
                color="#ffffff"
                content="MUA NGAY"
                onClick={() => {}}
              />
              <ul className="my-10 hidden md:flex md:flex-col md:justify-start md:items-start">
                <li className="flex justify-center items-center gap-2 my-2">
                  <FiVideo />
                  {courseData.lessonCount} bài học
                </li>
                <li className="flex justify-center items-center gap-2 my-2">
                  <BsClock />
                  Thời lượng
                  {` ${courseData.totalDuration}`}
                </li>
                <li className="flex justify-center items-center gap-2 my-2">
                  <BsPersonVideo3 />
                  Học mọi lúc mọi nơi
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
