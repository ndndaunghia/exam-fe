import Tab from "../Tab";
import TestItem from "../TestItem";
import Title from "../Title";

const ListTest = () => {
  return (
    <>
      <div className="pt-16 "></div>
      <Title title="Đề thi online" />
      <div className=" ">
        <div className="grid grid-cols-1 sm:grid-cols-12 md:grid-cols-12 p-4 gap-6">
          <div className="col-span-1 sm:col-span-2 md:col-span-2 border-r-gray-400 border-white border-2 text-center h-fit  top-24">
            <div className="flex flex-col">
              <Tab />
              <Tab />
              <Tab />
              <Tab />
              <Tab />
            </div>
          </div>
          <div className="col-span-1 sm:col-span-10 md:col-span-10 rounded-xl">
            <div className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-4 place-items-center">
              {Array.from({ length: 10 }).map((_, index) => (
                <TestItem key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListTest;
