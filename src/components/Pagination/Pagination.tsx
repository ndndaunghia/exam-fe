interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Số trang hiển thị tối đa

    if (totalPages <= maxPagesToShow) {
      // Nếu tổng số trang ít hơn maxPagesToShow, hiện tất cả
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Luôn hiển thị trang đầu
      pageNumbers.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Thêm dấu ... nếu cần
      if (startPage > 2) {
        pageNumbers.push("...");
      }

      // Thêm các trang ở giữa
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Thêm dấu ... và trang cuối nếu cần
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }
      if (endPage < totalPages) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Nút Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md ${
          currentPage === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50 border"
        }`}
      >
        Previous
      </button>

      {/* Các nút số trang */}
      {getPageNumbers().map((pageNum, index) => (
        <button
          key={index}
          onClick={() => typeof pageNum === "number" && onPageChange(pageNum)}
          disabled={pageNum === "..."}
          className={`px-4 py-2 rounded-md ${
            pageNum === currentPage
              ? "bg-blue-600 text-white"
              : pageNum === "..."
              ? "bg-white text-gray-700 cursor-default"
              : "bg-white text-gray-700 hover:bg-gray-50 border"
          }`}
        >
          {pageNum}
        </button>
      ))}

      {/* Nút Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50 border"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
