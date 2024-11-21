import React, { useEffect, useRef } from "react";
import QuestionItem from "../../components/QuestionItem";
import { ExamProvider } from "../../contexts/ExamContext";
import ExamController from "./ExamController";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { getDetailExamAsync } from "../../services/exam/examSlice";

const Exam: React.FC = () => {
  const ref = useRef(null);
  const { examId } = useParams();
  const dispatch = useAppDispatch();

  // Lấy dữ liệu bài thi từ Redux store
  const { currentExam, loading, error } = useAppSelector((state) => state.exam);

  const handleScrollToQuestion = (index: number) => {
    const element = document.getElementById(`question-${index}`);
    if (element) {
      const yOffset = -100;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Gọi API để lấy chi tiết đề thi khi component được mount
  useEffect(() => {
    if (!examId) return;
    dispatch(getDetailExamAsync(parseInt(examId)));
  }, [dispatch, examId]);

  // Hiển thị trạng thái loading, error hoặc dữ liệu bài thi
  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>Lỗi: {error}</div>;
  }

  if (!currentExam) {
    return <div>Không tìm thấy bài thi.</div>;
  }

  console.log(currentExam);

  return (
    <ExamProvider>
      <div className="pt-24 bg-[#f8f9fa] dark:bg-dark">
        <div className="flex justify-center items-center gap-10">
          <h1 className="text-center dark:text-white">{currentExam.name}</h1>
          <button className="px-6 py-2 rounded-md text-blue-600 border-[1px] border-blue-300 hover:bg-[#517C96] hover:text-white">
            <span className="font-semibold uppercase">thoát</span>
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 p-4 gap-6 ">
          <div className="col-span-1 lg:col-span-10 p-4 rounded-xl bg-white shadow-xl dark:bg-dark-light">
            {currentExam?.questions?.map((question, index) => (
              <QuestionItem
                key={`question-${index}`}
                id={`question-${index}`}
                question={question}
                questionIndex={index}
                ref={ref}
              />
            ))}
          </div>
          <div className="col-span-1 lg:col-span-2 p-4 bg-white shadow-xl text-center h-fit sticky top-24 dark:bg-dark-light">
            <ExamController handleScrollToQuestion={handleScrollToQuestion} />
          </div>
        </div>
      </div>
    </ExamProvider>
  );
};

export default Exam;
