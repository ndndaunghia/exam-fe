import TestItem from "../TestItem";
import Title from "../Title";
import SidebarItem from "../SidebarItem/SidebarItem";
import { LIST_TEST_ITEM } from "../../constants/SidebarItem";
import { PaginationNavPresentation } from "../Pagination/Pagination";

const ListTest = () => {
  return (
    <>
      <div className="pt-16 "></div>
      <Title title="Đề thi online" />
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
            <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-y-10 place-items-center">
              {Array.from({ length: 10 }).map((_, index) => (
                <TestItem key={index} />
              ))}
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

export default ListTest;
