import QuestionIndex from "../../components/QuestionItem/QuestionIndex";

interface HistoryControllerProps {
  handleScrollToQuestion: (index: number) => void;
  totalQuestions: number;
  score: string;
  correctAnswers: number;
}

const HistoryController: React.FC<HistoryControllerProps> = ({
  handleScrollToQuestion,
  totalQuestions,
  score,
  correctAnswers,
}) => {
  return (
    <div className="dark:text-white">
      <div className="mb-4">
        <h2>Kết quả</h2>
        <div className="text-lg font-bold mb-2">{score}/10 điểm</div>
        <div className="text-base">
          Số câu đúng: {correctAnswers}/{totalQuestions}
        </div>
      </div>
      <div className="grid grid-cols-12 gap-2 my-4">
        {Array(totalQuestions)
          .fill(0)
          .map((_, index) => (
            <QuestionIndex
              key={index}
              itemIndex={index}
              isReview
              handleScrollToQuestion={handleScrollToQuestion}
            />
          ))}
      </div>
    </div>
  );
};

export default HistoryController;
