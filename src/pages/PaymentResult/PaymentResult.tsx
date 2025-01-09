import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";

const PaymentResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
  const vnp_Amount = queryParams.get("vnp_Amount");
  const vnp_TxnRef = queryParams.get("vnp_TxnRef");

  // Get courseId from localStorage
  const courseId = localStorage.getItem("pending_course_id");

  useEffect(() => {
    const savePurchasedCourse = async () => {
      if (vnp_ResponseCode === "00" && courseId) {
        try {
          setIsProcessing(true);
          setError("");

          await axios.post(
            "http://127.0.0.1:8000/api/v1.0/save-purchased-course",
            {
              course_id: courseId,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          // Clear the pending course ID after successful purchase
          localStorage.removeItem("pending_course_id");
        } catch (error) {
          console.error("Error saving purchase:", error);
          setError("Có lỗi xảy ra khi lưu khóa học. Vui lòng liên hệ hỗ trợ.");
        } finally {
          setIsProcessing(false);
        }
      }
    };

    savePurchasedCourse();
  }, [vnp_ResponseCode, courseId]);

  // Clean up localStorage if payment failed
  useEffect(() => {
    if (vnp_ResponseCode !== "00") {
      localStorage.removeItem("pending_course_id");
    }
  }, [vnp_ResponseCode]);

  if (vnp_ResponseCode === "00") {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4 py-12">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <div className="mb-6">
                <svg
                  className="mx-auto h-12 w-12 text-green-500"
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
              </div>
              <h1 className="text-2xl font-bold text-green-500 mb-4">
                Thanh toán thành công!
              </h1>
              {isProcessing ? (
                <div className="mb-4">
                  <p className="text-gray-600">Đang xử lý...</p>
                </div>
              ) : error ? (
                <div className="mb-4">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : (
                <div className="space-y-3 mb-6">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-500">Số tiền</p>
                    <p className="font-semibold text-lg">
                      {parseInt(vnp_Amount || "0") / 100} VND
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-500">Mã giao dịch</p>
                    <p className="font-semibold text-gray-700">{vnp_TxnRef}</p>
                  </div>
                </div>
              )}
              <button
                className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:bg-gray-400"
                onClick={() => navigate(`/course-player/${courseId}`)}
                disabled={isProcessing}
              >
                Bắt đầu học
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="mb-6">
              <svg
                className="mx-auto h-12 w-12 text-red-500"
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
            </div>
            <h1 className="text-2xl font-bold text-red-500 mb-4">
              Thanh toán thất bại
            </h1>
            <p className="text-gray-600 mb-6">Vui lòng thử lại sau.</p>
            <button
              className="w-full px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
              onClick={() => navigate(`/course-detail/${courseId}`)}
            >
              Quay lại
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentResult;
