import { FaPlay } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";

const CoursePlayer = () => {
  const courseContent = [
    {
      id: 1,
      title: "Giới thiệu",
      lessons: [
        {
          id: 1,
          title: "Giới thiệu khóa học",
          duration: "01:03",
          current: true,
        },
        { id: 2, title: "Cài đặt Dev - C++", duration: "02:31", locked: true },
        {
          id: 3,
          title: "Hướng dẫn sử dụng Dev - C++",
          duration: "03:33",
          locked: true,
        },
      ],
    },
    { id: 2, title: "Biến và kiểu dữ liệu", duration: "01:15:09", lessons: [] },
    {
      id: 3,
      title: "Cấu trúc điều khiển và vòng lặp",
      duration: "01:28:03",
      lessons: [],
    },
    { id: 4, title: "Mảng", duration: "01:22:56", lessons: [] },
    { id: 5, title: "String", duration: "50:05", lessons: [] },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="flex items-center p-4">
          {/* <button className="p-2 hover:bg-gray-100 rounded-lg">
            <FaAngleLeft className="w-6 h-6" />
          </button> */}
          <h1 className="ml-4 text-xl font-medium">
            Lập trình C++ cơ bản, nâng cao
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Video Section */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative bg-gray-900 aspect-video">
              {/* Course Logo and Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 relative">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/YvjhyepLwBE?si=-EMZwp1qipIZMmMJ"
                    title="Giới thiệu khóa học"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0"
                  />
                  <button className="absolute -right-4 -bottom-4 bg-white rounded-full p-4 shadow-lg">
                    <FaPlay className="w-6 h-6 text-blue-500" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-medium">Giới thiệu khóa học</h2>
              <p className="text-gray-500 text-sm mt-2">
                Cập nhật tháng 2 năm 2023
              </p>
            </div>
          </div>
        </div>

        {/* Course Content Sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium">Nội dung khóa học</h3>
            </div>
            <div className="divide-y">
              {courseContent.map((section) => (
                <div key={section.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">
                      {section.id}. {section.title}
                    </h4>
                    {section.duration && (
                      <span className="text-sm text-gray-500">
                        {section.duration}
                      </span>
                    )}
                  </div>
                  {section.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`ml-4 mt-2 p-2 rounded-lg flex items-center ${
                        lesson.current ? "bg-orange-50 text-orange-500" : ""
                      }`}
                    >
                      <span className="w-6 h-6">
                        {lesson.locked ? "🔒" : "▶️"}
                      </span>
                      <span className="ml-2 flex-1">{lesson.title}</span>
                      <span className="text-sm text-gray-500">
                        {lesson.duration}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between">
        <button className="flex items-center text-orange-500">
          <FiMessageCircle className="w-5 h-5 mr-2" />
          Hỏi đáp
        </button>
        {/* <button className="flex items-center text-gray-600">
          <FaPlus className="w-5 h-5 mr-2" />
          Thêm ghi chú tại 00:00
        </button> */}
      </div>
    </div>
  );
};

export default CoursePlayer;
