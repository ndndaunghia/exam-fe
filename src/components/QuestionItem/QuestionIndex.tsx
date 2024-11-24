import { useAppSelector } from "../../hooks/useRedux";

const QuestionIndex = ({
  itemIndex,
  handleScrollToQuestion,
  isReview = false,
}: {
  itemIndex: number;
  isReview?: boolean;
  handleScrollToQuestion: (index: number) => void;
}) => {
  const { answers, currentExam } = useAppSelector((state) => state.exam);

  // Lấy question_id tương ứng với index
  const questionId = currentExam?.questions?.[itemIndex]?.id;

  const isAnswered = answers.some(
    (answer) => answer.exam_question_id === questionId && answer.options !== ""
  );

  return (
    <button
      className={`min-w-max p-1 rounded-md border-[1px] border-blue-300 sm:col-span-3 hover:bg-[#517C96] hover:text-white ${
        isAnswered || isReview ? "bg-[#517C96] text-white" : ""
      }`}
      onClick={() => handleScrollToQuestion(itemIndex)}
    >
      <span className="font-semibold">{itemIndex + 1}</span>
    </button>
  );
};

export default QuestionIndex;
