import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SidebarItemType from "./SidebarItem.type";

const SidebarItem = (props: SidebarItemType) => {
  const [isOpenTab, setIsOpenTab] = React.useState(true);
  const [checkedItems, setCheckedItems] = React.useState<{
    [key: string]: boolean;
  }>({});

  const handleOpenTab = () => {
    setIsOpenTab((prev: boolean) => !prev);
  };

  const handleChange = (
    label: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked;
    setCheckedItems((prev) => ({
      ...prev,
      [label]: checked,
    }));
    props.onSelect?.(label, checked);
  };

  return (
    <div className="cursor-pointer p-4 border-t-gray-400 border-white border-2 transition ease-in-out delay-1500 dark:text-white dark:border-dark dark:border-t-dark-light">
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
        {props?.labels?.map((label) => {
          return (
            <label htmlFor={label} className="my-2 cursor-pointer" key={label}>
              <input
                type="checkbox"
                name={props.type}
                id={label}
                checked={checkedItems[label] || false}
                onChange={(e) => handleChange(label, e)}
              />
              <span className="mx-4">{label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarItem;
