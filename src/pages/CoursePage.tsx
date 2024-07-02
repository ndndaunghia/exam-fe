import CourseCard from "../components/Course/CourseCard";
import Title from "../components/Title";
import Header from "../components/Header";

export const CoursePage = () => {
  return (
    <>
      <Header />
      <div className="pt-16"></div>
      <Title title="Danh sách khóa học" />

      <h2>Danh sách khóa học</h2>
      <div className="gap-10 place-items-center grid px-8 lg:grid-cols-4 lg:gap-0 md:grid-cols-2 sm:grid-cols-1 sm:gap-6">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </>
  );
};
