import axiosInstance from "../../utils/axiosInstance";
import { DetailAuthorResponse, ListAuthorResponse } from "./author.type";

export const getAllAuthors = async (page: number = 1, limit: number = 10) => {
  const response = await axiosInstance.get<ListAuthorResponse>("authors", {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};

export const getDetailAuthor = async (id: number) => {
  const response = await axiosInstance.get<DetailAuthorResponse>(
    `authors/${id}/detail`
  );
  return response.data;
};
