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
  onClick?: () => void;
  children?: React.ReactNode; // Add children prop
}

const ItemCourse: React.FC<ItemCourseProps> = ({
  icon: Icon,
  iconColor = Colors.primaryColor,
  title,
  lessonCount,
  hasBorderBottom = false,
  borderBottomColor = "#e0e0e0",
  isSubItemCourse = false,
  onClick,
  children, // Add children to props
}) => {
  return (
    <div className="my-1">
      <div
        className={`flex justify-between items-center px-6 py-4 rounded-md cursor-pointer select-none bg-[#f5f5f5] dark:bg-dark-light dark:text-white  ${
          hasBorderBottom ? "border-b" : ""
        }`}
        style={{
          borderBottomColor: hasBorderBottom
            ? borderBottomColor
            : "transparent",
        }}
        onClick={onClick}
      >
        <div className="flex items-center justify-between gap-4">
          <Icon color={iconColor} />
          <Typography
            variant="p"
            responsive
            className={`${
              !isSubItemCourse
                ? "text-black font-bold dark:text-white"
                : "text-gray-600 dark:text-white"
            }`}
          >
            {title}
          </Typography>
        </div>
        <div>
          {!isSubItemCourse && (
            <Typography variant="p" responsive>
              {typeof lessonCount === "number"
                ? lessonCount + " bài học"
                : lessonCount}
            </Typography>
          )}
        </div>
      </div>
      {children && <div className="pl-8">{children}</div>}{" "}
      {/* Render children if present */}
    </div>
  );
};

export default ItemCourse;
