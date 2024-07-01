import React from "react";
import CourseCard from "../components/Course/CourseCard";
import Title from "../components/Title";
import Header from "../components/Header";
import { MdOutlineNavigateNext } from "react-icons/md";
import Colors from "../config/colors";
import { CiFilter } from "react-icons/ci";

export const CoursePage = () => {
  return (
    <>
      <Header />
      <div className="pt-16"></div>
      {/* <Title /> */}
      <div className="my-6 px-16 py-4 flex items-center border">
        <a href="" className="text-lg italic">
          Trang chủ
        </a>
        <span>
          <MdOutlineNavigateNext size="18" />
        </span>
        <a href="" className={`text-lg italic text-[${Colors.primaryColor}]`}>
          Khóa học
        </a>
      </div>
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
