import React, { useRef } from "react";
import Question from "../Question";
import Answer from "../Answer";
import ExamController from "./ExamController";

const Exam: React.FC = () => {
    const arr = new Array(10).fill(0);
    const ref = useRef(null);

    const handleScrollToQuestion = (index: number) => {
        const element = document.getElementById(`question-${index}`);
        if (element) {
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    return (
        <div className="pt-24 bg-[#f8f9fa]">
            <div className="flex justify-center items-center gap-10">
                <h1 className="text-center" id="[2022-2023]-sở-gdđt-hà-tĩnh-lần-1-có-đáp-án---đề-thi-thử-tốt-nghiệp-thpt-môn-toán-năm-2022-2023">
                    [2022-2023] Sở GD&amp;ĐT Hà Tĩnh lần 1 có đáp án - Đề thi thử tốt nghiệp THPT môn Toán năm 2022-2023
                </h1>
                <button className="px-6 py-2 rounded-md text-blue-600 border-[1px] border-blue-300 hover:bg-[#517C96] hover:text-white">
                    <span className="font-semibold uppercase">thoát</span>
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-12 p-4 gap-6">
                <div className="col-span-1 sm:col-span-10 p-4 rounded-xl bg-white shadow-xl">
                    {arr.map((item, index) => (
                        <>
                            <Question questionIndex={index} key={index} id={`question-${index}`} ref={ref} />
                            <Answer />
                        </>
                    ))}
                </div>
                <div className="col-span-1 sm:col-span-2 p-4 bg-white shadow-xl text-center h-fit sticky  top-24">
                    <ExamController handleScrollToQuestion={handleScrollToQuestion} />
                </div>
            </div>
        </div>
    );
};

export default Exam;
