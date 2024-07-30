import React, { useRef } from "react";
import Question from "../Question";
import ExamController from "./ExamController";
import { ExamProvider } from "../../contexts/ExamContext";

const Exam: React.FC = () => {
  const arr = new Array(10).fill(0);
  const ref = useRef(null);

  const handleScrollToQuestion = (index: number) => {
    const element = document.getElementById(`question-${index}`);
    if (element) {
      const yOffset = -100;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <ExamProvider>
      <div className="pt-24 bg-[#f8f9fa] dark:bg-dark">
        <div className="flex justify-center items-center gap-10">
          <h1
            className="text-center dark:text-white"
            id="[2022-2023]-sở-gdđt-hà-tĩnh-lần-1-có-đáp-án---đề-thi-thử-tốt-nghiệp-thpt-môn-toán-năm-2022-2023"
          >
            [2022-2023] Sở GD&amp;ĐT Hà Tĩnh lần 1 có đáp án - Đề thi thử tốt
            nghiệp THPT môn Toán năm 2022-2023
          </h1>
          <button className="px-6 py-2 rounded-md text-blue-600 border-[1px] border-blue-300 hover:bg-[#517C96] hover:text-white">
            <span className="font-semibold uppercase">thoát</span>
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 p-4 gap-6 ">
          <div className="col-span-1 lg:col-span-10 p-4 rounded-xl bg-white shadow-xl dark:bg-dark-light">
            {arr.map((item, index) => (
              <Question
                key={`question-${index}`}
                id={`question-${index}`}
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
