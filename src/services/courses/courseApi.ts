import axiosInstance from "../../utils/axiosInstance";
import { DetailCourseResponse, ListCourseResponse } from "./course.type";

export const getAllCourses = async (params: {
  page: number;
  limit: number;
  subject_id?: string; // string của các ID được join bằng dấu phẩy
  name?: string;
}) => {
  const response = await axiosInstance.get<ListCourseResponse>("courses", {
    params,
  });
  return response.data;
};

export const getDetailCourse = async (id: number) => {
  const response = await axiosInstance.get<DetailCourseResponse>(
    `courses/${id}/detail`
  );
  return response.data;
};
