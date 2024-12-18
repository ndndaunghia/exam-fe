import React, { forwardRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { setAnswer } from "../../services/exam/examSlice";

interface QuestionItemProps {
  question: {
    id: number;
    name: string;
    total_correct_option: number;
    options: {
      id: number;
      content: string;
    }[];
  };
  questionIndex: number;
  id: string;
}

const QuestionItem = forwardRef<HTMLDivElement, QuestionItemProps>(
  ({ question, questionIndex, id }, ref) => {
    const dispatch = useAppDispatch();
    const answers = useAppSelector((state) => state.exam.answers);

    const currentAnswer = answers.find(
      (answer) => answer.exam_question_id === question.id
    );

    const isMultipleChoice = question.total_correct_option > 1;

    const selectedOptions = currentAnswer?.options
      ? currentAnswer.options.split(", ").map(Number)
      : [];

    const handleSelectOption = (optionId: number) => {
      dispatch(
        setAnswer({
          exam_question_id: question.id,
          optionId,
          isMultiple: isMultipleChoice,
        })
      );
    };

    return (
      <div
        id={id}
        ref={ref}
        className="mb-8 p-4 rounded-xl border-[1px] border-gray-200 dark:border-dark-light"
      >
        <div className="flex gap-4">
          <span className="text-lg font-semibold dark:text-white">
            {questionIndex + 1}.
          </span>
          <p className="text-lg dark:text-white">{question.name}</p>
        </div>

        {question?.image_url && (
          <div>
            <img src={question.image_url} alt="question" />
          </div>
        )}
        <div className="ml-8 mt-4">
          {question.options.map((option) => (
            <div key={option.id} className="mb-2">
              <label className="flex items-center gap-2 cursor-pointer dark:text-white">
                <input
                  type={isMultipleChoice ? "checkbox" : "radio"}
                  name={`question-${question.id}`}
                  value={option.id}
                  checked={selectedOptions.includes(option.id)}
                  onChange={() => handleSelectOption(option.id)}
                  className="w-4 h-4 cursor-pointer"
                />
                <span>{option.content}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default QuestionItem;
