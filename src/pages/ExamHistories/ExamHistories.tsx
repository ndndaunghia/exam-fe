import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { getAllExamsHistoryAsync } from "../../services/exam/examSlice";

const getScoreColor = (score: number) => {
  if (score >= 8) return "text-green-600";
  if (score >= 6.5) return "text-blue-600";
  return "text-red-600";
};

const formatDateTime = (isoString: string) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
};

const ExamHistories = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { history, loading, error } = useAppSelector((state) => state.exam);

  useEffect(() => {
    dispatch(getAllExamsHistoryAsync({ page: 1, limit: 10 }));
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Lịch sử làm bài
          </h1>
          <p className="text-gray-900 dark:text-white">
            Xem lại các bài thi đã hoàn thành
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {history.map((exam) => (
            <div
              key={exam.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">
                    {exam.exam.name}
                  </h2>
                  <span
                    className={`text-2xl font-bold ${getScoreColor(
                      parseFloat(exam.score)
                    )}`}
                  >
                    {exam.score}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Số câu đúng:</span>
                    <span className="font-medium">
                      {exam.correct_answers}/{exam.total_questions}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Ngày thi:</span>
                    <span className="font-medium">
                      {formatDateTime(exam.created_at)}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="h-2.5 rounded-full bg-blue-600 transition-all duration-500"
                        style={{
                          width: `${
                            (exam.correct_answers / exam.total_questions) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/exam-histories/${exam.id}`)}
                  className="mt-6 w-full bg-gray-50 text-gray-700 py-2 px-4 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>

        {history.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Bạn chưa có bài thi nào</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamHistories;
