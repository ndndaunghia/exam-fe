import TestItem from "../TestItem";
import Title from "../Title";
import SidebarItem from "../SidebarItem/SidebarItem";
import { YEAR_ITEM } from "../../constants/SidebarItem";
import { PaginationNavPresentation } from "../Pagination/Pagination";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { useEffect } from "react";
import { getAllSubjectsAsync } from "../../services/subjects/subjectSlice";
import { getAllExamsAsync } from "../../services/exam/examSlice";
import { Exam } from "../../services/exam/exam.type";

const ListTest = () => {
  const { subjects } = useAppSelector((state) => state.subject);
  const { exams } = useAppSelector((state) => state.exam);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getAllSubjectsAsync({
        page: 1,
        limit: 10,
      })
    );
    dispatch(
      getAllExamsAsync({
        page: 1,
        limit: 10,
      })
    );
  }, [dispatch]);

  return (
    <>
      <div className="pt-16 "></div>
      <Title title="Đề thi online" />
      <div className="md:px-4 lg:px-8 xl:px-16 2xl:px-0">
        <div className="grid grid-cols-12 px-4 gap-6">
          <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-2 text-center h-fit top-24">
            <div className="flex flex-col">
              <SidebarItem
                title={YEAR_ITEM.title}
                type={YEAR_ITEM.type}
                labels={YEAR_ITEM.labels}
              />
              <SidebarItem
                title="Môn học"
                type="subject"
                labels={subjects.map((subject) => subject.name)}
              />
            </div>
          </div>
          <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-10 rounded-xl">
            <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-y-10 place-items-center">
              {exams.map((exam: Exam) => {
                return <TestItem key={exam.id} exam={exam} />;
              })}
            </div>
            <div className="flex my-20 justify-center items-center">
              <PaginationNavPresentation />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListTest;
