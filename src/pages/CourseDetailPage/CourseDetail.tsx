import React, { useState, useEffect } from "react";
import ItemCourse from "../../components/ItemCourse";
import Typography from "../../components/Typography/Typography";
import { FiPlus, FiMinus, FiVideo } from "react-icons/fi";
import { BsClock } from "react-icons/bs";
import { IoMdPlayCircle } from "react-icons/io";
import { BsPersonVideo3 } from "react-icons/bs";
import Button from "../../components/Button/Button";
import Colors from "../../config/colors";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { getDetailCourseAsync } from "../../services/courses/courseSlice";
import Loading from "../../components/Loading";

const CourseDetail: React.FC = () => {
  const { courseId } = useParams();
  const { courses } = useAppSelector((state) => state.course);
  const dispatch = useAppDispatch();
  const [expandedChapters, setExpandedChapters] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const toggleChapter = (chapterId: number) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  if (isLoading) return <Loading />;
  if (!courses || !courses[0]) return <div>No course found</div>;

  const course = courses[0]; // For better readability

  console.log(course);

  return (
    <div className="md:px-4 lg:px-8 xl:px-14 2xl:px-22 mt-12 min-h-screen dark:bg-dark">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 px-2">
          <Typography
            variant="h3"
            responsive
            className="text-black dark:text-white"
          >
            {course.name}
          </Typography>
          <Typography
            variant="p"
            responsive
            className="text-gray-600 my-4 dark:text-white"
          >
            {course.description}
          </Typography>
          <div className="mt-10">
            <div>
              <Typography variant="h4" responsive className="dark:text-white">
                Nội dung khóa học
              </Typography>
            </div>
            <div className="flex justify-between my-2 dark:text-white">
              <ul className="flex gap-2">
                <li className="hidden lg:block">
                  <strong>{course.module?.length || 0}</strong> chương
                </li>
                <li className="hidden lg:block">|</li>
                <li>
                  <strong>{course.duration}</strong> bài học
                </li>
                <li className="hidden md:block">|</li>
                <li className="hidden md:block">
                  Thời lượng
                  <strong> {course.duration}</strong>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-4">
            {course.module?.map((module) => (
              <div key={module.id}>
                <ItemCourse
                  icon={expandedChapters.includes(module.id) ? FiMinus : FiPlus}
                  title={`${module.id}. ${module.name}`}
                  lessonCount={course.module?.length || 0}
                  backgroundColor="#f5f5f5"
                  onClick={() => toggleChapter(module.id)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-1 px-2 flex justify-center dark:text-white">
          <div className="">
            <div className="rounded-xl">
              <img
                src={course.thumbnail_url || ""}
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
                  {course.module?.length || 0} bài học
                </li>
                <li className="flex justify-center items-center gap-2 my-2">
                  <BsClock />
                  Thời lượng
                  {` ${course.duration}`}
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
