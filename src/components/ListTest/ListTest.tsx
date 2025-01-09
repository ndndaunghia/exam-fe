import TestItem from "../TestItem";
import Title from "../Title";
import SidebarItem from "../SidebarItem/SidebarItem";
import { YEAR_ITEM } from "../../constants/SidebarItem";
import Pagination, {
  PaginationNavPresentation,
} from "../Pagination/Pagination";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { useCallback, useEffect, useState } from "react";
import { getAllSubjectsAsync } from "../../services/subjects/subjectSlice";
import { getAllExamsAsync } from "../../services/exam/examSlice";
import { Exam } from "../../services/exam/exam.type";
import Loading from "../Loading";

const ListTest = () => {
  const { subjects } = useAppSelector((state) => state.subject);
  const { exams, total, currentPage, lastPage, loading } = useAppSelector(
    (state) => state.exam
  );
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useState({
    page: 1,
    limit: 10,
    subject_id: new Set<string>(),
    year: new Set<string>(),
    name: "",
  });

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleYearSelect = (label: string, checked: boolean) => {
    const selectedYear = subjects.find((s) => s.name === label);
    if (selectedYear) {
      setSearchParams((prev) => {
        const newYearIds = new Set(prev.subject_id);
        if (checked) {
          newYearIds.add(selectedYear.id);
        } else {
          newYearIds.delete(selectedYear.id);
        }

        return {
          ...prev,
          year: newYearIds,
          page: 1,
        };
      });
    }
  };

  const handleSubjectSelect = (label: string, checked: boolean) => {
    const selectedSubject = subjects.find((s) => s.name === label);
    if (selectedSubject) {
      setSearchParams((prev) => {
        const newSubjectIds = new Set(prev.subject_id);
        if (checked) {
          newSubjectIds.add(selectedSubject.id);
        } else {
          newSubjectIds.delete(selectedSubject.id);
        }

        return {
          ...prev,
          subject_id: newSubjectIds,
          page: 1,
        };
      });
    }
  };

  const getApiParams = useCallback(() => {
    return {
      page: searchParams.page,
      limit: searchParams.limit,
      name: searchParams.name,
      subject_id: Array.from(searchParams.subject_id).join(","),
      year: Array.from(searchParams.year).join(","),
    };
  }, [searchParams]);

  useEffect(() => {
    dispatch(getAllExamsAsync(getApiParams()));
  }, [dispatch, getApiParams, searchParams]);

  useEffect(() => {
    dispatch(getAllSubjectsAsync({ page: 1, limit: 10 }));
  }, [dispatch]);

  return (
    <>
      <div className="pt-16 "></div>
      <Title
        title="Danh sách đề thi"
        onSearch={(keyword) =>
          setSearchParams((prev) => ({
            ...prev,
            name: keyword,
            page: 1,
          }))
        }
      />
      <div className="md:px-4 lg:px-8 xl:px-16 2xl:px-0">
        <div className="grid grid-cols-12 px-4 gap-6">
          <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-2 text-center h-fit top-24">
            <div className="flex flex-col">
              <SidebarItem
                title={YEAR_ITEM.title}
                type={YEAR_ITEM.type}
                labels={YEAR_ITEM.labels}
                onSelect={handleYearSelect}
              />
              <SidebarItem
                title="Môn học"
                type="subject"
                labels={subjects.map((subject) => subject.name)}
                onSelect={handleSubjectSelect}
              />
            </div>
          </div>
          <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-10 rounded-xl">
            <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-y-10 place-items-center">
              {loading ? (
                <Loading />
              ) : (
                exams.map((exam: Exam) => (
                  <TestItem key={exam.id} exam={exam} />
                ))
              )}
            </div>
            <div className="flex my-20 justify-center items-center">
              {total > 0 && (
                <div className="mt-8 mb-16">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={lastPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListTest;
