const HistoryQuestionItem = ({ question, questionIndex, id }) => {
  const isMultipleChoice = question.correct_options.length > 1;

  const getOptionClassName = (option) => {
    const isSubmitted = question.submitted_options.includes(option.id);
    const isCorrect = option.is_correct === 1;

    let className = "flex items-center p-3 rounded-lg border mb-2 ";

    if (isSubmitted && isCorrect) {
      className +=
        "bg-green-50 border-green-500 dark:bg-green-900/20 dark:border-green-500";
    } else if (isSubmitted && !isCorrect) {
      className +=
        "bg-red-50 border-red-500 dark:bg-red-900/20 dark:border-red-500";
    } else if (!isSubmitted && isCorrect) {
      className +=
        "bg-green-50 border-green-500 dark:bg-green-900/20 dark:border-green-500";
    } else {
      className += "border-gray-200 dark:border-gray-700";
    }

    return className;
  };

  return (
    <div
      id={id}
      className="mb-8 p-6 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="flex items-start gap-4 mb-4">
        <span className="text-lg font-semibold dark:text-white min-w-[24px]">
          {questionIndex + 1}.
        </span>
        <div className="flex-1">
          <p className="text-lg dark:text-white mb-2">{question.name}</p>
          {question.description && (
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {question.description}
            </p>
          )}
          <div className="flex gap-3 items-center">
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                question.is_correct
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
              }`}
            >
              {question.is_correct ? "Đúng" : "Sai"}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {isMultipleChoice ? "Chọn nhiều đáp án" : "Chọn một đáp án"}
            </div>
          </div>
        </div>
      </div>

      <div className="ml-10 space-y-2">
        {question.options.map((option) => {
          const isSubmitted = question.submitted_options.includes(option.id);
          const isCorrect = option.is_correct === 1;

          return (
            <div key={option.id} className={getOptionClassName(option)}>
              <div className="flex items-center gap-3 flex-1">
                <input
                  type={isMultipleChoice ? "checkbox" : "radio"}
                  checked={isSubmitted}
                  readOnly
                  className="w-4 h-4"
                  name={`question-${question.id}`}
                />
                <span
                  className={`flex-1 dark:text-white ${
                    isSubmitted && !isCorrect ? "line-through" : ""
                  }`}
                >
                  {option.content}
                </span>
                {isSubmitted && (
                  <span
                    className={`flex items-center ${
                      isCorrect ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isCorrect ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                  </span>
                )}
              </div>
              {option.explanation && isSubmitted && (
                <div className="mt-2 ml-7 text-sm text-gray-600 dark:text-gray-300 border-t pt-2">
                  Giải thích: {option.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryQuestionItem;
