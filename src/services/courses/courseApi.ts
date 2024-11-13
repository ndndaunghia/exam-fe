import axiosInstance from "../../utils/axiosInstance";
import { DetailCourseResponse, ListCourseResponse } from "./course.type";

export const getAllCourses = async (page: number = 1, limit: number = 10) => {
  const response = await axiosInstance.get<ListCourseResponse>("courses", {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};

export const getDetailCourse = async (id: number) => {
  const response = await axiosInstance.get<DetailCourseResponse>(
    `courses/${id}/detail`
  );
  return response.data;
};
