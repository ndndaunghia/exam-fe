import axiosInstance from "../../utils/axiosInstance";
import { DetailSubjectResponse, ListSubjectResponse } from "./subject.type";

export const getAllSubjects = async (page: number = 1, limit: number = 10) => {
  const response = await axiosInstance.get<ListSubjectResponse>("subjects", {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};

export const getDetailSubject = async (id: number) => {
  const response = await axiosInstance.get<DetailSubjectResponse>(
    `subjects/${id}/detail`
  );
  return response.data;
};
