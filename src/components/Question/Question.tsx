import { LegacyRef, forwardRef } from "react";

const Question = (
  {
    questionIndex,
    id,
    handleSelectAnswer,
  }: {
    questionIndex: number;
    id: string;
    handleSelectAnswer: React.FC<number>;
  },
  ref: LegacyRef<HTMLDivElement> | undefined
) => {
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
          <div className="flex gap-3">
            <input
              type="radio"
              name={id}
              id={`question-${questionIndex}-a`}
              className="accent-[#517C96]"
              onClick={() => handleSelectAnswer(questionIndex)}
            />
            <label htmlFor={`question-${questionIndex}-a`}>A. (1; 3)</label>
          </div>
          <div className="flex gap-3">
            <input
              type="radio"
              name={id}
              id={`question-${questionIndex}-b`}
              className="accent-[#517C96]"
              onClick={() => handleSelectAnswer(questionIndex)}
            />
            <label htmlFor={`question-${questionIndex}-b`}>B. (1; 2)</label>
          </div>
          <div className="flex gap-3">
            <input
              type="radio"
              name={id}
              id={`question-${questionIndex}-c`}
              className="accent-[#517C96]"
              onClick={() => handleSelectAnswer(questionIndex)}
            />
            <label htmlFor={`question-${questionIndex}-c`}>C. (2; 3)</label>
          </div>
          <div className="flex gap-3">
            <input
              type="radio"
              name={id}
              id={`question-${questionIndex}-d`}
              className="accent-[#517C96]"
              onClick={() => handleSelectAnswer(questionIndex)}
            />
            <label htmlFor={`question-${questionIndex}-d`}>D. (1; 6)</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(Question);
