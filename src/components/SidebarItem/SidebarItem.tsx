import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SidebarItemType from "./SidebarItem.type";

const SidebarItem = (props: SidebarItemType) => {
  const [isOpenTab, setIsOpenTab] = React.useState(true);

  const handleOpenTab = () => {
    setIsOpenTab((prev: boolean) => !prev);
  };

  return (
    <div className="cursor-pointer p-4 border-t-gray-400 border-white border-2 transition ease-in-out delay-1500">
      <div
        className="flex justify-between items-center select-none"
        onClick={handleOpenTab}
      >
        <h3 className="text-xl font-semibold">{props.title}</h3>
        <span className="transition duration-3000 ease-in">
          {isOpenTab ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
      </div>

      <div
        className={`flex flex-col items-start transition ease-in-out delay-1500 ${
          isOpenTab ? "block" : "hidden"
        }`}
      >
        {props.labels.map((label) => {
          return (
            <label htmlFor={label} className="my-2 cursor-pointer" key={label}>
              <input type="radio" name={props.type} id={label} />
              <span className="mx-4">{label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarItem;
