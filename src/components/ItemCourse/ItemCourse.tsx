import React from "react";
import Typography from "../Typography/Typography";
import Colors from "../../config/colors";
import { IconType } from "react-icons";

interface ItemCourseProps {
  icon: IconType;
  iconColor?: string;
  title: string;
  lessonCount: number | string;
  isSubItemCourse?: boolean;
  backgroundColor?: string;
  hasBorderBottom?: boolean;
  borderBottomColor?: string;
  onClick?: () => void;  // Thêm prop onClick
}

const ItemCourse: React.FC<ItemCourseProps> = ({
  icon: Icon,
  iconColor = Colors.primaryColor,
  title,
  lessonCount,
  // backgroundColor = "#f5f5f5",
  hasBorderBottom = false,
  borderBottomColor = "#e0e0e0",
  isSubItemCourse = false,
  onClick,  // Thêm onClick vào danh sách props
}) => {
  return (
    <div
      className={`flex justify-between items-center px-6 py-4 rounded-md cursor-pointer select-none bg-[#f5f5f5] dark:bg-dark-light dark:text-white  ${
        hasBorderBottom ? "border-b" : ""
      }`}
      style={{
        // backgroundColor,
        borderBottomColor: hasBorderBottom ? borderBottomColor : "transparent",
      }}
      onClick={onClick}  // Thêm sự kiện onClick
    >
      <div className="flex items-center justify-between gap-4">
        <Icon color={iconColor} />
        <Typography variant="p" responsive className={`${!isSubItemCourse ? "text-black font-bold dark:text-white" : "text-gray-600 dark:text-white"}`}>
          {title}
        </Typography>
      </div>
      <div>
        <Typography variant="p" responsive>
          {typeof lessonCount === "number"
            ? lessonCount + " bài học"
            : lessonCount}
        </Typography>
      </div>
    </div>
  );
};

export default ItemCourse;