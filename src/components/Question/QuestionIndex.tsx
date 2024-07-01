import React from "react";

const QuestionIndex = ({ itemIndex, handleScrollToQuestion }: { itemIndex: number, handleScrollToQuestion: (index: number) => void }) => {

    return (
        <button
            className="min-w-max p-1 rounded-md border-[1px] border-blue-300 sm:col-span-3 hover:bg-[#517C96] hover:text-white"
            onClick={() => handleScrollToQuestion(itemIndex)}
        >
            <span className="font-semibold">{itemIndex + 1}</span>
        </button>
    );
};

export default QuestionIndex;
