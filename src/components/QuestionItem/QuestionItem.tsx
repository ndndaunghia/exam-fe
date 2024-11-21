import { LegacyRef, forwardRef } from "react";
import { useExam } from "../../contexts/ExamContext";
import { Question } from "../../services/exam/exam.type";

const QuestionItem = (
  {
    questionIndex,
    id,
    question,
  }: {
    questionIndex: number;
    id: string;
    question: Question;
  },
  ref: LegacyRef<HTMLDivElement> | undefined
) => {
  const { handleSelectAnswer, answers } = useExam();
  const currentAnswer = answers.find(
    (answer) => answer.questionIndex === questionIndex
  );

  // Determine input type based on number of correct answers
  const isMultipleChoice = question.options.filter(opt => opt.is_correct === 1).length > 1;
  const inputType = isMultipleChoice ? "checkbox" : "radio";

  return (
    <div className="flex my-10 gap-4" id={id} ref={ref}>
      <div>
        <p className="bg-[#e8f2ff] min-w-8 min-h-8 flex justify-center items-center rounded-full ">
          {questionIndex + 1}
        </p>
      </div>
      <div className="flex flex-col flex-grow">
        <div>
          <p className="dark:text-white font-semibold">{question.name}</p>
          {/* {question.description && (
            <p className="text-gray-600 my-2">{question.description}</p>
          )} */}
          {question.image_url && (
            <p className="my-4">
              <img src={question.image_url} alt="Question" className="max-w-full" />
            </p>
          )}
        </div>
        <div className="my-4">
          {question.options.map((option, index) => (
            <div key={option.id} className="flex gap-3 items-center my-2">
              <input
                type={inputType}
                name={`question-${questionIndex}`}
                id={`question-${questionIndex}-${option.id}`}
                className="accent-[#517C96] dark:text-white"
                checked={
                  inputType === "radio"
                    ? currentAnswer?.selectedOption === option.id.toString()
                    : currentAnswer?.selectedOption?.includes(option.id.toString()) || false
                }
                onChange={() => {
                  // For radio, simply select the option
                  if (inputType === "radio") {
                    handleSelectAnswer(questionIndex, option.id.toString());
                  } else {
                    // For checkbox, toggle the option
                    const selectedOptions = currentAnswer?.selectedOption 
                      ? currentAnswer.selectedOption.split(',')
                      : [];
                    const optionIdStr = option.id.toString();
                    const newSelectedOptions = selectedOptions.includes(optionIdStr)
                      ? selectedOptions.filter(id => id !== optionIdStr)
                      : [...selectedOptions, optionIdStr];
                    handleSelectAnswer(
                      questionIndex, 
                      newSelectedOptions.join(',')
                    );
                  }
                }}
              />
              <label
                className="dark:text-white flex-grow"
                htmlFor={`question-${questionIndex}-${option.id}`}
              >
                {String.fromCharCode(65 + index)}. {option.content}
                {/* {option.explanation && (
                  <span className="text-sm text-gray-500 ml-2">
                    ({option.explanation})
                  </span>
                )}
                {option.is_correct === 1 && (
                  <span className="text-green-500 text-xs ml-2">
                    (Đúng)
                  </span>
                )} */}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default forwardRef(QuestionItem);