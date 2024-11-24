// ExamController.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import QuestionIndex from "../../components/QuestionItem/QuestionIndex";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { submitExamAsync } from "../../services/exam/examSlice";
import { useParams } from "react-router-dom";

interface ExamControllerProps {
  handleScrollToQuestion: (index: number) => void;
  totalQuestions: number;
}

const ExamController: React.FC<ExamControllerProps> = ({
  handleScrollToQuestion,
  totalQuestions,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { examId } = useParams();
  const { answers } = useAppSelector((state) => state.exam);

  const handleSubmitExam = async () => {
    if (!examId) return;

    // Kiểm tra xem đã trả lời hết các câu hỏi chưa
    if (answers.length < totalQuestions) {
      alert("Vui lòng trả lời tất cả các câu hỏi trước khi nộp bài!");
      // Tìm câu hỏi đầu tiên chưa được trả lời
      const firstUnansweredIndex = Array(totalQuestions)
        .fill(0)
        .findIndex(
          (_, index) =>
            !answers.find((answer) => answer.exam_question_id === index)
        );
      if (firstUnansweredIndex !== -1) {
        handleScrollToQuestion(firstUnansweredIndex);
      }
      return;
    }

    try {
      // Gửi bài thi
      const response = await dispatch(
        submitExamAsync({
          examId: parseInt(examId),
          answers: answers,
        })
      ).unwrap();

      if (response?.result) {
        // Chuyển đến trang kết quả với dữ liệu
        navigate("/exam-result", {
          state: {
            result: response.result,
            examId: examId,
          },
        });
      }
    } catch (error) {
      console.error("Error submitting exam:", error);
      alert("Có lỗi xảy ra khi nộp bài. Vui lòng thử lại!");
    }
  };

  return (
    <div className="dark:text-white">
      <div className="mb-4">
        <h2>Thời gian làm bài</h2>
        <span className="text-lg font-bold">39:25</span>
      </div>
      <div className="flex flex-col">
        <button
          onClick={handleSubmitExam}
          className="px-12 py-1 rounded-md text-blue-600 border-[1px] border-blue-300 hover:bg-[#517C96] hover:text-white"
        >
          <span className="font-semibold uppercase">nộp bài</span>
        </button>
      </div>
      <div className="grid grid-cols-12 gap-2 my-4">
        {Array(totalQuestions)
          .fill(0)
          .map((_, index) => (
            <QuestionIndex
              key={index}
              itemIndex={index}
              handleScrollToQuestion={handleScrollToQuestion}
            />
          ))}
      </div>
    </div>
  );
};

export default ExamController;
