import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ExamResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  useEffect(() => {
    // Nếu không có kết quả (ví dụ user truy cập trực tiếp vào URL), chuyển về dashboard
    if (!result) {
      navigate("/");
    }
  }, [result, navigate]);

  const handleBackToDashboard = () => {
    navigate("/");
  };

  const handleReviewExam = () => {
    navigate(`/exam-review/${location.state?.examId}`);
  };

  if (!result) return null;

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-dark pt-24">
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white dark:bg-dark-light rounded-lg shadow-xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={handleBackToDashboard}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            ></button>
            <h1 className="text-3xl font-bold dark:text-white">
              Kết quả bài thi
            </h1>
          </div>

          <div className="space-y-6">
            {/* Thông báo kết quả */}
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <p className="text-blue-700 dark:text-blue-300 text-lg">
                {result.message || "Bạn đã hoàn thành bài thi!"}
              </p>
            </div>

            {/* Chi tiết điểm số */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg text-center">
                <p className="text-sm text-green-600 dark:text-green-400 mb-2">
                  Tổng số câu
                </p>
                <p className="text-4xl font-bold text-green-700 dark:text-green-300">
                  {result.total_questions}
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg text-center">
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                  Số câu đúng
                </p>
                <p className="text-4xl font-bold text-blue-700 dark:text-blue-300">
                  {result.correct_answers}
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-lg text-center">
                <p className="text-sm text-purple-600 dark:text-purple-400 mb-2">
                  Điểm số
                </p>
                <p className="text-4xl font-bold text-purple-700 dark:text-purple-300">
                  {result.total_score.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Các nút hành động */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={handleBackToDashboard}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Về trang chủ
              </button>
              <button
                onClick={handleReviewExam}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800 transition-colors"
              >
                Xem lại bài làm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResult;
