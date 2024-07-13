import CourseCard from "../components/CourseCard/CourseCard";
import Title from "../components/Title";
import Header from "../components/Header";
import SidebarItem from "../components/SidebarItem/SidebarItem";
import { LIST_TEST_ITEM } from "../constants/SidebarItem";
import { PaginationNavPresentation } from "../components/Pagination/Pagination";

export const CoursePage = () => {
  return (
    <>
      <Header />
      <div className="pt-16 "></div>
      <Title title="Khóa học online" />
      <div className="md:px-4 lg:px-8 xl:px-16 2xl:px-0">
        <div className="grid grid-cols-12 px-4 gap-6">
          <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-2 text-center h-fit top-24">
            <div className="flex flex-col">
              {LIST_TEST_ITEM.map((item) => {
                return (
                  <SidebarItem
                    labels={item.labels}
                    title={item.title}
                    type={item.type}
                    key={item.type}
                  />
                );
              })}
            </div>
          </div>
          <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-10 rounded-xl">
            <div className="grid 2xl:grid-cols-1 xl:grid-cols-1 lg:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-y-5">
              <CourseCard />
              <CourseCard />
            </div>
            <div className="flex my-20 justify-center items-center">
              <PaginationNavPresentation />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
