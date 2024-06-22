import React from "react";
import Colors from "../../config/colors";
import Button from "../Button/Button";
import { GrFormNextLink } from "react-icons/gr";

const CourseCard = () => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="rounded-t-lg"
          src="https://cdn.vietnambiz.vn/2019/10/15/1nvhe7mchqmjbgyvx-uobra-15711056360651103109227.png"
          alt=""
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
        <Button
          content="Read more"
          icon={<GrFormNextLink size="2rem"/>}
          backgroundColor={Colors.primaryColor}
          color="white"
          backgroundHover={Colors.primaryDarkColor}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default CourseCard;
