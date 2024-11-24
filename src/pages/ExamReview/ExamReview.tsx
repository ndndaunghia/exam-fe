import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Thêm useNavigate
import HistoryQuestionItem from "./HistoryItem";
import HistoryController from "./HistoryController";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { getExamHistoryReviewAsync } from "../../services/exam/examReviewSlice";

const ExamReview = () => {
  const { historyId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Thêm điều hướng
  const { examHistoryReview, loading, error } = useAppSelector(
    (state) => state.examReview
  );

  const handleScrollToQuestion = (index: number) => {
    const element = document.getElementById(`question-${index}`);
    if (element) {
      const yOffset = -100;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchExamHistory = async () => {
      if (historyId) {
        const numericId = parseInt(historyId, 10); // Chuyển thành số
        if (!isNaN(numericId)) {
          dispatch(getExamHistoryReviewAsync(numericId));
        }
      }
    };

    fetchExamHistory();
  }, [historyId, dispatch]);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>{error || "Không thể tải dữ liệu bài thi."}</div>;
  }

  if (!examHistoryReview) {
    return <div>Không tìm thấy lịch sử bài thi.</div>;
  }

  console.log(examHistoryReview);
  

  return (
    <div className="pt-24">
      <div className="flex justify-center items-center gap-10">
        <h1 className="text-center dark:text-white">
          {examHistoryReview.exam_details.name}
        </h1>
        <button
          onClick={() => navigate(-1)} // Nút quay lại
          className="px-6 py-2 rounded-md text-blue-600 border-[1px] border-blue-300 hover:bg-[#517C96] hover:text-white"
        >
          <span className="font-semibold uppercase">Quay lại</span>
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 p-4 gap-6 min-h-[calc(100vh-200px)]">
        <div className="col-span-1 lg:col-span-10 p-4 rounded-xl bg-white shadow-xl dark:bg-dark-light">
          {examHistoryReview.exam_details.questions.map((question, index) => (
            <HistoryQuestionItem
              key={question.id}
              id={`question-${index}`}
              question={question}
              questionIndex={index}
            />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-2 p-4 bg-white shadow-xl text-center h-fit sticky top-24 dark:bg-dark-light">
          <HistoryController
            handleScrollToQuestion={handleScrollToQuestion}
            totalQuestions={examHistoryReview.exam_details.questions.length}
            score={examHistoryReview.score}
            correctAnswers={examHistoryReview.correct_answers}
          />
        </div>
      </div>
    </div>
  );
};

export default ExamReview;
