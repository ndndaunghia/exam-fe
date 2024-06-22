import React from "react";
import QuestionIndex from "../Question/QuestionIndex";

interface ExamControllerProps {
    handleScrollToQuestion: (index: number) => void;
}

const ExamController: React.FC<ExamControllerProps> = ({ handleScrollToQuestion }) => {
    const arr = new Array(10).fill(0);

    return (
        <div className="">
            <div className="mb-4">
                <h2>Thời gian làm bài</h2>
                <span className="text-lg font-bold">39:25</span>
            </div>
            <div className="flex flex-col">
                <button className="px-12 py-1 rounded-md text-blue-600 border-[1px] border-blue-300 hover:bg-[#517C96] hover:text-white">
                    <span className="font-semibold uppercase">nộp bài</span>
                </button>
                <button className="my-4">
                    <span className="text-blue-600 italic underline">
                        Khôi phục bài làm
                    </span>
                </button>
            </div>
            <div className="grid grid-cols-12 gap-2">
                {arr.map((item, index) => (
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
