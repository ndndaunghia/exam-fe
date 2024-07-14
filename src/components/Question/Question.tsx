import { LegacyRef, forwardRef } from "react";
import { useExam } from "../../contexts/ExamContext";

const Question = (
  {
    questionIndex,
    id,
  }: {
    questionIndex: number;
    id: string;
  },
  ref: LegacyRef<HTMLDivElement> | undefined
) => {

  const { handleSelectAnswer, answers } = useExam();
  const currentAnswer = answers.find(answer => answer.questionIndex === questionIndex);

  return (
    <div className="flex my-10 gap-4" id={id} ref={ref}>
      <div>
        <p className="bg-[#e8f2ff] min-w-8 min-h-8 flex justify-center items-center rounded-full ">
          {questionIndex + 1}
        </p>
      </div>
      <div className="flex flex-col flex-grow">
        <div>
          <p>
            Cho hàm số <strong className="italic"> y = f(x)</strong> có bảng
            biến thiên như hình bên. Hàm số nghịch biến trên khoảng nào dưới
            đây?
          </p>
          <p className="my-4">
            <img
              src="https://hoc247.net/fckeditorimg/upload/2023/202303/images/1.PNG"
              alt=""
            />
          </p>
        </div>
        <div className="my-4">
        {['a', 'b', 'c', 'd'].map((option) => (
          <div key={option} className="flex gap-3">
            <input
              type="radio"
              name={id}
              id={`question-${questionIndex}-${option}`}
              className="accent-[#517C96]"
              checked={currentAnswer?.selectedOption === option}
              onChange={() => handleSelectAnswer(questionIndex, option)}
            />
            <label htmlFor={`question-${questionIndex}-${option}`}>{option.toUpperCase()}. Option text</label>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default forwardRef(Question);
