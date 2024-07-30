import { BsBook, BsClock } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

const CourseCard = () => {
  const [theme] = useTheme();
  return (
    <>
      <Link to="/course-detail">
        <div className="flex flex-col md:flex-row justify-between gap-4 pb-[22px] border-b-gray-400 border-white border-2 cursor-pointer dark:border-dark dark:border-b-dark-light">
          <div className="flex gap-6">
            <div className="w-full md:w-60 h-40">
              <img
                src="https://files.fullstack.edu.vn/f8-prod/courses/7.png"
                alt=""
                className="w-full h-full object-cover hover:opacity-80"
              />
            </div>
            <div className="flex flex-col gap-y-1 justify-between">
              <div>
                <h3 className="text-sm md:text-xl font-semibold dark:text-white">
                  <a href="">
                    Kiến thức nhập môn IT
                  </a>
                </h3>
              </div>
              <p className="text-black dark:text-white" >Các kiến thức cơ bản, nền móng của ngành IT</p>
              <div>
                <span className="text-sm text-gray-400">
                  Nghĩa NĐ
                </span>
              </div>

              <div className="flex items-center my-2">
                <svg
                  className="w-4 h-4 text-yellow-300 me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300 me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300 me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300 me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <div className="flex items-center">
                  <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400 hidden sm:block">
                    4.95
                  </p>
                  <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400 hidden sm:block">
                    out of 5
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <BsClock className="hidden sm:block" color={theme === 'light' ? 'black' : 'white'} />
                <span className="mr-4 dark:text-white">10 giờ học</span>
                <BsBook className="hidden sm:block" color={theme === 'light' ? 'black' : 'white'}/>
                <span className="dark:text-white">370 bài học</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:justify-between items-end">
            <h3 className="text-black dark:text-white">299.000đ</h3>
            <h3 className="line-through text-sm text-gray-400">499.000đ</h3>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CourseCard;
