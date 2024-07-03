import SidebarItemType  from "../components/SidebarItem/SidebarItem.type";

export const YEAR_ITEM: SidebarItemType = {
  type: "year",
  title: "Năm",
  labels: ["2021", "2022", "2023", "2024"],
};

export const SUBJECT_ITEM: SidebarItemType = {
  type: "subject",
  title: "Môn học",
  labels: ["Toán", "Lý", "Anh", "Tin học"],
};

export const LIST_TEST_ITEM = [YEAR_ITEM, SUBJECT_ITEM];