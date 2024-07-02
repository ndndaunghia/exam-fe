import { useState } from "react";
import TestItem from "../TestItem";
import Title from "../Title";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";


const ListTest = () => {
  const [isOpenTab, setIsOpenTab] = useState(true);

  const handleOpenTab = () => {
    setIsOpenTab((prev: boolean) => !prev);
  };

  return (
    <>
      <div className="pt-16 "></div>
      <Title title="Đề thi online" />
      <div className=" ">
        <div className="grid grid-cols-1 sm:grid-cols-12 md:grid-cols-12 p-4 gap-6">
          <div className="col-span-1 sm:col-span-2 md:col-span-2 text-center h-fit  top-24">
            <div className="flex flex-col">
              <div className="cursor-pointer p-4 border-y-gray-400 border-white border-2 transition ease-in-out delay-1500">
                <div
                  className="flex justify-between items-center select-none"
                  onClick={handleOpenTab}
                >
                  <h3>Năm học</h3>
                  <span className="transition-all duration-3000 ease-in-out">
                    {isOpenTab ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </span>
                </div>

                <div
                  className={`flex flex-col items-start transition ease-in-out delay-1500 ${
                    isOpenTab ? "block" : "hidden"}`}
                >
                  <label htmlFor="2021" className="my-2 cursor-pointer">
                    <input type="radio" name="year" id="2021" />
                    <span className="mx-4">2021</span>
                  </label>
                  <label htmlFor="2022" className="my-2 cursor-pointer">
                    <input type="radio" name="year" id="2022" />
                    <span className="mx-4">2022</span>
                  </label>
                  <label htmlFor="2023" className="my-2 cursor-pointer">
                    <input type="radio" name="year" id="2023" />
                    <span className="mx-4">2023</span>
                  </label>
                  <label htmlFor="2024" className="my-2 cursor-pointer">
                    <input type="radio" name="year" id="2024" />
                    <span className="mx-4">2024</span>
                  </label>
                </div>
              </div>
              
            </div>
          </div>
          <div className="col-span-1 sm:col-span-10 md:col-span-10 rounded-xl">
            <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-y-10 place-items-center">
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